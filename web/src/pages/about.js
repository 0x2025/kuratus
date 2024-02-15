import Link from "next/link";
import { useState } from "react";

export default function About(props) {

    return (
        <div>
            <div class="flex items-center flex-wrap">
                <div class="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Curate your learning. Take notes. Build trust.</h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:min-w-[480px]">
                        <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12 prose">
                            With Kuratus you can
                            <ul>
                                <li>Curate your own learning. Aspired to https://nodeweekly.com/</li>
                                <li>Take notes. Fast and furious with <code>Control + K</code></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
