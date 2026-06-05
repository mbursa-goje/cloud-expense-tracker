import type { Session } from "@supabase/supabase-js";
import { Badge } from "antd";
import { Mail, Bell } from "lucide-react";
import '../index.css'
export default function Header({ session }: { session: Session }) {
  console.log("Session object", session);
  return (
    <div className="h-12.5 md:pr-8 pr-4 justify-between items-center p-1 md:border-b hidden md:flex border-slate-200">
      <div className="text-lg font-semibold text-(--primary)">
        {session?.user.user_metadata?.fullName ?? "User"}
      </div>
      <div className="flex items-center gap-2">
        <Badge color={"green"} count={1} size="small">
        <Mail size={20}></Mail>
      </Badge>
      <Badge color={"green"} size="small" count={1}>
        <Bell size={20}></Bell>
      </Badge>
      </div>
    </div>
  );
}
