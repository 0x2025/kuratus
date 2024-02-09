import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const inter = Playfair_Display({ subsets: ["latin"] });

export default function Navbar() {
    return (
        <div className={`flex flex-col items-center`}>
            <h1 className={`mt-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl ${inter.className}`}>
                <Link href="/">Kuratus</Link> 
                </h1>
            <p>Curated by experts</p>
        </div>
    )
}