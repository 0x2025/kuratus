import { ImageResponse } from '@vercel/og';
import { getWeek, nextSunday, previousMonday, getYear, getDaysInYear, getDayOfYear, format } from 'date-fns'

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const today = new Date();
  const currentWeek = getWeek(today);
  const sunday = format(nextSunday(today), 'dd MMM');
  const monday = format(previousMonday(today), 'dd MMM');
  const year = getYear(today);
  const totalDays = getDaysInYear(today);
  const percentOfYear = ((getDayOfYear(today)) / totalDays) * 100;
  const percentOfYearRounded = Math.floor(percentOfYear * 10) / 10;
  const { searchParams } = request.nextUrl;

  const username = searchParams.get('username');
  const slogan = searchParams.get('slogan');

  if (!username || !slogan) {
    return new ImageResponse(<div
      style={{
        display: 'flex',
        fontSize: 40,
        color: 'black',
        background: 'white',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Kuratus.com - Curated by experts.</div>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
        }}
      >
        <div tw="flex text-6xl">
          <div tw="flex flex-col p-8 w-full">
            <h2 tw="flex flex-col text-gray-900 text-left">
              <span tw="pt-10 text-gray-900">
                Week {currentWeek < 10 ? `0${currentWeek}` : currentWeek}
                <sub tw="text-4xl text-gray-900 pl-4">{`${monday} - ${sunday}`}</sub>
              </span>
              <div tw="mt-4 text-3xl">{`${year} Year progress`}</div>
              <div style={{ display: 'flex' }} tw="w-full h-12 bg-gray-100">
                <div tw="h-12 text-white bg-lime-500" style={{ width: `${percentOfYearRounded}%`, display: 'flex' }}>
                  <span tw="pl-2 text-3xl">{percentOfYearRounded} %</span>
                </div>
              </div>
            </ h2>
            <div style={{ display: 'flex' }} tw='text-4xl'>
              {/* <span>Keywords: nodejs, tdd, LLM, RAG, LangChain</span> */}
              <span tw="">Curated by {username} | {slogan}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}