import React,{useState} from 'react';

export function App() {
  
  const [data,setData] = useState({
    link: "",
    title: "",
    details: ""
  });
  
  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value})
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    alert('hello')
  }
  
  return (
    <form method='post' onSubmit={handleSubmit}>
      <div class="p-4">
        <div class="">
          <div class="">
          ABC ZZ
            <div class="grid grid-cols-1 gap-6">
              <label class="block">
                <span class="text-gray-700">Link</span>
                <input name="link" id="link" type="text" autofocus
                  onChange={handleChange} value={data.link}
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="" />
              </label>
              <label class="block">
                <span class="text-gray-700">Title</span>
                <input  type="text" name="title" id="title"
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
              <div>{data.link}{data.title}{data.details}</div>
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