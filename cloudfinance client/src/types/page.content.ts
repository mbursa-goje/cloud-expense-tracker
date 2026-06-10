import type { ColumnsType} from "antd/es/table";
import type { FormInstance } from "antd"

export interface CardDataTypes {
  title: "total balance" | "monthly spending limit" | "cloud credits"
   value: number;
   info?: string;
   valueType?: "money" | "units";
}

export interface CardProps{
    data: CardDataTypes;
}


export interface Transaction{
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    status: string;
}

interface ExpenseCategory {
    computing: "Computing",
    database: "Database",
    storage: "Storage",
}

export interface Expense {
    id: string;
    resourceName: string;
    category: ExpenseCategory
    billingDate: string;
    monthlyCost: number;
    status: 'Paid' | 'Pending';
}



interface DashboardFilterItem {
  key: string;
  label: string;
}

export interface DashboardTableFilters{
    search?: string;
    [key: string]: unknown;
}

export interface DashboardTableProps<ElementType>{
    // Data to be displayed and Interface
    data: ElementType[];
    isLoading?: boolean;
    title: string;
    description: string;
    columns: ColumnsType<ElementType>

    // Form instances and implementations
    form: FormInstance;
    editableFields: {name: string; label: string}[];

    onEdit: (id: string, updates: Record<string, unknown>) => Promise<unknown>
    onDelete: (id: string) => Promise<null>

    // Filters
    onFilterChange: (filters: Record<string, unknown>) => void; 
    currentFilters: DashboardTableFilters;
    searchPlaceholder?: string;

    // delete messages
    deleteConfirmTitle?: string;
    deleteConfirmMessage?: string;

    // filter values
    filterItems?: DashboardFilterItem[];
    filterField?: string;
}

export interface QueryFilters {
  category?: string;
  search?: string;
}


