import Link from "next/link";
import { useState } from "react";

export default function Downloads(props) {
    return (
        <>
            <div class="relative px-6 z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none pt-24 xl:col-span-6">
                <h1 class="text-4xl font-medium tracking-tight text-green-500">All of us can be curators of our own learning.</h1>
                <p class="mt-6 text-lg text-gray-600">
                Stay up to date on industry standards while developing your own learning with our tools.</p>
                <div class="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                    <Link  class="disabled inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80" variant="outline" color="gray"
                        href="/downloads?type=app">
                        <span class="ml-2.5">Desktop App</span>
                    </Link>
                    <Link  class="disabled inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80" variant="outline" color="gray"
                        href="/downloads?type=app">
                        <span class="ml-2.5">Mobile App</span>
                    </Link>
                </div>
            </div>
        </>
    )
}