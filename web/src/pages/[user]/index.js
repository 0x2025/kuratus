import { GetItem } from '@/libs/Db';
import { getWeek } from 'date-fns'
import Link from 'next/link';
import Markdown from 'react-markdown';
import Head from 'next/head'

export default function User(props) {
  const currentWeek = getWeek(new Date());
  const { items, username, slogan } = props;
  const showHeader =()=>{
    <Head>
        <title>{`Kuratus | All of us can be curators of our own learning.`}</title>
        <meta name="description" content={`Curated by ${username} | ${slogan} in week ${currentWeek < 10 ? `0${currentWeek}` : currentWeek}`}/>
        <meta property="og:title" content={`Kuratus | All of us can be curators of our own learning.`} />
        <meta property="og:description" content={`Curated by ${username} | ${slogan} in week ${currentWeek < 10 ? `0${currentWeek}` : currentWeek}`} />
        <meta property="og:image" content={`https://www.kuratus.com/api/og?username=${encodeURIComponent(username)}&slogan=${encodeURIComponent(slogan)}`} />
        <meta property="og:url" content={`https://www.kuratus.com/${username}}`}/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="kuratus.com"/>
        <meta property="twitter:url" content={`https://www.kuratus.com/${username}}`}/>
        <meta name="twitter:title" content={`Kuratus | All of us can be curators of our own learning`}/>
        <meta name="twitter:description" content={`Curated by ${username} | ${slogan} in week ${currentWeek < 10 ? `0${currentWeek}` : currentWeek}`}/>
        <meta name="twitter:image" content={`https://www.kuratus.com/api/og?username=${encodeURIComponent(username)}&slogan=${encodeURIComponent(slogan)}&w=${currentWeek}`}/>
      </Head>
  }

  if (!items) {
    return (
      <div className='mt-10'>
        {showHeader()}
        <p>No data.</p>
        <div class="grid grid-cols-1 place-content-between">
          <Link href="/" class="text-sm font-semibold leading-8">All experts <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    )
  }
  const curatedItem = items.filter(item => item.href && item.title).map((item) =>
    <li key={item.id} class="relative flex items-center space-x-4 py-4">
      <div class="min-w-0">
        <div class="flex items-center gap-x-3">
          <h2 class="min-w-0 text-base font-semibold leading-6">
            <Link href={item.href || '#'} rel="noopener noreferrer" target="_blank"
              className="border-b-2 border-green-500 group transition-all duration-300 ease-in-out relative  pl-1">
              <span class="text-ellipsis">{item.title}</span>
            </Link>
          </h2>
        </div>
        <div class="hyphens-auto mt-3 flex items-center gap-x-2.5 text-base leading-5 text-slate-600">
          <Markdown>{item.description}</Markdown>
          <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-gray-300">
            <circle cx="1" cy="1" r="1" />
          </svg>
        </div>
      </div>
    </li>);

  return (
    <div className='mt-10'>
      {showHeader()}
      <div class="grid grid-cols-2 place-content-between px-6">
        <h2 className='text-lg font-semibold leading-8 tracking-tight'>Week {currentWeek < 10 ? `0${currentWeek}` : currentWeek}</h2>
        <Link href="/" class="text-sm font-semibold leading-8 text-right">All experts <span aria-hidden="true">→</span></Link>
      </div>
      <div className='w-96 border-b border-gray-200 px-6 py-5 sm:px-6'>
        <ul>
          {curatedItem}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const user = context.params?.user;
  const currentWeek = getWeek(new Date());
  const key = `${user}/week-${currentWeek}.json`;
  const profileKey = `${user}/profile.json`;
  // Fetch data from external API
  const items = await GetItem(key)
  const profile = await GetItem(profileKey);

  return { props: { items, username: user, slogan: profile?.slogan } }
}
