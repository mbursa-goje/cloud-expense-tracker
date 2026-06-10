import { Table, Input, Modal, Dropdown, Form, type MenuProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
// import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Search } from "lucide-react";

import FilterButton from "../components/FilterButton";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { DashboardTableProps } from "@/types/page.content";
// import { useDeleteTransactions } from "../api/transactions";
// import { supabase } from "@/lib/supabase";

// const titles = ['DATE', 'DESCRIPTION', 'CATEGORY', 'AMOUNT', 'STATUS', 'ACTIONS'];

export default function DashboardTable<ElementType extends { id: string }>({
  data,
  isLoading,
  title,
  description,
  columns: rawColumns,
  form,
  editableFields,
  onEdit,
  onDelete,
  onFilterChange,
  filterItems,
  filterField,
  currentFilters,
  searchPlaceholder = "Search",
  deleteConfirmTitle,
  deleteConfirmMessage,
}: DashboardTableProps<ElementType>) {
  //parent component handles form logic
  // const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ElementType | null>(null);
  // const [hover, setHover] = useState(false);

  // parent handles query logic
  // const [filters, setFilters] = useState<FetchTransactionsArgs>({});
  // const { data: dataSource = [], isLoading } = useQuery<Transaction[]>({
  //   queryKey: ["transactions", filters],
  //   queryFn: () => fetchTransactions(filters),
  // });

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

  // parent handles data to be displayed in the columns
  // const rawColumns: ColumnsType<Transaction> = [
  //   {
  //     title: "DATE",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     title: "DESCRIPTION",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "CATEGORY",
  //     dataIndex: "category",
  //     key: "category",
  //   },
  //   {
  //     title: "AMOUNT",
  //     dataIndex: "amount",
  //     key: "amount",
  //     render: (amount: number) => `$${amount.toLocaleString()}`,
  //   },
  //   {
  //     title: "STATUS",
  //     dataIndex: "status",
  //     key: "status",
  //   },
  //   {
  //     title: "ACTIONS",
  //     dataIndex: "actions",
  //     align: "center",
  //     key: "actions",
  //     render: (_, record) => {
  //       return (
  //         <div className="flex gap-3 justify-center w-full">
  //           <Tooltip title="Edit Transaction">
  //             <EditOutlined
  //               style={{ color: "green", cursor: "pointer" }}
  //               onClick={() => handleEdit(record)}
  //             />
  //           </Tooltip>
  //           <Tooltip title="Delete transaction">
  //             <DeleteOutlined
  //               style={{ color: "red", cursor: "pointer" }}
  //               onClick={() => handleDelete(record.id)}
  //             />
  //           </Tooltip>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const handleEdit = (record: ElementType) => {
    // console.log("clicked:", record);

    form.setFieldsValue(record);
    setIsEditing(true);
    setEditingRecord(record);
    // uses parent form
    // form.setFieldsValue({
    //   description: record.description,
    //   category: record.category,
    // });
    // setIsEditing(true);
    // setEditingTransaction(record);
  };

  // const deleteMutation = useDeleteTransactions();

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: deleteConfirmTitle,
      content: deleteConfirmMessage,
      okText: "Yes",
      okType: "danger",
      onOk: () => onDelete(id),
    });
  };

  // handled by parent component
  // const editMutation = useEditTransactions();

  const handleSave = async () => {
    if (!editingRecord) return;

    try {
      const values = form.getFieldsValue();

    await onEdit(editingRecord.id, values);
    // use parent's callback
    // await editMutation.mutateAsync({
    //   id: editingTransaction.id,
    //   updates: values,
    // })

    setIsEditing(false);
    } catch (error) {
      // throw new Error(error);
      console.error("Edit failed:", error)
    }
  };

  const handleSearch = (searchValue: string) => {
    onFilterChange({ ...currentFilters, search: searchValue || undefined });
  };

  const columns: ColumnsType<ElementType> = [
    ...rawColumns.map((col) => ({
      ...col,

      title: <span>{col.title as ReactNode}</span>,

      className: "text-slate-700",
    })),
    {
      title: "ACTIONS",
      align: "center",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Edit",
            onClick: () => handleEdit(record),
          },
          {
            key: "delete",
            label: "Delete",
            danger: true,
            onClick: () => handleDelete(record.id),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <EllipsisOutlined />
          </Dropdown>
        );
      },
    },
  ];

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
            {/* Recent Transactions */}
            {title}
          </div>
          <div>
            {/* Cloud service expenses across AWS/Azure Instances */}
            {description}
          </div>
        </div>
        <div className="flex gap-1">
          <div className="">
            <Input
              prefix={<Search className="text-slate-400" size={16} />}
              size="middle"
              placeholder={searchPlaceholder}
              type="text"
              name="search"
              className="h-7! p-3 w-64 flex-1"
              value={(currentFilters.search as string) ?? ""}
              onChange={(event) => handleSearch(event.target.value)}
            ></Input>
          </div>

         <div className="w-30">
           <FilterButton
            filterItems={filterItems ?? []}
            filterField={filterField ?? ""}
            onClick={(newFilter) =>
              onFilterChange({ ...currentFilters, ...newFilter })
            }
          />
         </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
      />
      <Modal
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleSave}
        title="Edit Item"
      
      >
        <Form form={form} layout="vertical">
          {editableFields.map(({ name, label }) => (
            <Form.Item
              label={label}
              name={name}
              rules={[{ required: true, message: `${label} is required` }]}
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
          ))}
        </Form>
      </Modal>
    </div>
  );
}
