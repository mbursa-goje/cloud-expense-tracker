import { Menu, ConfigProvider, Badge } from "antd";
import { Mail, Bell } from "lucide-react";
import { LayoutDashboard, CloudIcon, FileText, Banknote } from "lucide-react";
import {} from "react-router-dom";
import { useScreenSize } from "../context/useScreenSize";
import "../index.css";

export default function SideMenu() {
  const { isMobile } = useScreenSize();
  return (
    <div
      className={`flex md:pt-3 gap-0 flex-col w-full  ${isMobile ? `h-4` : `h-screen border-r border-slate-200`} top-0 left-0`}
    >
      <div className="flex justify-between items-center">
        <div
          className={`items-center text-center md:text-left ${isMobile ? "text-sm" : ""} text-base md:pl-3 flex md:text-lg font-bold gap-1 text-(--primary) w-fit rounded-md border border-white/10 px-1 md:py-0.5`}
        >
          CloudFinance
        </div>
        <div className={`pr-4 pt-2  md:pr-8 gap-2 md:hidden items-center flex`}>
          <Badge
            color={"green"}
            count={1}
            size="small"
            className="cursor-pointer"
          >
            <Mail size={16}></Mail>
          </Badge>
          <Badge
            color={"green"}
            size="small"
            count={1}
            className="cursor-pointer"
          >
            <Bell size={16}></Bell>
          </Badge>
        </div>
      </div>
      {/* <div className="flex items-start gap-4">
        <div className="flex">
          <div></div>
          <div></div>
        </div> */}

      {/* <div className="grid grid-cols-1 gap-1.5 w-full">
          <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap"> <LayoutDashboard/>Dashboard</div>
          <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap">Expenses</div>
          <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap"><CloudIcon size={15}/>Cloud Assets</div>
          <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap"><FileText size={15}/>Reports</div>
          </div> */}
      <div
        className={`flex md:flex-col md:items-center ${isMobile ? "border-b border-slate-300" : ""} gap-0 w-full`}
      >
        <div className="flex-1 flex justify-center -pt-1">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  fontSize: 14,
                  itemMarginInline: isMobile ? 0 : undefined,
                  itemColor: "#4b5563",
                  itemSelectedColor: "#ffffff",
                  itemSelectedBg: "#6ee435",
                  itemHoverColor: "#047857",
                  itemHoverBg: "#ecfdf5",
                  itemActiveBg: "#ecfdf5",
                  itemBorderRadius: 1,
                },
              },
            }}
          >
            <Menu
              disabledOverflow={true}
              className="text-sm md:text-base"
              mode={isMobile ? "horizontal" : "inline"}
              style={{ borderInlineEnd: "none", width: "100%" }}
              onClick={(item) => {}}
              items={[
                {
                  label: "Dashboard",
                  key: "/dashboard",
                  icon: isMobile ? undefined : <LayoutDashboard size={15} />,
                },
                {
                  label: "Expenses",
                  key: "/dashboard/expenses",
                  icon: isMobile ? undefined : <Banknote size={15} />,
                },
                {
                  label: "Cloud Assets",
                  key: "/dashboard/cloud-assets",
                  icon: isMobile ? undefined : <CloudIcon size={15} />,
                },
                {
                  label: "Reports",
                  key: "/dashboard/reports",
                  icon: isMobile ? undefined : <FileText size={15} />,
                },
              ]}
            ></Menu>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
