import React, { useEffect, useState } from 'react';

export function Option() {

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isSaved, setSaveState] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await window.electronAPI.saveOptions(data)
    console.log(result)
    setSaveState(true)
    const timer = setTimeout(() => {
      setSaveState(false)
      clearTimeout(timer);
    }, 3000);
  }

  useEffect(() => {
    window.electronAPI.loadOptions()
      .then((options) => setData(options))
      .catch(e => console.log(e));
  }, [])

  const SaveIndicator = ()=>{
    if(isSaved){
      return <>
      <p>Save successfull!</p>
      </>
    }
    return <></>;
  }
  return (
    <div class="flex min-h-full items-center justify-center">
      <div class="w-full max-w-sm">
        <form method='post' onSubmit={handleSubmit}>
          <h2 className='text-xl leading-10'>Credential</h2>
          <div class="relative -space-y-px rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"></div>
            <div>
              <label for="username" class="sr-only">Username</label>
              <input onChange={handleChange} value={data.username} id="username" name="username" type="text" autocomplete="text" required class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Username" />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input onChange={handleChange} value={data.password} id="password" name="password" type="text" autocomplete="current-password" required class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
            </div>
          </div>

          <div class="mt-6 flex items-center justify-center gap-x-6 px-4">
            <button type="submit"
              class="rounded-md bg-neutral-950 px-6 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600">
              Save</button>
          </div>
          <div class="mt-6 flex items-center justify-center gap-x-6 px-4 text-green-600">
              <SaveIndicator></SaveIndicator>
          </div>
        </form>
      </div>
    </div>
  )
};