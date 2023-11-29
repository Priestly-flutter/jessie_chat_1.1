import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


import prisma from "@/app/libs/prismadb";


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        //coming soon
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        // }),
        CredentialsProvider({
            name:'credentials',
            credentials:{
                matricule:{label: 'matricule', type:'text'},
                password: {label: 'password', type:'password'},
            },
            async authorize(credentials){
                if(!credentials?.matricule || !credentials?.password){
                    throw new Error('Invalid credentials');
                }
//checking for user in the database using their credentilas
                const user = await prisma.user.findUnique({
                    where:{
                        matricule: credentials.matricule
                    }
                });
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials');
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword){
                    throw new Error('Invalid credentials');
                }


                return user;
            }
        })
    ],
    debug: process.env.MODE_ENV === 'development',
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};