import Link from "next/link";
import { useState } from "react";

export default function About(props) {

    return (
        <div>
            <div class="flex items-center flex-wrap">
                <div class="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Curate your learning. Take notes. Share.</h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:min-w-[480px]">
                        <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12 prose">
                        Kuratus' mission is to offer you:
                            <ul>
                                <li>A professional network where people share what they're learning.</li>
                                <li>Curate your own learning. Aspired to</li>
                                <ul>
                                    <li>https://this-week-in-rust.org</li>
                                    <li>https://nodeweekly.com</li>
                                    <li>https://elixirweekly.net</li>
                                </ul>
                                <li>Distraction free. Fast and furious with <code>Control + K</code></li>
                                <li>Discover what other professionals are studying.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
