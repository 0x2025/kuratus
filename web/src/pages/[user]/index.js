import { GetItem, ListOf } from '@/libs/Db';
import { getWeek, isSunday } from 'date-fns'
import Curator from '@/components/curator';

export default function User(props) {
  const today = new Date();
  const currentWeek = isSunday(today) ? getWeek(new Date()) - 1 : getWeek(new Date());
  const { items, username, slogan, weeks } = props;
  return (
    <Curator items={items} username={username} slogan={slogan} weeks={weeks} currentWeek={currentWeek}></Curator>
  )
}

export const getServerSideProps = async (context) => {
  const user = context.params?.user;
  const today = new Date();
  const currentWeek = isSunday(today) ? getWeek(new Date()) - 1 : getWeek(new Date());
  const key = `${user}/week-${currentWeek}.json`;
  const profileKey = `${user}/profile.json`;
  // Fetch data from external API
  const items = await GetItem(key)
  const profile = await GetItem(profileKey);
  const listWeeks = await ListOf(`${user}`, { prefix: `${user}/week` });

  return { props: { weeks: listWeeks?.map(w => getWeekFromKey(w.Key)), items, username: user, slogan: profile?.slogan } }
}


function getWeekFromKey(key) {
  const startIdx = key.indexOf('-') + 1;
  if (startIdx < 0) return;
  const endIdx = key.lastIndexOf('.') - startIdx;
  const value = key.substr(startIdx, endIdx);
  console.log('value', value, key)
  return value;
}