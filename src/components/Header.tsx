import { Image, Space, Badge } from "antd";
import {Mail, Bell} from "lucide-react"
export default function Header() {
  return (
    <div className="h-12.5 flex justify-between items-center p-1 md:border-b border-slate-200">
      <Space>
        <Image width={40} />
      </Space>
      <Space>
        <div className="pr-4 md:pr-8 gap-2 hidden md:flex">
          <Badge color={"green"} count={1} size="small">
            <Mail size={20}></Mail>
          </Badge>
          <Badge color={"green"} size="small" count={1}>
            <Bell size={20}></Bell>
          </Badge>
        </div>
      </Space>
    </div>
  );
}
