import { ImageResponse } from '@vercel/og';
import { getWeek, nextSunday, isSunday, previousMonday, getYear, getDaysInYear, getDayOfYear, format, isMonday } from 'date-fns'

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const today = new Date();
  const currentWeek = getWeek(today);

  const sunday = format(isSunday(today) ? today : nextSunday(today), 'dd MMM');
  const monday = format(isMonday(today) ? today : previousMonday(today), 'dd MMM');
  const year = getYear(today);
  const totalDays = getDaysInYear(today);
  const percentOfYear = ((getDayOfYear(today)) / totalDays) * 100;
  const percentOfYearRounded = Math.floor(percentOfYear * 10) / 10;
  const { searchParams } = request.nextUrl;

  const username = searchParams.get('username');
  const slogan = searchParams.get('slogan');
  const keywords = searchParams.get('keywords') || '.NET, nodejs, TDD, LLM, RAG, LangChain';

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
          <div tw="flex flex-col px-4 w-full">
            <h2 tw="flex flex-col text-gray-900 text-left">
              <span tw="text-gray-900">
                Week {currentWeek < 10 ? `0${currentWeek}` : currentWeek}
                <sub tw="text-4xl text-gray-900 pl-4">{`${monday} - ${sunday}`}</sub>
              </span>
              <div tw="mt-2 text-3xl">{`${year} Year progress`}</div>
              <div style={{ display: 'flex' }} tw="w-full h-12 bg-gray-100">
                <div tw="h-12 text-white bg-green-500 justify-center p-0.5 text-3xl" style={{ width: `${percentOfYearRounded}%`, display: 'flex' }}>
                  {`${percentOfYearRounded}%`}
                </div>
              </div>
            </ h2>
            <div style={{ display: 'flex' }} tw='text-4xl flex-col justify-items-start'>
              <span tw="">Curated by {username} | {slogan}</span>
              <span tw="pt-4 text-2xl">{`Keywords: ${keywords}`}</span>
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