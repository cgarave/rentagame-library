"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

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
        }
        else {
            router.push("/");
        }
    }

    return (
        <main className="h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold">Create an account</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name={'name'} type={'text'} placeholder={'username'} />
                <Input name={'email'} type={'email'} required={true} placeholder={'yourname@email.com'} />
                <Input name={'password'} type={'password'} minLength={8} placeholder={'password'} />
                <Button type={'submit'} className={'w-full'}>Create Account</Button>
            </form>
            <Link href="/sign-in" className={'text-blue-500 text-sm underline'}>Already have an account? Sign-in</Link>
        </main>
    );
}