import React,{useState} from 'react';

export function Option() {
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    alert('hello')
  }
  
  return (
    <form method='post' onSubmit={handleSubmit}>
      <div class="p-4">
        <div class="">
          <div class="">
          Options
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6 px-4">
        <button type="submit"
          class="rounded-md bg-neutral-950 px-6 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600">
          Create 2</button>
      </div>
    </form>

  )
  
};