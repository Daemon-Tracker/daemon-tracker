"use client"

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (searchParams) {
            const errorParam = searchParams.get('error');
            if (errorParam) {
            setError(errorParam);
            }
        }
    }, [searchParams]);
    
    return (
        <div>
            <button
                onClick={() => signIn("google")}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                Sign in
            </button>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}