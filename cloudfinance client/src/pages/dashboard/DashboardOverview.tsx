import DashboardTable from "../../components/DashboardTable";
import { useQuery } from "@tanstack/react-query";
import type {
  DashboardTableFilters,
  Transaction,
} from "../../types/page.content";
import {
  fetchTransactions,
  useEditTransactions,
  useDeleteTransactions,
} from "../../api/transactions";
import { useState } from "react";
import { Form } from "antd";

const transaction_filter_items = [
  { key: "ALL", label: "All Categories" },
  { key: "database", label: "Database" },
  { key: "computing", label: "All Computing" },
  { key: "storage", label: "Storage" },
  { key: "SaaS", label: "SaaS" },
];

export default function DashboardOverview() {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState<DashboardTableFilters>({});
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchTransactions(filters),
  });
  const editMutation = useEditTransactions();
  const deleteMutation = useDeleteTransactions();
  return (
    <div className="p-3">
      <DashboardTable<Transaction>
        deleteConfirmTitle="Delete transaction?"
        deleteConfirmMessage="Are you sure you want to delete this transaction"
        title="Recent Transactions"
        description="Cloud service expenses across AWS/Azure Instances"
        data={transactions}
        isLoading={isLoading}
        columns={[
          { title: "DATE", dataIndex: "date", key: "date" },
          {
            title: "DESCRIPTION",
            dataIndex: "description",
            key: "description",
          },
          { title: "CATEGORY", dataIndex: "category", key: "category" },
          {
            title: "AMOUNT",
            dataIndex: "amount",
            render: (amount: number) => `$${amount.toLocaleString()}`,
          },
          { title: "STATUS", dataIndex: "status", key: "status" },
        ]}
        form={form}
        editableFields={[
          { name: "description", label: "Description" },
          { name: "category", label: "Category" },
        ]}
        onEdit={async (id, updates) =>
          editMutation.mutateAsync({ id, updates })
        }
        onDelete={async (id) => deleteMutation.mutateAsync(id)}
        currentFilters={filters}
        filterField="category"
        filterItems={transaction_filter_items}
        searchPlaceholder="Search Transactions"
        onFilterChange={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters }))
        }
      />
    </div>
  );
}
