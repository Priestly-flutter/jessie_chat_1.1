import prisma  from "@/app/libs/prismadb";

import getSession from "./getSession";

const getCurrentUser = async () => {
    try{
        const session = await getSession();
//checking for user vai their unique matricule
        if(!session?.user?.email){
            return null;
        }
//come back here and try to make it work using user's name
//need to find a away to use the user matricule to identifiy them
        const currentUser = await prisma.user.findUnique({
            where : {
                email: session.user.email as string
            }
        })

        //checking if the current user exist
        if(!currentUser){
            return null;
        }

        return currentUser;

    }catch (error:any){
        return null;
    }
    
}

export default getCurrentUser;