import { Dropdown, Button } from "antd";
import { Filter } from "lucide-react";
// import { useState } from "react";
import type { MenuProps } from "antd";

interface FilterItem {
  key: string;
  label: string;
}

interface FilterButtonProps {
  filterItems: FilterItem[];
  filterField: string;
  onClick: (filters: Record<string, unknown>) => void;
}
export default function FilterButton({ onClick, filterField, filterItems }: FilterButtonProps) {
  // remove hardcoded transaction categories
  // const [search, setSearch] = useState<FetchTransactionsArgs['search']>();
  // const filterMenuItems = [
  //   { key: "ALL", label: "All Categories" },
  //   { key: "database", label: "database" },
  //   { key: "computing", label: "computing" },
  //   { key: "storage", label: "network" },
  //   { key: "SaaS", label: "SaaS" },
  // ];
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onClick({
      [filterField]: key === "ALL" ? undefined : key,
    });
  };

  //map filterItem to Ant Design MenuProps format
  const menuItems: MenuProps["items"] = filterItems.map(({key, label}) => ({
    key: key,
    label: label,
  }))
  return (
    <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
      <Button block size="small" className="h-7!">
        <span className="text-slate-400 font-light tracking-wider flex items-center gap-2">
          <Filter size={16}></Filter>Filter{" "}
        </span>
      </Button>
    </Dropdown>
  );
}
