"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["todo"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["todo"]["Update"];

function handleError(error) {
  console.error(error);
  throw new Error(error.message);
}

//todo 검색 조회
export async function getTodos({ searchInput = "" }) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .like("title", `%${searchInput}%`)
    .order("created_at", { ascending: true });

  if (error) {
    handleError(error);
  }

  return data;
}

//todo 생성
export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").insert({
    ...todo,
    created_at: new Date().toISOString(), //클라이언트에서 넘어오는 값이 이상할수 있으니 만들어서 보낸다.
  });

  if (error) {
    handleError(error);
  }

  return data;
}

//todo 업데이트
export async function updateTodo(todo: TodoRowUpdate) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todo")
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    })
    .eq("id", todo.id); // 📌 id가 일치하는 행만 업데이트

  if (error) {
    handleError(error);
  }

  return data;
}

//todo 삭제
export async function deleteTodo(id: number) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").delete().eq("id", id);

  if (error) {
    handleError(error);
  }
  return data;
}
