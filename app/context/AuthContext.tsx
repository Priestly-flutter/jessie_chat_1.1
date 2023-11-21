'use client';

import { SessionProvider } from "next-auth/react";


//creating interface

interface AuthContextProps{
    children: React.ReactNode;
}


export default function AuthContext({
    
    children
}: AuthContextProps){
    return <SessionProvider>{children}</SessionProvider>
}