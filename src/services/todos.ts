import supabase from "../supabase-client";
import type { Todo, NewTodo } from "../types/todo";

const TABLE = "tasks";

export async function fetchTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function insertTodo(todo: NewTodo): Promise<Todo> {
  const currentDate = new Date().toISOString();

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      text: todo.text,
      priority: todo.priority,
      due_date: todo.due_date,
      is_checked: false,
      created_at: currentDate,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTodo(
  id: string,
  changes: Partial<Omit<Todo, "id" | "created_at">>,
): Promise<Todo> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(changes)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTodo(id: string) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}

export async function deleteCheckedTodos() {
  const { error } = await supabase.from(TABLE).delete().eq("is_checked", true);

  if (error) throw error;
}
