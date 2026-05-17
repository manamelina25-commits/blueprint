import { supabase } from "./supabaseClient";

export async function getUserChatMessages(userId) {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createChatMessage({ userId, role, content, metadata = {} }) {
  if (!userId) {
    throw new Error("Missing user id.");
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      user_id: userId,
      role,
      content,
      metadata,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function clearUserChatMessages(userId) {
  if (!userId) {
    throw new Error("Missing user id.");
  }

  const { error } = await supabase
    .from("chat_messages")
    .delete()
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}
