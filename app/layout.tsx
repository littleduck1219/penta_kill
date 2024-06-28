import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/app/globals.css";
import { cn } from "@/lib/utils";
import QueryClientProvider from "@/app/_components/QueryClientProvider";
import AuthProvider from "@/app/_components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "PentaKill",
    description: "리그오브 레전드 승부예측",
    icons: {
        icon: "/favicon_black.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    return (
        <html lang="en" suppressHydrationWarning>
            <AuthProvider>
                <GoogleOAuthProvider clientId={clientId as string}>
                    <QueryClientProvider>
                        <body
                            className={cn(
                                "min-h-screen bg-background font-sans antialiased",
                                inter.className,
                            )}
                        >
                            {children}
                            {/* <ThemeProvider
                                attribute='class'
                                defaultTheme='system'
                                enableSystem
                                disableTransitionOnChange
                                storageKey='pentakill-theme'>
                            </ThemeProvider> */}
                            {/* <ReactQueryDevtools /> */}
                        </body>
                    </QueryClientProvider>
                </GoogleOAuthProvider>
            </AuthProvider>
        </html>
    );
}
