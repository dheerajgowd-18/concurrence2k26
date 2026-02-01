"use server";

import { supabase } from "./supabase";

export async function getNextAvailableQR() {
    const { data: qrs, error } = await supabase
        .from("qr_codes")
        .select("*")
        .eq("active", true)
        .order("today_usage", { ascending: true })
        .limit(1);

    if (error) throw error;
    return qrs[0] || null;
}

export async function createUser(userData: {
    name: string;
    reg_no: string;
    email: string;
    phone: string;
    college: string;
    branch: string; // Added branch
    transaction_id: string;
    screenshot_url: string;
    assigned_qr_id: string;
}) {
    const { data, error } = await supabase
        .from("users")
        .insert([
            {
                ...userData,
                status: "PENDING",
            },
        ])
        .select();

    if (error) throw error;

    // Increment today_usage for the QR code
    await supabase.rpc("increment_qr_usage", { qr_id: userData.assigned_qr_id });

    return data[0];
}

export async function updateStatus(
    userId: string,
    adminId: string,
    newStatus: "VERIFYING" | "APPROVED" | "REJECTED",
    action: string
) {
    const updateData: any = { status: newStatus };

    if (newStatus === "VERIFYING") {
        updateData.verified_by = adminId;
    }

    const { data, error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", userId)
        // Race condition protection: Only update if not already in the target status
        .neq("status", newStatus)
        .select();

    if (error) throw error;
    if (!data || data.length === 0) return null;

    // Log action
    const { error: logError } = await supabase.from("action_logs").insert([
        {
            user_id: userId,
            admin_id: adminId,
            action: action,
        },
    ]);

    if (logError) console.error("Error logging action:", logError);

    return data[0];
}

export async function getActiveGroupLink(college: string) {
    // Robust check: contains "RGM" (case-insensitive) -> "RGM", else -> "OTHERS"
    const normalizedCollege =
        college && college.toUpperCase().includes("RGM") ? "RGM" : "OTHERS";
    const { data, error } = await supabase
        .from("group_links")
        .select("whatsapp_link")
        .eq("college", normalizedCollege)
        .eq("active", true)
        .limit(1);

    if (error) {
        console.error("Error fetching group link:", error);
        // Fallback to the provided link if DB fetch fails
        return "https://chat.whatsapp.com/Dto50B4dSfyIiQuqG6BKCs?mode=gi_t";
    }

    return data[0]?.whatsapp_link || "https://chat.whatsapp.com/Dto50B4dSfyIiQuqG6BKCs?mode=gi_t";
}

export async function getActiveEmailAccounts() {
    const { data, error } = await supabase
        .from("email_accounts")
        .select("*")
        .eq("active", true);

    if (error) throw error;
    return data;
}

export async function deleteUser(userId: string) {
    const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);

    if (error) throw error;
    return true;
}
