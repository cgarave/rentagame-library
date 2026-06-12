"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import { toast } from "sonner"

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        const res = await signUp.email({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            isAdmin: false
        });

        if (res.error) {
            setError(res.error.message || "Something went wrong.");
            toast.error(res.error.message || "Something went wrong.", {position: "top-center"});
        }
        else {
            router.push("/");
            toast.success('Account successfully created', {position: 'top-center'});
        }
    }

    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <form onSubmit={handleSubmit} className="space-y-4 w-96 max-w-sm">
                    <div className={'space-y-4'}>
                        <Label htmlFor="name">Username</Label>
                        <Input id={'name'} name={'name'} type={'text'} required={true} placeholder={'Type username'}/>
                    </div>
                    <div className={'space-y-4'}>
                        <Label htmlFor="email">Email</Label>
                        <Input id={'email'} name={'email'} type={'email'} required={true} placeholder={'Type email'}/>
                    </div>
                    <div className={'space-y-4'}>
                        <Label htmlFor="password">Password</Label>
                        <Input id={'password'} name={'password'} type={'password'} minLength={8} required={true} placeholder={'Type password'}/>
                    </div>
                    <Button type={'submit'} className={'w-full mt-10'}>Sign Up</Button>
                </form>
                <Link href="/sign-in" className={'text-blue-500 text-sm underline'}>Already have an account? Sign-in</Link>
            </div>
        </main>
    );
}