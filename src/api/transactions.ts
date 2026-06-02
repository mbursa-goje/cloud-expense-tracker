import { supabase } from "../lib/supabase";

export interface FetchTransactionsArgs {
  category?: string;
  search?: string;
}

export const fetchTransactions = async (filters?: FetchTransactionsArgs) => {
  let query  = supabase
    .from("transactions")
    .select("id, user_id, date, description, category, amount, status")
    .order("date", { ascending: false });

  if(filters?.category){
    query = query.eq("category", filters.category)
  }
  if(filters?.search){
    query = query.ilike(
       "description", `%${filters.search}%`
    )
  }
  const { data, error } = await query; 
  if (error) {
    throw new Error(error.message);
  }

  // let filteredTransactions = data;

  return data ?? [];

};