"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";

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
        } else {
            router.push("/");
        }
    }

    return (
        <main className="h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold">Sign In</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name={'email'} type={'email'} placeholder={'yourname@email.com'} />
                <Input name={'password'} type={'password'} placeholder={'password'} />
                <Button type={'submit'} className={'w-full'}>Sign in</Button>
            </form>
            <Link href="/sign-up" className={'text-blue-500 text-sm underline'}>Doesn&apos;t have an account? Sign-up</Link>
        </main>
    );
}