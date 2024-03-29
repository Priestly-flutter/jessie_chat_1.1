import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: {
    children: React.ReactNode;
}) {
    //awaiting a current user
    const currentUser = await getCurrentUser();

    //now we pass the current user to desktopsidebar
    return(
        <div className="h-full">
            <DesktopSidebar currentUser = {currentUser}/>
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>    
        </div>
    )
}

export default Sidebar;