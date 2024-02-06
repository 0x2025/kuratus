import { GetItem } from '@/libs/Db';
import { getWeek } from 'date-fns'
import Link from 'next/link';
import Markdown from 'react-markdown';

import { useParams } from 'next/navigation'

export default function User(props) {
  const params = useParams();
  const currentWeek = getWeek(new Date());
  const items = props.items;
  if (!items) {
    return (
      <div className='mt-10 w-96'>
        <p>No data.</p>
      <div class="grid grid-cols-1 place-content-between">
        <a href="/" class="text-sm font-semibold leading-8">All experts <span aria-hidden="true">→</span></a>
      </div>
    </div>
    )
  }
  const curatedItem = items.filter(item => item.href && item.title).map((item) =>
    <li key={item.id} class="relative flex items-center space-x-4 py-4">
      <div class="min-w-0 flex-auto">
        <div class="flex items-center gap-x-3">
          <h2 class="min-w-0 text-sm font-semibold leading-6 text-slate">
            <Link href={item.href || '#'} class="flex gap-x-2" target='_blank'>
              <span class="truncate">{item.title}</span>
            </Link>
          </h2>
        </div>
        <div class="hyphens-auto mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-slate-600">
          <Markdown>{item.description}</Markdown>
          <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-gray-300">
            <circle cx="1" cy="1" r="1" />
          </svg>
        </div>
      </div>
    </li>);

  return (
    <div className='mt-10 w-96'>
      <div class="grid grid-cols-2 place-content-between">
        <h2 className='text-lg font-semibold leading-8 tracking-tight'>Week {currentWeek}</h2>
        <a href="/" class="text-sm font-semibold leading-8 text-right">All experts <span aria-hidden="true">→</span></a>
      </div>
      <div className='border-b border-gray-200 px-4 py-5 sm:px-6'>
        <ul>
          {curatedItem}
        </ul>
      </div>
      {/* <p className='leading-10 text-center text-sm'>Show Older</p> */}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const user = context.params?.user;
  const currentWeek = getWeek(new Date());
  const key = `${user}/week-${currentWeek}.json`;

  // Fetch data from external API
  const items = await GetItem(key)
  return { props: { items } }
}
