import React, { useState } from 'react';

export function Option() {

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('hello')
  }

  return (
    <div class="flex min-h-full items-center justify-center">
      <div class="w-full max-w-sm">
        <form method='post' onSubmit={handleSubmit}>
          <h2 className='text-xl leading-10'>Credential</h2>
          <div class="relative -space-y-px rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"></div>
            <div>
              <label for="email-address" class="sr-only">Username</label>
              <input id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Username" />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="text" autocomplete="current-password" required class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
            </div>
          </div>

          <div class="mt-6 flex items-center justify-center gap-x-6 px-4">
            <button type="submit"
              class="rounded-md bg-neutral-950 px-6 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600">
              Save</button>
          </div>
        </form>
      </div>
    </div>
  )
};