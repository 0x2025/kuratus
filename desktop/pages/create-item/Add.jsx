import React, { useEffect, useState } from 'react';


export function App() {

  const [data, setData] = useState({
    link: "",
    title: "",
    details: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
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
      })
    })

    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then(result => {
        alert(result)
      }).catch(e => alert(e));
  }

  useEffect(() => {
    navigator.clipboard.read().then(async function loadClipboard(clipboardItems) {
      const clipboard = await clipboardItems[0].getType('text/plain');
      const text = await clipboard?.text();
      if (text?.startsWith('http')) {
        setData({ ...data, link: text || data.link });

        const title = await window.electronAPI.getUrlTitle(text);
        console.log('title', title)
        if (title) {
          setData({ ...data, title: title || data.title, link: text || data.link });
        }
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
                <input name="link" id="link" type="text" tabIndex={0} autoFocus
                  onChange={handleChange} value={data.link}
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="" />
              </label>
              <label class="block">
                <span class="text-gray-700">Title</span>
                <input type="text" name="title" id="title"
                  onChange={handleChange} value={data.title}
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="" />
              </label>
              <label class="block">
                <span class="text-gray-700">Additional details</span>
                <textarea
                  name="details" id="details"
                  onChange={handleChange} value={data.details}
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  rows="5"></textarea>
              </label>
              <div>{data.link}<br />{data.title}<br />{data.details}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6 px-4">
        <button type="submit"
          class="rounded-md bg-neutral-950 px-6 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600">
          Create</button>
      </div>
    </form>

  )

};