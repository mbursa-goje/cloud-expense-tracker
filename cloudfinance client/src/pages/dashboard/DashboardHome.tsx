import Header from "../../components/Header";
import type { Session } from "@supabase/supabase-js";
import { useScreenSize } from "../../context/screen/use-screen-size";
import SideMenu from "../../components/SideMenu";
import PageContent from "../../components/PageContent";
// import Footer from "../../components/Footer";

export default function DashboardHome({ session }: {session: Session | null}) {
  const { isMobile } = useScreenSize();
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <aside className={`${isMobile ? 'w-full h-auto fixed z-50' : 'w-45 h-full'} left-0 top-0 shrink-0`}>
        <SideMenu session={session} />
      </aside>
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <header className="">
          <Header session={session}/>
        </header>
        <main className="flex-1 overflow-y-auto">
          <PageContent />
        </main>
      </div>
      {/* <footer className="md:hidden fixed bottom-0 left-0 h-10 shrink-0 z-20 w-full">
        <Footer />
      </footer> */}
    </div>
  );
}
