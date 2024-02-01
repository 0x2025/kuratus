import { Playfair_Display } from "next/font/google";

const inter = Playfair_Display({ subsets: ["latin"] });

export default function Navbar() {
    return (
        <div className={`flex flex-col items-center`}>
            <h1 className={`mt-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl ${inter.className}`}>Kuratus</h1>
            <p>Curated by experts</p>
        </div>
    )
}