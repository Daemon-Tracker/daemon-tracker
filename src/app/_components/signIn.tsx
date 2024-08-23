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
                className="rounded-full bg-gradient-to-r from-[#000000] to-[#434343] px-20 py-3 font-semibold no-underline transition hover:bg-white/20 text-white"
                >
                Sign in
            </button>
            {error && <p className="text-red-600 text-center pt-3 font-bold">{error}</p>}
        </div>
    )
}