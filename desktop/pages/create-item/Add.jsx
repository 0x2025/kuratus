import React, { useEffect, useState } from 'react';


export function App() {

  const [data, setData] = useState({
    href: "",
    title: "",
    description: ""
  });

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
    if (name == 'href') {
      await updateTitle(value)
    }
  }

  const handleSubmit = async (e, privateMode = false) => {
    e.preventDefault()
    const credential = await window.electronAPI.loadOptions();
    if (!credential) {
      alert('Missing credential. Open Tray icon menu and select Options to set the credential.')
      return;
    }

    const request = new Request('https://www.kuratus.com/api/items', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${credential.username}:${credential.password}`)}`
      }),
      body: JSON.stringify({ ...data, private: privateMode })
    })

    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then(async (result) => {
        await window.electronAPI.closeWindow();
      }).catch(e => alert(e));
  }
  const updateTitle = async (url) => {
    const title = await window.electronAPI.getUrlTitle(url);
    if (title) {
      setData({ ...data, title: title || data.title, href: url || data.href });
    }
  }
  useEffect(() => {
    navigator.clipboard.read().then(async function loadClipboard(clipboardItems) {
      const clipboard = await clipboardItems[0].getType('text/plain');
      const text = await clipboard?.text();
      if (text?.startsWith('http')) {
        setData({ ...data, href: text || data.href });

        await updateTitle(text);
      }
    }
    )
  }, [])

  return (
    <form method='post' onSubmit={handleSubmit}>
      <div class="p-4">
        <div class="">
          <div class="">
            <div class="grid grid-cols-1 gap-6">
              <label class="block">
                <span class="text-gray-700">Link</span>
                <input name="href" id="href" type="text" tabIndex={0} autoFocus
                  onChange={handleChange} value={data.href}
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-green-500"
                  placeholder="" />
              </label>
              <label class="block">
                <span class="text-gray-700">Title</span>
                <input type="text" name="title" id="title"
                  onChange={handleChange} value={data.title}
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-green-500"
                  placeholder="" />
              </label>
              <label class="block">
                <span class="text-gray-700">Your words!</span>
                <textarea
                  name="description" id="description"
                  onChange={handleChange} value={data.description}
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-green-500"
                  rows="5"></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6 px-4">
        <button type="submit"
          class="rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
          Save</button>
        <button type="button"
          onClick={(e) => handleSubmit(e, true)}
          class="group inline-flex ring-1 items-center justify-center rounded-md py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-green-500 focus-visible:ring-slate-300">
          Save in private</button>
      </div>
    </form>

  )

};