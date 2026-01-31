import { supabase } from "./supabase";

export async function adminLogin(username: string, password_hash: string) {
    const { data: admin, error } = await supabase
        .from("admins")
        .select("*")
        .eq("username", username)
        .eq("password_hash", password_hash) // In production, use bcrypt.compare
        .eq("active", true)
        .single();

    if (error || !admin) {
        throw new Error("Invalid username or password");
    }

    // Set session in localStorage for this hackathon project (simple but works)
    if (typeof window !== "undefined") {
        localStorage.setItem("ts_admin", JSON.stringify(admin));
    }

    return admin;
}

export function getAdminSession() {
    if (typeof window !== "undefined") {
        const admin = localStorage.getItem("ts_admin");
        return admin ? JSON.parse(admin) : null;
    }
    return null;
}

export function adminLogout() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("ts_admin");
    }
}
