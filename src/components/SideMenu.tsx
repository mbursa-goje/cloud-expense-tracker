import { Menu, ConfigProvider, Badge } from "antd";
import { Mail, Bell } from "lucide-react";
import { LayoutDashboard, CloudIcon, FileText, Banknote } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useScreenSize } from "../context/useScreenSize";
import "../index.css";

export default function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobile } = useScreenSize();
  return (
    <div
      className={`bg-[#fafafa] flex md:pt-3 gap-1 flex-col w-full  ${isMobile ? `fixed z-50 ` : `h-screen border-r border-slate-200 `} top-0 left-0`}
    >
      <div className="flex justify-between items-center bg-[#fafafa]">
        <div
          className={`items-center text-center text-base md:pl-3 flex md:text-lg font-bold gap-1 text-(--primary) w-fit rounded-md border border-white/10 px-1 md:py-0.5`}
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
            <Mail size={18}></Mail>
          </Badge>
          <Badge
            color={"green"}
            size="small"
            count={1}
            className="cursor-pointer"
          >
            <Bell size={18}></Bell>
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
        className={`bg-[#fafafa] flex md:flex-col md:items-center ${isMobile ? "w-full" : ""} gap-0 w-full`}
      >
        <div className={`flex-1 flex justify-start -pt-1`}>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  fontSize: 14,
                  itemMarginInline: 0,
                  itemPaddingInline: 12,
                  itemColor: "#4b5563",
                  itemBg: "#fafafa",
                  itemHoverBg: "#ecfdf5",
                  itemSelectedBg: "#6ee435",
                  itemActiveBg: "#ecfdf5",
                  itemSelectedColor: "#ffffff",

                  itemHoverColor: "#047857",

                  itemBorderRadius: 0,
                },
              },
            }}
          >
            <Menu
              // inlineIndent={8}
              disabledOverflow={true}
              selectedKeys={[location.pathname]}
              className="text-sm md:text-base hidden md:block bg-[#fafafa] text-left"
              mode={isMobile ? "horizontal" : "inline"}
              style={{ borderInlineEnd: "none", width: "100%" }}
              onClick={({ key }) => {
                navigate(key);
              }}
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
