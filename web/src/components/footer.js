import Link from "next/link";

export default function Footer() {
    return (
        <div class="fixed bottom-0 left-0 flex h-28 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
            <div class="sm:px-8"><div class="mx-auto w-full max-w-7xl lg:px-8">
                <div class="pb-2">
                    <div class="relative px-4 sm:px-8 lg:px-12">
                        <div class="mx-auto max-w-2xl lg:max-w-5xl">
                            <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
                                <div class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    <Link className="transition hover:text-lime-500 dark:hover:text-lime-400" href="/signup">Sign Up</Link>
                                    <Link className="transition hover:text-lime-500 dark:hover:text-lime-400" href="/signin">Sign In</Link>
                                </div>
                                <p class="text-sm text-zinc-400 dark:text-zinc-500">©Kuratus. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}