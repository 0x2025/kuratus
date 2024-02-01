import { getWeek } from 'date-fns'

import { useParams } from 'next/navigation'

export default function User() {
  const params = useParams();
  const currentWeek = getWeek(new Date());
  return (
    <div>
      user:{params?.user}
      week: {currentWeek}
    </div>
  );
}