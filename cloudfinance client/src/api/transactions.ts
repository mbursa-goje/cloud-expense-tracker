import { supabase } from "../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Transaction, QueryFilters } from "@/types/page.content";


export const fetchTransactions = async (filters?: QueryFilters) => {
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
    throw new Error(error.message)
  }
  return data;
};

export function useDeleteTransactions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["transactions"]});
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
    }
  });
}

export const editTransaction = async (
  id: string,
  updates: Partial<Transaction>,
): Promise<Transaction[] | null> => {
  const { data, error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    return null
  }

  return data;
};

export function useEditTransactions() {
  const queryClient = useQueryClient();
  return useMutation<
    Transaction[] | null,
    Error,
    {id: string; updates: Partial<Transaction>}
  >({
    mutationFn: ({
      id,
      updates,
    }) => editTransaction(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
}
