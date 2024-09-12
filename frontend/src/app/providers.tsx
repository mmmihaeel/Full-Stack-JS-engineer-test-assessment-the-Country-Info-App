'use client';

import { NextUIProvider } from '@nextui-org/react'
import { LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return <LazyMotion features={domAnimation}>
        <NextUIProvider navigate={router.push} >
            <NextThemesProvider attribute="class" defaultTheme="light">
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    </LazyMotion>;
}