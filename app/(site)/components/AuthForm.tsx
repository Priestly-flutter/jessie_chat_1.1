'use client';

import {BsGithub,BsGoogle} from 'react-icons/bs';
import AuthSocailButton from "./AuthsocialButton";
import Input from "@/app/components/input/input";
import Button from "@/app/components/Button";
import axios from 'axios';
import { comment } from "postcss";
import { useCallback, useEffect, useState } from "react";
import { FieldValues,SubmitHandler,useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'JOIN US';

export default function AuthForm(){
    //using the session hook
    const session = useSession();
    //adding router to route to next page after auth is true
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session?.status ==='authenticated'){
            //routing to the new page if conditions are met
            router.push('/Users');
        }
    },[session?.status,router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN'){
            setVariant('JOIN US');
        }else{
            setVariant('LOGIN');
        }
    },[variant]);

    const{
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({ //fuck this error
        defaultValues: {
            name: '',
            matricule: '',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

        if(variant === 'LOGIN'){
            //NextAuth Login_Sign_in
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback)=>{
                if(callback?.error){
                    toast.error('well it looks like you made a mistake or you do not have an account');
                }

                if(callback?.ok && !callback?.error){
                    toast.success('you are in')
                    router.push('/Users');
                 }
            })
            .finally(() => setIsLoading(false));
            
        }

        if(variant === 'JOIN US'){
            //Axios Join Us
            axios.post('api/register',data)
            .then(() => signIn('credentials',data))
            .catch(() => toast.error('Well it looks like our engineers started dating and forgot about their job.  we are sorry about that!'))
            .finally(() => setIsLoading(false))
        }
    }
    const socialAction = (action: string)=>{
        setIsLoading(true);
        //NextAuth Social Instiution Sign in

        signIn(action, {
            redirect:false
        })
        .then((callback) =>{
            if(callback?.error){
                toast.error('Invalid Credentials');
            }

            if(callback?.ok && !callback?.error){
                toast.success('You are in!')
            }
        })
        .finally(() => setIsLoading(false));

    }

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-white
                    px-4
                    py-8
                    shadow
                    sm:rounded-lg
                    sm:px-10
                "
            >
            <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'JOIN US' && (
                    <Input 
                        id="matricule" 
                        label="Matricule" 
                        register={register} 
                        errors={errors}
                        disabled={IsLoading}
                    />

                )}
                 <Input 
                        id="name" 
                        label="Name" 
                        type="text"
                        register={register} 
                        errors={errors}
                        disabled={IsLoading}
                    />
                    <Input 
                        id="password" 
                        label="Password"
                        type="password" 
                        register={register} 
                        errors={errors}
                        disabled={IsLoading}
                    />
                    <div>
                        <Button
                            disabled={IsLoading}
                            fullWidth
                            type="submit"

                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'JOIN US'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                            "
                        >
                            <div
                                className="
                                    w-full
                                    border-t
                                    border-gray-300
                                "
                            />
                        </div>
                        <div className="
                            relative
                            flex
                            justify-center
                            text-sm
                        ">
                            <span
                                className="
                                    bg-white
                                    px-2
                                    text-gray-500
                                "
                            >
                               Coming soon
                            </span>
                        </div>
                    </div>
{/*add function when you've mastered how api work*/}
                    {/*<div className="mt-6 flex gap2">
                        <AuthSocailButton 
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                         <AuthSocailButton 
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                </div>*/}

                </div>
                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                ">
                    <div>
                        {variant === 'LOGIN' ? 'New to chatter?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="
                            underline
                            cursor-pointer
                        "
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>

        </div>
    );
//do not try to make this line of code perfect , it's ok the way it is.
}