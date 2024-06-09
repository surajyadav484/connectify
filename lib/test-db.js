"use server";

const { createClient } = require("@supabase/supabase-js");

export const connectSupabase = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return supabase;
};

export const addNewForm = async () => {
  const supabase = await connectSupabase();

  const { data, error } = await supabase
    .from("test")
    .insert([{ id: 1, name: "hello" }])
    .select();

  console.log({ data });
};
