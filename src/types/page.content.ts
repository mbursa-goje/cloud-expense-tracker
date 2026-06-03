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
