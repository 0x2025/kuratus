import Link from "next/link";
import Markdown from 'react-markdown';
import Head from 'next/head'
import Image from 'next/image';
import noDataIcon from "../../public/nodata-bro.svg";

export default function Curator(props) {
    const { items, username, slogan, weeks, currentWeek } = props;
    const weekItem = weeks?.filter(w => w)?.map((item) => {
        const week = parseInt(item);

        return (<span key={week} className="hover:text-green-500 dark:hover:text-green-400">
            <Link href={`/${username}/weeks/${week}`}>{`Week ${week > 9 ? `${week}` : `0${week}`}`}</Link>
        </span>
        )
    })
    const curatedItem = items?.filter(item => item.href && item.title).map((item) =>
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
            <Head>
                <title>{`Kuratus | All of us can be curators of our own learning.`}</title>
                <meta name="description" content={`Curated by ${username} | ${slogan} in week ${currentWeek < 10 ? `0${currentWeek}` : currentWeek}`} />
                <meta property="og:title" content={`Kuratus | All of us can be curators of our own learning.`} />
                <meta property="og:description" content={`Curated by ${username} | ${slogan} in week ${currentWeek < 10 ? `0${currentWeek}` : currentWeek}`} />
                <meta property="og:image" content={`https://www.kuratus.com/api/og?week=${currentWeek}&username=${encodeURIComponent(username)}&slogan=${encodeURIComponent(slogan)}`} />
                <meta property="og:url" content={`https://www.kuratus.com/${username}/weeks/${currentWeek}`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="kuratus.com" />
                <meta property="twitter:url" content={`https://www.kuratus.com/${username}/weeks/${currentWeek}`} />
                <meta name="twitter:title" content={`Kuratus | All of us can be curators of our own learning`} />
                <meta name="twitter:description" content={`Curated by ${username} | ${slogan} in week ${currentWeek < 10 ? `0${currentWeek}` : currentWeek}`} />
                <meta name="twitter:image" content={`https://www.kuratus.com/api/og?week=${currentWeek}&username=${encodeURIComponent(username)}&slogan=${encodeURIComponent(slogan)}`} />
            </Head>
            <div class="grid grid-cols-2 place-content-between px-6">
                <h2 className='text-lg font-semibold leading-8 tracking-tight'>
                    <Link href={`/${username}/weeks/${currentWeek}`}>Week {currentWeek < 10 ? `0${currentWeek}` : currentWeek}</Link>
                </h2>
                <Link href="/" class="text-sm font-semibold leading-8 text-right">All experts <span aria-hidden="true">→</span></Link>
            </div>
            {!items ? <>
                <div className='w-96'>
                    <Image src={noDataIcon} alt='No data'></Image>
                    <p className='text-center'>
                        <strong>Welcome to Kuratus.</strong>
                        The author hasn&apos;t shared in this week yet. In the meantime, you can <Link
                            className="border-b-2 border-green-500 group transition-all duration-300 ease-in-out relative"
                            href={'/signup'}>create an account</Link> and share your own learning to the world.
                    </p>
                </div>
            </> : <>
                <div className='w-96 px-6 py-5 sm:px-6'>
                    <ul>
                        {curatedItem}
                    </ul>
                </div>
            </>}

            <div class="flex-wrap space-x-2 items-center mt-10 px-6 border-t border-gray-200 ">
                {weekItem}
            </div>

        </div>
    );
}