import Link from "next/link";
import { useState } from "react";

export default function SignUp(props) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [userProfile, setUserProfile] = useState(null);


    const [data, setData] = useState({
        username: ''
    })

    const handleChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true)

            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData.entries())),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status == 400) {
                const error = (await response.json())?.message;
                throw new Error(error);
            }
            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json();

            setUserProfile(data);
            setError(null);
            setIsLoading(false)
        } catch (error) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const showError = () => error ? (<>
        <p className="text-red-600">{error}</p>
    </>) : (<></>);
    const showLoading = () => isLoading ? <>
        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </> : <></>

    return (
        <div>
            <div class="flex items-center flex-wrap">
                <div class="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Begin to share your learning.</h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:min-w-[480px]">
                        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            {userProfile ? (<>
                                <h2>Please keep your credential below.</h2>
                                <p className="p-4">
                                    <p>
                                        Username: <code className="font-bold">
                                            {userProfile.username}
                                        </code>
                                    </p>
                                    <p>
                                        Secret key: <code className="font-bold">
                                            {userProfile.password}
                                        </code>
                                    </p>
                                </p>
                                <Link href={`/signin`} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Go to Login
                                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </>) : (<>
                                <form class="space-y-6" onSubmit={onSubmit} method="POST">
                                    {showError()}
                                    <div>
                                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username <sup>https://kuratus.com/<span className="font-semibold text-gray-500">{data.username}</span></sup></label>
                                        <div class="mt-2">
                                            <input id="username" value={data.username} onChange={handleChange} name="username" type="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-0 px-2 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                        <div class="mt-2">
                                            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-0 px-2 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <label for="slogan" class="block text-sm font-medium leading-6 text-gray-900">Headline</label>
                                        <div class="mt-2">
                                            <input id="slogan" name="slogan" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-0 px-2 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" class="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">Register</button>
                                    </div>
                                    <div className="flex w-full justify-center">
                                        {showLoading()}
                                    </div>
                                </form>
                            </>)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
