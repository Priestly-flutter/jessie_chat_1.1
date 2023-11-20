import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server"

export async function POST(
    request: Request
){
    try{
        const body = await request.json();
        const {
            name,
            matricule,
            password
        } = body;
        if(!matricule || !name || !password){
            return new NextResponse('You missed something, please check back the form', { status:400 });
        }
    //creating hashed password
        const hashedPassword = await bcrypt.hash(password, 12);

    //creating user
        const user = await prisma.user.create({
            data:{
                name,
                matricule,
                hashedPassword
            }   
        });

    return NextResponse.json(user);
    }catch(error:any){
        console.log(error, 'REGISTRATION_ERROR');
        return new NextResponse('Internal Error', { status:500 });
    }

}