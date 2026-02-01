"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Settings,
    QrCode,
    Mail,
    Link as LinkIcon,
    Activity,
    Plus,
    Trash2,
    ToggleLeft,
    ToggleRight,
    LogOut,
    ChevronRight,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Clock,
    Loader2,
    Download,
    Upload,
    ExternalLink,
    Menu,
    X
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getAdminSession, adminLogout } from "@/lib/auth";
import Image from "next/image";
import ExcelJS from "exceljs";

type Tab = "USERS" | "ADMINS" | "QR" | "EMAILS" | "GROUPS" | "LOGS";

export default function MainDashboard() {
    const [admin, setAdmin] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<Tab>("USERS");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [data, setData] = useState<any>({
        users: [],
        admins: [],
        qr: [],
        emails: [],
        groups: [],
        logs: []
    });
    const [loading, setLoading] = useState(true);

    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Inline Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editField, setEditField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const [showModal, setShowModal] = useState<Tab | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        const session = getAdminSession();
        if (!session || session.role !== "MAIN") {
            window.location.href = "/admin/login";
            return;
        }
        setAdmin(session);
        fetchAllData();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            let table = "";
            let dataToInsert = { ...formData };

            if (activeTab === "QR") {
                table = "qr_codes";
                dataToInsert = {
                    qr_image_url: formData.qr_image_url,
                    upi_id: formData.upi_id,
                    daily_limit: formData.daily_limit
                };
            }
            if (activeTab === "ADMINS") {
                table = "admins";
                dataToInsert = {
                    username: formData.username,
                    password_hash: formData.password_hash
                };
            }
            if (activeTab === "EMAILS") {
                table = "email_accounts";
                dataToInsert = {
                    email_address: formData.email_address,
                    app_password: formData.app_password
                };
            }
            if (activeTab === "GROUPS") {
                table = "group_links";
                dataToInsert = {
                    college: formData.college || "RGM",
                    whatsapp_link: formData.whatsapp_link
                };
            }

            const { error } = await supabase.from(table).insert([dataToInsert]);
            if (error) throw error;

            setShowModal(null);
            setFormData({});
            fetchAllData();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [
                { data: users },
                { data: admins },
                { data: qr },
                { data: emails },
                { data: groups },
                { data: logs }
            ] = await Promise.all([
                supabase.from("users").select("*").order("created_at", { ascending: false }),
                supabase.from("admins").select("*").order("created_at", { ascending: false }),
                supabase.from("qr_codes").select("*").order("created_at", { ascending: false }),
                supabase.from("email_accounts").select("*").order("created_at", { ascending: false }),
                supabase.from("group_links").select("*").order("created_at", { ascending: false }),
                supabase.from("action_logs").select("*, users(name), admins(username)").order("timestamp", { ascending: false }).limit(50)
            ]);

            setData({
                users: users || [],
                admins: admins || [],
                qr: qr || [],
                emails: emails || [],
                groups: groups || [],
                logs: logs || []
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExportXLSX = async () => {
        const users = data.users;
        if (!users.length) return alert("No data to export");

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("TechSprint Users");

        worksheet.columns = [
            { header: "ID", key: "id", width: 30 },
            { header: "Name", key: "name", width: 20 },
            { header: "Reg No", key: "reg_no", width: 15 },
            { header: "Email", key: "email", width: 25 },
            { header: "Phone", key: "phone", width: 15 },
            { header: "College", key: "college", width: 10 },
            { header: "Transaction ID", key: "transaction_id", width: 20 },
            { header: "Status", key: "status", width: 10 },
            { header: "Screenshot URL", key: "screenshot_url", width: 50 },
            { header: "Joined At", key: "created_at", width: 25 },
        ];

        users.forEach((u: any) => {
            worksheet.addRow({
                ...u,
                created_at: new Date(u.created_at).toLocaleString()
            });
        });

        // Style the header
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `TechSprint_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    };

    const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target?.result as string;
            const lines = text.split("\n").filter(line => line.trim());
            const headers = lines[0].split(",");

            const rows = lines.slice(1).map(line => {
                const values = line.split(",");
                const obj: any = {};
                headers.forEach((h, i) => {
                    const key = h.trim().toLowerCase().replace(" ", "_");
                    obj[key] = values[i]?.trim();
                });
                return obj;
            });

            try {
                setLoading(true);
                // Upsert users based on registration number (reg_no)
                for (const row of rows) {
                    if (!row.reg_no) continue;

                    const { error } = await supabase
                        .from("users")
                        .upsert({
                            name: row.name,
                            reg_no: row.reg_no,
                            email: row.email,
                            phone: row.phone,
                            college: row.college,
                            transaction_id: row.transaction_id || row.utr,
                            status: row.status || "PENDING"
                        }, { onConflict: 'reg_no' });

                    if (error) console.error("Error upserting row:", error);
                }
                alert("Import completed. Some rows might have failed if they were invalid.");
                fetchAllData();
            } catch (err: any) {
                alert("Import failed: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        reader.readAsText(file);
    };

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
        try {
            setLoading(true);
            const { error } = await supabase.from("users").delete().eq("id", id);
            if (error) throw error;
            fetchAllData();
        } catch (err: any) {
            alert("Delete failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInlineSave = async (id: string, field: string, value: string) => {
        try {
            setLoading(true);

            // Handle rejection by deleting
            if (field === 'status' && value === 'REJECTED') {
                const confirmDelete = window.confirm("Rejecting will PERMANENTLY DELETE this user from the database. Continue?");
                if (!confirmDelete) return;

                const { error: delError } = await supabase.from("users").delete().eq("id", id);
                if (delError) throw delError;

                setData((prev: any) => ({
                    ...prev,
                    users: prev.users.filter((u: any) => u.id !== id)
                }));
                alert("User rejected and deleted from database.");
                return;
            }

            const { error } = await supabase
                .from("users")
                .update({ [field]: value })
                .eq("id", id);

            if (error) throw error;

            setData((prev: any) => ({
                ...prev,
                users: prev.users.map((u: any) => u.id === id ? { ...u, [field]: value } : u)
            }));

            await supabase.from("action_logs").insert([{
                admin_id: admin.id,
                user_id: id,
                action: `EDITED_${field.toUpperCase()}`
            }]);

        } catch (err: any) {
            alert("Failed to save: " + err.message);
        } finally {
            setLoading(false);
            setEditingId(null);
            setEditField(null);
        }
    };

    const filteredUsers = data.users.filter((u: any) => {
        const matchesSearch =
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.reg_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const toggleStatus = async (table: string, id: string, current: boolean) => {
        await supabase.from(table).update({ active: !current }).eq("id", id);
        fetchAllData();
    };

    const deleteItem = async (table: string, id: string) => {
        if (window.confirm("Delete this item permanently?")) {
            await supabase.from(table).delete().eq("id", id);
            fetchAllData();
        }
    };

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar Toggle (Mobile Only) */}
            <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)} />

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-64 border-r border-white/10 bg-black flex flex-col shrink-0 z-[70] transition-transform duration-300 transform
                lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center font-bold text-white">M</div>
                        <div>
                            <div className="font-bold text-sm text-white">TechSprint</div>
                            <div className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Main Admin</div>
                        </div>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-white/40 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem icon={Users} label="All Users" active={activeTab === 'USERS'} onClick={() => { setActiveTab('USERS'); setMobileMenuOpen(false); }} />
                    <NavItem icon={ShieldCheck} label="Sub Admins" active={activeTab === 'ADMINS'} onClick={() => { setActiveTab('ADMINS'); setMobileMenuOpen(false); }} />
                    <NavItem icon={QrCode} label="QR Codes" active={activeTab === 'QR'} onClick={() => { setActiveTab('QR'); setMobileMenuOpen(false); }} />
                    <NavItem icon={Mail} label="Email Accounts" active={activeTab === 'EMAILS'} onClick={() => { setActiveTab('EMAILS'); setMobileMenuOpen(false); }} />
                    <NavItem icon={LinkIcon} label="WhatsApp Links" active={activeTab === 'GROUPS'} onClick={() => { setActiveTab('GROUPS'); setMobileMenuOpen(false); }} />
                    <NavItem icon={Activity} label="Action Logs" active={activeTab === 'LOGS'} onClick={() => { setActiveTab('LOGS'); setMobileMenuOpen(false); }} />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => { adminLogout(); window.location.href = "/admin/login"; }}
                        className="w-full flex items-center gap-3 p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-xl z-10">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white/60 hover:text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-sm sm:text-xl font-bold truncate max-w-[150px] sm:max-w-none">{activeTab.replace('_', ' ')} Management</h2>
                        {activeTab === 'USERS' && (
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search name, reg, utr..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs w-64 outline-none focus:border-orange-500/50 transition-all font-mono"
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white font-bold text-lg">×</button>
                                    )}
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-500/50 appearance-none text-white/60"
                                >
                                    <option value="ALL">All Status</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="VERIFYING">Verifying</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="REJECTED">Rejected</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button onClick={fetchAllData} title="Refresh" className="text-white/40 hover:text-white transition-colors">
                            <Activity className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>

                        {activeTab === 'USERS' && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleExportXLSX}
                                    className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg text-sm font-bold text-green-400 hover:bg-green-500/20 transition-all"
                                >
                                    <Download className="w-4 h-4" /> Export XLSX
                                </button>
                                <label className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition-all cursor-pointer">
                                    <Upload className="w-4 h-4" /> Import CSV
                                    <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
                                </label>
                            </div>
                        )}

                        {activeTab !== 'USERS' && activeTab !== 'LOGS' && (
                            <button
                                onClick={() => { setFormData({}); setShowModal(activeTab); }}
                                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                            >
                                <Plus className="w-4 h-4" /> Add New
                            </button>
                        )}
                    </div>
                </header>

                <div className="p-8">
                    {/* Modal Overlay */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                            >
                                <h3 className="text-xl font-bold mb-6">Add {showModal}</h3>
                                <form onSubmit={handleAdd} className="space-y-4">
                                    {showModal === 'ADMINS' && (
                                        <>
                                            <FormInput label="Username" onChange={v => setFormData({ ...formData, username: v })} />
                                            <FormInput label="Password" type="password" onChange={v => setFormData({ ...formData, password_hash: v })} />
                                        </>
                                    )}
                                    {showModal === 'QR' && (
                                        <>
                                            <FormInput label="QR Image URL" placeholder="https://..." onChange={v => setFormData({ ...formData, qr_image_url: v })} />
                                            <FormInput label="UPI ID" placeholder="event@upi" onChange={v => setFormData({ ...formData, upi_id: v })} />
                                            <FormInput label="Daily Limit" type="number" onChange={v => setFormData({ ...formData, daily_limit: parseInt(v) })} />
                                        </>
                                    )}
                                    {showModal === 'EMAILS' && (
                                        <>
                                            <FormInput label="Email Address" onChange={v => setFormData({ ...formData, email_address: v })} />
                                            <FormInput label="App Password" type="password" onChange={v => setFormData({ ...formData, app_password: v })} />
                                        </>
                                    )}
                                    {showModal === 'GROUPS' && (
                                        <>
                                            <FormSelect label="College" options={['RGM', 'OTHERS']} onChange={v => setFormData({ ...formData, college: v })} />
                                            <FormInput label="WhatsApp Link" onChange={v => setFormData({ ...formData, whatsapp_link: v })} />
                                        </>
                                    )}

                                    <div className="flex gap-4 mt-8">
                                        <button type="button" onClick={() => setShowModal(null)} className="flex-1 py-3 bg-white/5 rounded-xl font-bold hover:bg-white/10 transition-all">Cancel</button>
                                        <button type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Add'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                    {activeTab === 'USERS' && <TableLayout
                        headers={['Profile', 'Contact (Edit)', 'College', 'Branch', 'Status', 'Payment Proof', 'UTR (Edit)', 'Joined At', 'Actions']}
                        data={filteredUsers}
                        renderRow={(u: any) => (
                            <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.01]">
                                <td className="py-4 px-4">
                                    <div className="font-bold">{u.name}</div>
                                    <div className="text-[10px] text-white/40 uppercase font-mono">{u.reg_no}</div>
                                </td>
                                <td className="py-4 px-4 text-xs whitespace-nowrap font-mono">
                                    {editingId === u.id && editField === 'email' ? (
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => handleInlineSave(u.id, 'email', editValue)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleInlineSave(u.id, 'email', editValue)}
                                            className="bg-black/50 border border-orange-500/50 rounded px-2 py-1 w-full outline-none"
                                        />
                                    ) : (
                                        <div onDoubleClick={() => { setEditingId(u.id); setEditField('email'); setEditValue(u.email); }} className="cursor-pointer hover:text-orange-400">
                                            {u.email}
                                        </div>
                                    )}
                                    {editingId === u.id && editField === 'phone' ? (
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => handleInlineSave(u.id, 'phone', editValue)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleInlineSave(u.id, 'phone', editValue)}
                                            className="bg-black/50 border border-orange-500/50 rounded px-2 py-1 w-full mt-1 outline-none"
                                        />
                                    ) : (
                                        <div onDoubleClick={() => { setEditingId(u.id); setEditField('phone'); setEditValue(u.phone); }} className="text-white/40 cursor-pointer hover:text-orange-400 mt-1">
                                            {u.phone}
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 px-4 text-[10px] text-white/60">
                                    <span className={`px-2 py-0.5 rounded-full ${u.college?.includes('RGM') ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                        {u.college || 'N/A'}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-[10px] text-white/60">
                                    {editingId === u.id && editField === 'branch' ? (
                                        <select
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => handleInlineSave(u.id, 'branch', e.target.value)}
                                            onBlur={() => setEditingId(null)}
                                            className="bg-black/50 border border-orange-500/50 rounded px-1 py-1 w-full outline-none text-[10px]"
                                        >
                                            <option value="">Select</option>
                                            {["CSE", "CSE-AIML", "CSE-DS", "CSE-BS", "EEE", "ECE", "MECH", "CIVIL", "OTHERS"].map(b => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span onDoubleClick={() => { setEditingId(u.id); setEditField('branch'); setEditValue(u.branch || ""); }} className="cursor-pointer hover:text-orange-400 bg-white/5 px-2 py-0.5 rounded">
                                            {u.branch || 'N/A'}
                                        </span>
                                    )}
                                </td>
                                <td className="py-4 px-4">
                                    <div className="relative group/status flex justify-center">
                                        <StatusBadge status={u.status} />
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover/status:flex flex-col bg-neutral-900 border border-white/10 rounded-lg shadow-2xl z-[100] p-1 mt-1">
                                            {['PENDING', 'APPROVED', 'REJECTED'].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => handleInlineSave(u.id, 'status', s)}
                                                    className="px-3 py-1.5 text-[10px] font-bold text-white/60 hover:text-white hover:bg-white/5 rounded transition-all whitespace-nowrap"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    {u.screenshot_url ? (
                                        <a href={u.screenshot_url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 hover:border-orange-500/50 transition-all overflow-hidden relative">
                                            <Image src={u.screenshot_url} alt="Proof" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <ExternalLink className="w-3 h-3" />
                                            </div>
                                        </a>
                                    ) : (
                                        <span className="text-[10px] text-white/20">No Image</span>
                                    )}
                                </td>
                                <td className="py-4 px-4 font-mono text-[10px] text-white/40">
                                    {editingId === u.id && editField === 'transaction_id' ? (
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => handleInlineSave(u.id, 'transaction_id', editValue)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleInlineSave(u.id, 'transaction_id', editValue)}
                                            className="bg-black/50 border border-orange-500/50 rounded px-2 py-1 w-full outline-none font-mono"
                                        />
                                    ) : (
                                        <div onDoubleClick={() => { setEditingId(u.id); setEditField('transaction_id'); setEditValue(u.transaction_id || ""); }} className="cursor-pointer hover:text-orange-400">
                                            {u.transaction_id || 'N/A'}
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 px-4 text-[10px] text-white/20 whitespace-nowrap">{new Date(u.created_at).toLocaleString()}</td>
                                <td className="py-4 px-4 text-right">
                                    <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        )}
                    />}

                    {activeTab === 'ADMINS' && <TableLayout
                        headers={['Username', 'Role', 'Status', 'Actions']}
                        data={data.admins}
                        renderRow={(a: any) => (
                            <tr key={a.id} className="border-b border-white/5">
                                <td className="py-4 px-4">{a.username}</td>
                                <td className="py-4 px-4 text-xs uppercase font-bold text-orange-400">{a.role}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => toggleStatus('admins', a.id, a.active)}>
                                        {a.active ? <ToggleRight className="text-green-500" /> : <ToggleLeft className="text-white/20" />}
                                    </button>
                                </td>
                                <td className="py-4 px-4">
                                    <button onClick={() => deleteItem('admins', a.id)} className="text-red-500/40 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        )}
                    />}

                    {activeTab === 'QR' && <TableLayout
                        headers={['UPI ID', 'Usage', 'Limit', 'Status', 'Actions']}
                        data={data.qr}
                        renderRow={(q: any) => (
                            <tr key={q.id} className="border-b border-white/5">
                                <td className="py-4 px-4 font-mono text-sm">{q.upi_id}</td>
                                <td className="py-4 px-4">{q.today_usage}</td>
                                <td className="py-4 px-4 text-white/40">{q.daily_limit}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => toggleStatus('qr_codes', q.id, q.active)}>
                                        {q.active ? <ToggleRight className="text-green-500" /> : <ToggleLeft className="text-white/20" />}
                                    </button>
                                </td>
                                <td className="py-4 px-4">
                                    <button onClick={() => deleteItem('qr_codes', q.id)} className="text-red-500/40 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        )}
                    />}

                    {activeTab === 'EMAILS' && <TableLayout
                        headers={['Email Address', 'Status', 'Actions']}
                        data={data.emails}
                        renderRow={(e: any) => (
                            <tr key={e.id} className="border-b border-white/5">
                                <td className="py-4 px-4">
                                    <div className="font-bold">{e.email_address}</div>
                                    <div className="text-[10px] text-white/40">Host: {e.smtp_host}</div>
                                </td>
                                <td className="py-4 px-4">
                                    <button onClick={() => toggleStatus('email_accounts', e.id, e.active)}>
                                        {e.active ? <ToggleRight className="text-green-500" /> : <ToggleLeft className="text-white/20" />}
                                    </button>
                                </td>
                                <td className="py-4 px-4">
                                    <button onClick={() => deleteItem('email_accounts', e.id)} className="text-red-500/40 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        )}
                    />}

                    {activeTab === 'GROUPS' && <TableLayout
                        headers={['College', 'WhatsApp Link', 'Status', 'Actions']}
                        data={data.groups}
                        renderRow={(g: any) => (
                            <tr key={g.id} className="border-b border-white/5">
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${g.college === 'RGM' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                        {g.college}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-xs font-mono text-white/40">{g.whatsapp_link}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => toggleStatus('group_links', g.id, g.active)}>
                                        {g.active ? <ToggleRight className="text-green-500" /> : <ToggleLeft className="text-white/20" />}
                                    </button>
                                </td>
                                <td className="py-4 px-4">
                                    <button onClick={() => deleteItem('group_links', g.id)} className="text-red-500/40 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        )}
                    />}

                    {activeTab === 'LOGS' && <div className="space-y-3">
                        {data.logs.map((log: any) => (
                            <div key={log.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500"><Activity className="w-4 h-4" /></div>
                                    <div>
                                        <p className="text-sm font-medium"><span className="text-orange-400">{log.admins?.username}</span> {log.action.replace('_', ' ').toLowerCase()} for <span className="text-cyan-400">{log.users?.name}</span></p>
                                        <p className="text-[10px] text-white/20">{new Date(log.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon: Icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? "bg-gradient-to-r from-orange-500/20 to-transparent text-orange-400 border border-orange-500/20" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-bold">{label}</span>
            </div>
            {active && <ChevronRight className="w-4 h-4" />}
        </button>
    );
}

function FormInput({ label, type = "text", placeholder, onChange }: { label: string, type?: string, placeholder?: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-white/30 ml-1">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-all text-sm"
            />
        </div>
    );
}

function FormSelect({ label, options, onChange }: { label: string, options: string[], onChange: (v: string) => void }) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-white/30 ml-1">{label}</label>
            <select
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-all text-sm appearance-none"
            >
                <option value="">Select Option</option>
                {options.map((o: string) => <option key={o} value={o} className="bg-neutral-900">{o}</option>)}
            </select>
        </div>
    );
}

function TableLayout({ headers, data, renderRow }: any) {
    return (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-white/5">
                        <tr>
                            {headers.map((h: string) => (
                                <th key={h} className="p-4 text-[10px] uppercase tracking-widest text-white/40">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map(renderRow)}
                    </tbody>
                </table>
            </div>
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
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
            {status}
        </span>
    );
}
