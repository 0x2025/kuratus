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
      <div class="flex flex-col items-center flex-wrap">
                <div class="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
                    <div class="mt-10 sm:mx-auto sm:w-full sm:min-w-[480px]">
                        <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12 prose">
                        <strong>Kuratus&apos; mission is to offer you:</strong>
                            <ul>
                                <li>A professional network where people share what they&apos;re learning.</li>
                                <li>Curate your own learning. Aspired to</li>
                                <ul>
                                    <li>https://this-week-in-rust.org</li>
                                    <li>https://nodeweekly.com</li>
                                    <li>https://elixirweekly.net</li>
                                </ul>
                                <li>No distractions. <code>Control + K</code> allows for quick and furious action.</li>
                                <li>Discover what other professionals are studying.</li>
                            </ul>
                            <strong>Begin with simplicity.</strong>
                            <ol>
                                <li>
                                  <Link href={'/signup'}>Create an account.</Link></li>
                                <li>
                                Sign in to the app after <Link href={'/download'}>downloading</Link>. You are now ready to share!
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
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
