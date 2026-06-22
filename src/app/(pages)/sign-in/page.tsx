"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import { toast } from "sonner"

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        const res = await signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });

        if (res.error) {
            setError(res.error.message || "Something went wrong.");
            toast.error(res.error.message || "Something went wrong.", {position: "top-center"});
        } else {
            router.push("/");
            toast.success('Signed in', {position: 'top-center'});
        }
    }

    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-2xl font-bold mb-10">Sign In to Game<span className={'text-red-500'}>RentPH</span></h1>
                <form onSubmit={handleSubmit} className="space-y-4 w-96 max-w-sm">
                    <div className={'space-y-4'}>
                        <Label htmlFor="email">Email</Label>
                        <Input id={'email'} name={'email'} type={'email'} placeholder={'yourname@email.com'}/>
                    </div>
                    <div className={'space-y-4'}>
                        <Label htmlFor="password">Password</Label>
                        <Input id={'password'} name={'password'} type={'password'} placeholder={'******'}/>
                    </div>
                    <Button type={'submit'} className={'w-full mt-10'}>Sign in</Button>
                </form>
                {/*<Link href="/sign-up" className={'text-blue-500 text-sm underline'}>Doesn&apos;t have an account? Sign-up</Link>*/}
            </div>
        </main>
    );
}