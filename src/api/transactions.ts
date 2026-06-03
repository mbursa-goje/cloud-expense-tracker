import { supabase } from "../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export interface FetchTransactionsArgs {
  category?: string;
  search?: string;
}

export const fetchTransactions = async (filters?: FetchTransactionsArgs) => {
  let query = supabase
    .from("transactions")
    .select("id, user_id, date, description, category, amount, status")
    .order("date", { ascending: false });

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.search) {
    query = query.ilike("description", `%${filters.search}%`);
  }
  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  // let filteredTransactions = data;

  return data ?? [];
};

export const deleteTransaction = async (id: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }
  return data;
};

export function useDeleteTransactions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export const editTransaction = async (id: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .update({
      status: "Completed",
    })
    .eq("id", id);
  if (error) {
    console.error(error);
  }

  return data;
};

export function useEditTransactions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
