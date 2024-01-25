export function App() {
  const onSubmit=(e)=>{
    e.preventDefault();
    alert('submit')
  }
  return (
    <form>
      <div class="p-4">
        <div class="">
          <div class="">
            <div class="grid grid-cols-1 gap-6">
              <label class="block">
                <span class="text-gray-700">Link</span>
                <input type="text" autofocus
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="" />
              </label>
              <label class="block">
                <span class="text-gray-700">Title</span>
                <input type="text"
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="" />
              </label>
              <label class="block">
                <span class="text-gray-700">Additional details</span>
                <textarea
                  class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  rows="5"></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6 px-4">
        <button type="submit"
        onClick={(e)=>onSubmit(e)}
          class="rounded-md bg-neutral-950 px-6 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600">
          Create</button>
      </div>
    </form>
  )
};