import { GetItem } from "@/libs/Db";
import Link from 'next/link'

export default function Home(props) {

  const listCuratus = props.users?.filter(u=>u.username).map((curate) =>
    <CurateItem key={curate.username} username={curate.username} slogan={curate.slogan} ></CurateItem>
  );
  return (
    <div>
      <div class="flex items-center flex-wrap pt-10 px-6">
        {listCuratus}
      </div>
    </div>
  );
}

function CurateItem(props) {
  return (
    <Link href={`/${props.username}`} 
    className="group my-2 items-center rounded-md
    bg-white/25 px-3 py-2 text-slate-900 ring-1 ring-inset ring-black/[0.08] hover:bg-white/50 hover:ring-black/[0.13] sm:flex md:ml-8 min-[1300px]:flex">
      <span class="font-semibold pr-2">{props.username}
      </span>
      <span>
        {props.slogan}
      </span>
    </Link>
  )
}




export const getServerSideProps = async (context) => {
  const users = await GetItem("users.json")
  return { props: { users } }
}
