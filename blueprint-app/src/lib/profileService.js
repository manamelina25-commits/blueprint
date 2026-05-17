import { supabase } from "./supabaseClient";

export async function getOrCreateProfile(user) {
  if (!user) {
    return null;
  }

  const metadata = user.user_metadata ?? {};

  const profilePayload = {
    id: user.id,
    email: user.email ?? "",
    full_name: metadata.full_name ?? metadata.name ?? "",
    avatar_url: metadata.avatar_url ?? metadata.picture ?? "",
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function completeUserOnboarding(userId, onboardingData = {}) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      onboarding_completed: true,
      onboarding_data: onboardingData,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
