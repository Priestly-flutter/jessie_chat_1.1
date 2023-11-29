import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
//run npm install react-icons to install react icon 


const useRoutes = () => {
    const pathname = usePathname();

    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversation',
            icon: HiChat,
            active: pathname === '/conversation' || !!conversationId
        },
        {
            label: 'Users',
            href: '/Users',
            icon: HiUsers,
            active: pathname === '/Users'
        },
        {
            label: 'Logout',
            href: '#',
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut()
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    ],[pathname,conversationId])

    return routes;
}

export default useRoutes;