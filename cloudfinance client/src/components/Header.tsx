import type { Session } from "@supabase/supabase-js";
import { Badge } from "antd";
import { Mail, Bell } from "lucide-react";
import "../index.css";
export default function Header({ session }: { session: Session | null }) {
  console.log("Session object", session);
  return (
    <div className="bg-[#fafafa] h-12.5 md:pr-8 pr-4 justify-between items-center p-1 md:border-b flex border-slate-200">
      {/* <div className="text-lg font-semibold text-(--primary)">
        {session?.user.user_metadata?.fullName ?? "User"}
      </div> */}
      <div
          className={`items-center text-center text-base md:pl-3  flex md:text-lg font-bold gap-1 text-(--primary) w-fit rounded-md border border-white/10 px-1 md:py-0.5`}
        >
          CloudFinance
        </div>
      <div className="flex gap-2">
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
