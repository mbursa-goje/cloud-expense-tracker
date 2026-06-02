import { Outlet} from "react-router-dom"
export default function PageContent(){
    return(
        <main className="w-full h-full min-h-full">
            <Outlet/>
        </main>
    )
}