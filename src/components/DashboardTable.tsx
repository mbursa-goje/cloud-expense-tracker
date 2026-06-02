import { Table, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState} from "react";
import { Search} from "lucide-react";
import {fetchTransactions, type FetchTransactionsArgs} from "../api/transactions"
import FilterButton  from '../components/FilterButton'


// const titles = ['DATE', 'DESCRIPTION', 'CATEGORY', 'AMOUNT', 'STATUS', 'ACTIONS'];

export default function DashboardTable() {
  const [filters, setFilters] = useState<FetchTransactionsArgs>({})
  const { data: dataSource = [], isLoading } = useQuery({
    queryKey: ["transactions", filters.search, filters.category, filters],
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
  const rawColumns = [
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
      key: "actions",
      render: () => (
        <div className="flex gap-3">
          <button className="text-(--primary)">Edit</button>
          <button className="text-red-600">Delete</button>
        </div>
      ),
    },
  ];

  const columns = rawColumns.map((col) => ({
    ...col,
    title: <span className="text-slate-600 font-semibold">{col.title}</span>,
    className: `text-slate-700`,
  }));

  

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
              onChange={(event) => setFilters((prev) => ({...prev, search: event.target.value || undefined}))}
            ></Input>
          </div>
        
        <FilterButton onClick={(newFilter) => setFilters((prev) => ({...prev, ...newFilter}))}/>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
}
