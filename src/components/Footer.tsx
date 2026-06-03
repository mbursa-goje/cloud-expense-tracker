// import { Menu, ConfigProvider } from "antd";
// import { LayoutDashboard, CloudIcon, FileText, Banknote } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useScreenSize } from "../context/useScreenSize";
// import "../index.css";

// export default function Footer() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { isMobile } = useScreenSize();
//   return (
//     <div
//       className={`flex bg-white flex-col w-full`}
//     >
      
//       {/* <div className="flex items-start gap-4">
//         <div className="flex">
//           <div></div>
//           <div></div>
//         </div> */}

//       {/* <div className="grid grid-cols-1 gap-1.5 w-full">
//           <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap"> <LayoutDashboard/>Dashboard</div>
//           <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap">Expenses</div>
//           <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap"><CloudIcon size={15}/>Cloud Assets</div>
//           <div className="flex items-center gap-1 text-slate-700 whitespace-nowrap"><FileText size={15}/>Reports</div>
//           </div> */}
//       <div
//         className={`flex md:flex-col md:items-center gap-0 w-full`}
//       >
//         <div className="flex-1 flex justify-center -pt-1">
//           <ConfigProvider
//             theme={{
//               components: {
//                 Menu: {
//                   fontSize: 18,
//                   itemMarginInline: 0,
//                   itemPaddingInline: 12,
//                   itemColor: "#4b5563",
//                   itemSelectedColor: "#ffffff",
//                   itemSelectedBg: "#6ee435",
//                   itemHoverColor: "#047857",
//                   itemHoverBg: "#ecfdf5",
//                   itemActiveBg: "#ecfdf5",
//                   itemBorderRadius: 0,
//                 },
//               },
//             }}
//           >
//             <Menu
//               inlineIndent={8}
//               disabledOverflow={true}
//               selectedKeys={[location.pathname]}
//               className="text-sm md:text-base flex justify-center"
//               mode={isMobile ? "horizontal" : "inline"}
//               style={{ borderInlineEnd: "none", width: "100%" }}
//               onClick={({ key }) => {
//                 navigate(key);
//               }}
//               items={[
//                 {
//                   label: "Dashboard",
//                   key: "/dashboard",
//                   icon: isMobile ? undefined : <LayoutDashboard size={15} />,
//                 },
//                 {
//                   label: "Expenses",
//                   key: "/dashboard/expenses",
//                   icon: isMobile ? undefined : <Banknote size={15} />,
//                 },
//                 {
//                   label: "Cloud Assets",
//                   key: "/dashboard/cloud-assets",
//                   icon: isMobile ? undefined : <CloudIcon size={15} />,
//                 },
//                 {
//                   label: "Reports",
//                   key: "/dashboard/reports",
//                   icon: isMobile ? undefined : <FileText size={15} />,
//                 },
//               ]}
//             ></Menu>
//           </ConfigProvider>
//         </div>
//       </div>
//     </div>
//   );
// }
