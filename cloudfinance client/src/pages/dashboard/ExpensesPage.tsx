import {
  fetchExpenses,
  useDeleteExpenses,
  useEditExpenses,
} from "@/api/expenses";
import DashboardTable from "@/components/DashboardTable";
import type { Expense, DashboardTableFilters } from "@/types/page.content";
import { useQuery } from "@tanstack/react-query";
import { Form } from "antd";
import { useState } from "react";
import { format } from "date-fns"

const expense_filter_items = [
  { key: "ALL", label: "All categories" },
  { key: "database", label: "Database" },
  { key: "computing", label: "All Computing" },
  { key: "storage", label: "Storage" },
  { key: "SaaS", label: "SaaS" },
];

export default function ExpensesPage() {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState<DashboardTableFilters>({});
  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => fetchExpenses(filters),
  });
  const editMutation = useEditExpenses();
  const deleteMutation = useDeleteExpenses();
  return (
    <div className="p-3">
      <DashboardTable<Expense>
        deleteConfirmTitle="Delete expense?"
        deleteConfirmMessage="Are you sure you want to delete this expense"
        title="Recent Expenses"
        description="View all your expenses"
        data={expenses}
        isLoading={isLoading}
        columns={[
          {
            title: "RESOURCE NAME",
            dataIndex: "resourceName",
            key: "resourceName",
          },
          { title: "CATEGORY", dataIndex: "category", key: "category" },
          {
            title: "BILLING DATE",
            dataIndex: "billingDate",
            key: "billingDate",
            render: (date: string) => format(new Date(date), "yyyy-MM-dd"),
          
          },
          {
            title: "MONTHLY COST",
            dataIndex: "monthlyCost",
            render: (amount: number) => `$${amount.toLocaleString()}`,
          },
          { title: "STATUS", dataIndex: "status", key: "status" },
        ]}
        form={form}
        editableFields={[
          {
            name: "category",
            label: "Category",
          },
          { name: "resourceName", label: "Resource Name" },
        ]}
        onEdit={async (id, updates) => {
          console.log("Edit ID:", id)
          console.log("Updates:", updates)
          editMutation.mutateAsync({ id, updates })
        }}
        onDelete={async (id) => deleteMutation.mutateAsync(id)}
        currentFilters={filters}
        filterField="category"
        filterItems={expense_filter_items}
        searchPlaceholder="Search Expenses"
        onFilterChange={(newFilters) => setFilters((prev) => ({...prev, ...newFilters}))}
      />
    </div>
  );
}
