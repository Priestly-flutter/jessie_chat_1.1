'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";


//defining props that will accept the current user

interface DesktopSidebarProps {
    currentUser: User;
}
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) =>{
    
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    //will console log the user's email. change to console log the user's name
    console.log({currentUser})

    return(
        <div className="
            hidden
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:z-40
            lg:w-30
            xl:px-6
            lg:overflow-y-auto
            lg:bg-grey-300
            lg:border-r[10px]
            lg:pb-4
            lg:flex
            lg:flex-col
            justify-between
        ">
            <nav className="
            mt-4
            flex
            flex-col
            justify-between
            ">
                <ul role="list"
                 className="
                    flex
                    flex-col
                    item-center
                    space-y-1
                ">
                    {routes.map((item) => (
                        <DesktopItem
                            key= {item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick = {item.onClick}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
}


export default DesktopSidebar; 
//took a break 
