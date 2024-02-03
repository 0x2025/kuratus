import { GetItem } from '@/libs/Db';
import { getWeek } from 'date-fns'
import Link from 'next/link';

import { useParams } from 'next/navigation'

export default function User(props) {
  const params = useParams();
  const currentWeek = getWeek(new Date());
  const items = props.items;
  if (!items) {
    return (
      <p>
        Nothing to display.
      </p>
    )
  }
  const curatedItem = items.map((item) =>
    <li key={item.id} class="relative flex items-center space-x-4 py-4">
      <div class="min-w-0 flex-auto">
        <div class="flex items-center gap-x-3">
          <div class="flex-none rounded-full p-1 text-green-400 bg-green-400/10">
            <div class="h-2 w-2 rounded-full bg-current"></div>
          </div>
          <h2 class="min-w-0 text-sm font-semibold leading-6 text-slate">

            <Link href={item.href} class="flex gap-x-2">
              <span class="truncate">{item.title}</span>
            </Link>
          </h2>
        </div>
        <div class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-slate-600">
          <p class="hyphens-auto">{item.description}</p>
          <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-gray-300">
            <circle cx="1" cy="1" r="1" />
          </svg>
        </div>
      </div>
    </li>);

  return (
    <div className='w-96'>
      <h2 className='leading-10 text-center text-3xl'>Week {currentWeek}</h2>
      <div className='border-b border-gray-200 px-4 py-5 sm:px-6'>
      <ul>
        {curatedItem}
      </ul>
      </div>
      <p className='leading-10 text-center text-sm'>Show Older</p>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const user = context.params?.user;
  console.log(user)
  const currentWeek = getWeek(new Date());
  const key = `${user}/week-${currentWeek}.json`;

  // Fetch data from external API
  const items = await GetItem(key)
  return { props: { items } }
}
