import { Table, Input, Modal, Tooltip, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import {
  fetchTransactions,
  useEditTransactions,
  type FetchTransactionsArgs,
} from "../api/transactions";
import FilterButton from "../components/FilterButton";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Transaction } from "@/types/page.content";
import { useDeleteTransactions } from "../api/transactions";
// import { supabase } from "@/lib/supabase";

// const titles = ['DATE', 'DESCRIPTION', 'CATEGORY', 'AMOUNT', 'STATUS', 'ACTIONS'];

export default function DashboardTable() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  // const [hover, setHover] = useState(false);
  const [filters, setFilters] = useState<FetchTransactionsArgs>({});
  const { data: dataSource = [], isLoading } = useQuery<Transaction[]>({
    queryKey: ["transactions", filters],
    queryFn: () => fetchTransactions(filters),
  });
  // const filteredData = useMemo(() => {
  //   if (!search) return dataSource;
  //   const lowerSearchFind = search.toLowerCase();
  //   return dataSource.filter((item) => {
  //     return (
  //       item.description?.toLowerCase().includes(lowerSearchFind) ||
  //       item.category?.toLowerCase().includes(lowerSearchFind) ||
  //       item.status?.toLowerCase().includes(lowerSearchFind)
  //     );
  //   });
  // }, [search, dataSource]);
  // const [loading, setLoading] = useState(false);
  // const [dataSource, setDataSource] = useState<TransactionRow[]>([])
  const rawColumns: ColumnsType<Transaction> = [
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      align: "center",
      key: "actions",
      render: (_, record) => {
        return (
          <div className="flex gap-3 justify-center w-full">
            <Tooltip title="Edit Transaction">
              <EditOutlined
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
            <Tooltip title="Delete transaction">
              <DeleteOutlined
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDelete(record.id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const deleteMutation = useDeleteTransactions();

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this transaction?",
      okText: "Yes",
      okType: "danger",
      onOk: () => deleteMutation.mutateAsync(id),
    });
  };

  const editMutation = useEditTransactions();
  const handleEdit = (record: Transaction) => {
    console.log("clicked:", record);
    form.setFieldsValue({
      description: record.description,
      category: record.category,
    });
    setIsEditing(true);
    setEditingTransaction(record);
  };

  const handleSave = async () =>  {
    if (!editingTransaction) return;

    const values = form.getFieldsValue();
    
    await editMutation.mutateAsync({
      id: editingTransaction.id,
      updates: values,
    })

    setIsEditing(false);
  }

  const columns: ColumnsType<Transaction> = rawColumns.map((col) => ({
    ...col,

    title: <span>{col.title as ReactNode}</span>,

    className: "text-slate-700",
  }));

  // const columns = rawColumns.map((col) => ({
  //   ...col,
  //   title: <span className="text-slate-600 font-semibold">{col.title}</span>,
  //   className: `text-slate-700`,
  // }));

  // const fetchdata = async() => {
  //   try{
  //     setLoading(true)
  //     const {data, error} = await supabase.from('transactions').select('id, created_at, quote')
  //     if (error) throw error;

  //     const formattedData: TransactionRow[] = (data ?? []).map((item, index) => ({
  //       key: item.id ?? index,
  //       id: String(item.id),
  //       created_at: item.created_at ?? '',
  //       quote: Number(item.quote),
  //     }))
  //     setDataSource(formattedData)
  //   }catch(error)
  //   {

  //   }finally{
  //     setLoading(false);
  //   }
  // }

  // useEffect(()=> {
  //   fetchdata();
  // }, [])
  return (
    <div className="border border-slate-200 rounded">
      <div className="flex p-4">
        <div className="flex flex-1 flex-col gap-1">
          <div className="text-slate-950 font-semibold text-lg">
            Recent Transactions
          </div>
          <div>Cloud service expenses across AWS/Azure Instances</div>
        </div>
        <div className="flex gap-1">
          <div className="md:w-25vw">
            <Input
              prefix={<Search className="text-slate-400" size={16} />}
              size="small"
              placeholder="Search"
              type="text"
              name="search"
              className="h-7! p-3"
              value={filters.search ?? ""}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  search: event.target.value || undefined,
                }))
              }
            ></Input>
          </div>

          <FilterButton
            onClick={(newFilter) =>
              setFilters((prev) => ({ ...prev, ...newFilter }))
            }
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        rowKey="id"
      />
      <Modal
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleSave}
        title="Edit Transaction"
      >
        <Form form={form} layout="vertical">
          <Form.Item
          label="Description"
          name="description"
          rules={[{required: true, message: "Description is required"}]}
          >
            <Input
              // value={editingTransaction?.description ?? ""}
              // onChange={(e) =>
              //   setEditingTransaction((prev) =>
              //     prev ? { ...prev, description: e.target.value } : prev,
              //   )
              // }
            />
          </Form.Item>
          <Form.Item
          label="Category"
          name="category"
          rules={[{required: true, message: "Category is required"}]}>
            <Input
              // value={editingTransaction?.category ?? ""}
              // onChange={(e) =>
              //   setEditingTransaction((prev) =>
              //     prev ? { ...prev, category: e.target.value } : prev,
              //   )
              // }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
