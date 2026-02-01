"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Users,
    Search,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    LogOut,
    RefreshCcw,
    Loader2,
    Lock
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { updateStatus, getActiveGroupLink, deleteUser } from "@/lib/supabase-actions";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email-service";
import { getAdminSession, adminLogout } from "@/lib/auth";
import Image from "next/image";

export default function SubDashboard() {
    const router = useRouter();
    const [admin, setAdmin] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        const session = getAdminSession();
        if (!session) {
            window.location.href = "/admin/login";
            return;
        }
        setAdmin(session);
        fetchUsers();

        // 1. Set up Polling (Failsafe for real-time)
        const pollInterval = setInterval(() => {
            fetchUsers();
        }, 10000); // Refresh every 10 seconds

        // 2. Set up Realtime Subscription
        const channel = supabase
            .channel("users_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "users" },
                () => {
                    fetchUsers();
                }
            )
            .subscribe();

        return () => {
            clearInterval(pollInterval);
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;

            // Sort: PENDING first, then by joined_at desc
            const sortedData = (data || []).sort((a: any, b: any) => {
                const statusOrder: Record<string, number> = { 'PENDING': 0, 'VERIFYING': 1, 'APPROVED': 2, 'REJECTED': 3 };
                const orderA = statusOrder[a.status] ?? 99;
                const orderB = statusOrder[b.status] ?? 99;

                if (orderA !== orderB) return orderA - orderB;
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });

            setUsers(sortedData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (user: any, action: "VERIFYING" | "APPROVED" | "REJECTED") => {
        try {
            setProcessingId(user.id);

            if (action === "APPROVED") {
                const confirm = window.confirm(`Are you sure you want to APPROVE ${user.name}?`);
                if (!confirm) return;

                console.log(`[SubDashboard] Approving user: ${user.id} (${user.email})`);
                const updatedUser = await updateStatus(user.id, admin.id, "APPROVED", "APPROVE_PAYMENT");

                if (!updatedUser) {
                    console.warn("[SubDashboard] User already updated by another admin.");
                    alert("Action failed: User status was already updated by another admin.");
                    return;
                }

                const link = await getActiveGroupLink(user.college);
                console.log(`[SubDashboard] Fetched group link for ${user.college}: ${link}`);

                console.log(`[SubDashboard] Triggering approval email to ${user.email}`);
                await sendApprovalEmail(user.email, user.name, link || "");
                if (!link) console.warn(`[SubDashboard] No active group link found for ${user.college}, sent email without join button.`);
            } else if (action === "REJECTED") {
                const confirm = window.confirm(`Are you sure you want to REJECT ${user.name}?`);
                if (!confirm) return;

                console.log(`[SubDashboard] Rejecting user: ${user.id} (${user.email})`);
                const updatedUser = await updateStatus(user.id, admin.id, "REJECTED", "REJECT_PAYMENT");

                if (!updatedUser) {
                    console.warn("[SubDashboard] User already updated by another admin.");
                    alert("Action failed: User status was already updated by another admin.");
                    return;
                }

                console.log(`[SubDashboard] Triggering rejection email to ${user.email}`);
                await sendRejectionEmail(user.email, user.name);

                // Delete from DB as requested: "If rejects, no need to enter in the main database"
                console.log(`[SubDashboard] Deleting rejected user from database: ${user.id}`);
                await deleteUser(user.id);
                fetchUsers(); // Refresh the list
            } else if (action === "VERIFYING") {
                const updatedUser = await updateStatus(user.id, admin.id, "VERIFYING", "START_VERIFICATION");
                if (!updatedUser) {
                    console.warn("[SubDashboard] User already updated by another admin.");
                    alert("Action failed: User status was already updated by another admin.");
                    return;
                }
            }

        } catch (err: any) {
            alert("Action failed: " + (err.message || "Unknown error"));
            console.error("[SubDashboard Error]", err);
        } finally {
            setProcessingId(null);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.reg_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="border-b border-white/10 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
                            TS
                        </div>
                        <span className="font-bold tracking-tight">TechSprint <span className="text-cyan-400 text-xs">SUB-ADMIN</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-white/40">Logged in as: <span className="text-white">{admin.username}</span></span>
                        <button
                            onClick={() => { adminLogout(); window.location.href = "/admin/login"; }}
                            className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-red-400 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Registrations" value={users.length} icon={Users} color="text-cyan-400" />
                    <StatCard title="Pending" value={users.filter(u => u.status === 'PENDING').length} icon={Clock} color="text-yellow-400" />
                    <StatCard title="Approved" value={users.filter(u => u.status === 'APPROVED').length} icon={CheckCircle} color="text-green-400" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                            type="text"
                            placeholder="Search by Name, Reg No, or Transaction ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>
                    <button onClick={fetchUsers} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead>
                                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40 bg-white/5">
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">College/Branch</th>
                                    <th className="px-6 py-4">Payment Proof</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => {
                                    const isLockedByOther = user.status === 'VERIFYING' && user.verified_by !== admin.id;

                                    return (
                                        <tr key={user.id} className={`hover:bg-white/[0.02] transition-colors group ${isLockedByOther ? 'opacity-50 grayscale' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold flex items-center gap-2">
                                                    {user.name}
                                                    {isLockedByOther && <Lock className="w-3 h-3 text-red-500" />}
                                                </div>
                                                <div className="text-xs text-white/40">{user.reg_no} • {user.email}</div>
                                                <div className="text-[10px] text-cyan-500/60 font-medium">{user.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] w-fit ${user.college?.includes('RGM') ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                                        {user.college || 'N/A'}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-white/60 tracking-wider ml-1">
                                                        {user.branch || 'NO BRANCH'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {user.screenshot_url && (
                                                        <a
                                                            href={user.screenshot_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative group/img shrink-0"
                                                        >
                                                            <Image src={user.screenshot_url} alt="Proof" fill className="object-cover" />
                                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                                <Eye className="w-4 h-4" />
                                                            </div>
                                                        </a>
                                                    )}
                                                    <div className="text-[10px] font-mono text-white/30 truncate max-w-[100px]">UTR: {user.transaction_id}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <StatusBadge status={user.status} />
                                                    {user.status === 'VERIFYING' && (
                                                        <span className="text-[8px] text-white/20 uppercase tracking-tighter">
                                                            {isLockedByOther ? 'By Other Admin' : 'By You'}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {!isLockedByOther && (
                                                        <>
                                                            {user.status === 'PENDING' && (
                                                                <ActionButton
                                                                    onClick={() => handleAction(user, 'VERIFYING')}
                                                                    icon={Clock}
                                                                    label="Start Verify"
                                                                    color="hover:text-yellow-400"
                                                                    disabled={processingId === user.id}
                                                                />
                                                            )}
                                                            {(user.status === 'PENDING' || user.status === 'VERIFYING') && (
                                                                <>
                                                                    <ActionButton
                                                                        onClick={() => handleAction(user, 'APPROVED')}
                                                                        icon={CheckCircle}
                                                                        label="Approve"
                                                                        color="hover:text-green-400"
                                                                        disabled={processingId === user.id}
                                                                    />
                                                                    <ActionButton
                                                                        onClick={() => handleAction(user, 'REJECTED')}
                                                                        icon={XCircle}
                                                                        label="Reject"
                                                                        color="hover:text-red-400"
                                                                        disabled={processingId === user.id}
                                                                    />
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white/40">{title}</span>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-3xl font-bold">{value}</div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        PENDING: "bg-blue-500/10 text-blue-400",
        VERIFYING: "bg-yellow-500/10 text-yellow-500",
        APPROVED: "bg-green-500/10 text-green-400",
        REJECTED: "bg-red-500/10 text-red-400"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
            {status}
        </span>
    );
}

function ActionButton({ onClick, icon: Icon, label, color, disabled }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 transition-all flex items-center gap-2 text-xs font-semibold ${color} hover:bg-white/10 disabled:opacity-50`}
        >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{label}</span>
        </button>
    );
}
