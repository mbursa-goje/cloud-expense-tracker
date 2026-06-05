import { Dropdown, Button } from "antd";
import { Filter } from "lucide-react";
// import { useState } from "react";
import type {MenuProps} from 'antd';
import type { FetchTransactionsArgs } from "../api/transactions";

type TransactionFiltersProps = {
    onClick: (filters: FetchTransactionsArgs) => void;
}
export default function FilterButton({onClick}: TransactionFiltersProps){
  // const [search, setSearch] = useState<FetchTransactionsArgs['search']>();
  const filterMenuItems = [
    { key: "ALL", label: "All Categories" },
    { key: "database", label: "database" },
    { key: "computing", label: "computing" },
    { key: "storage", label: "network" },
    { key: "SaaS", label: "SaaS" },
  ];
  const handleMenuClick: MenuProps['onClick'] = ({key}) => {
    onClick({
      category: key === 'ALL' ? undefined : key,
    })
  }
  return (
    <Dropdown
      menu={{ items: filterMenuItems, onClick: handleMenuClick }}
    >
      <Button block size="middle" className="h-7!">
        <span className="text-slate-400 font-light tracking-wider flex items-center gap-2">
          <Filter size={16}></Filter>Filter{" "}
        </span>
      </Button>
    </Dropdown>
  );
}
