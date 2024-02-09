import { useState } from "react";

export default function SignIn(props) {
    const [data, setData] = useState({
        username:''
    })

    const handleChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }
    return (
        <div>
            <div class="flex items-center flex-wrap">
                <div class="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
                    <div class="mt-10 sm:mx-auto sm:w-full sm:min-w-[480px]">
                        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form class="space-y-6" action="#" method="POST">
                                <div>
                                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                    <div class="mt-2">
                                        <input id="username" value={data.username} onChange={handleChange} name="username" type="username" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset outline-0 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <label for="secret" class="block text-sm font-medium leading-6 text-gray-900">Secret</label>
                                    <div class="mt-2">
                                        <input id="secret" name="secret" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-0 px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" class="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
