import { supabase } from "../lib/supabase";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type { QueryFilters, Expense } from "@/types/page.content"

export const fetchExpenses = async (filters?: QueryFilters) => {
  let query = supabase
    .from("expenses")
    .select(
      "id, user_id, created_at, resourceName, category, billingDate, monthlyCost, status",
    )
    .order("billingDate", { ascending: false });

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.search) {
    query = query.ilike("billingDate", `%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const deleteExpense = async (id: string) => {
  const { data, error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message)
  }
  return data;
};

export function useDeleteExpenses() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["expenses"]});
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
    }
  });
}

export const editExpenses = async (
    id: string,
    updates: Partial<Expense>,
): Promise<Expense[] | null> => {
    const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", id)
    .select()
    
    console.log("data:", data);
    console.log("error:", error);
    if(error) {
        // throw new Error(error.message)
        console.error(error)
        return null
    }

    return data;
}

export function useEditExpenses() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Expense>;
    }) => editExpenses(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
}
