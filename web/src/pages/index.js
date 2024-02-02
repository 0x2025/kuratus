import { Playfair_Display } from "next/font/google";
import Link from 'next/link'

const inter = Playfair_Display({ subsets: ["latin"] });
const data = [
  {
    user: 'sang',
    slogan: 'Follow me on software architecture'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  },
  {
    user: 'dale',
    slogan: 'software development icon.'
  }
]
const listCuratus = data.map((curate) =>
  <CurateItem key={curate.user} user={curate.user} slogan={curate.slogan} ></CurateItem>
);

export default function Home() {
  return (
    <div>
      <div class="flex items-center flex-wrap pt-10">
        {listCuratus}
      </div>
    </div>
  );
}

function CurateItem(props) {
  return (

    <Link href={`/${props.user}`} className="group my-2 ml-6 items-center gap-2 rounded-full bg-white/25 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 ring-1 ring-inset ring-black/[0.08] hover:bg-white/50 hover:ring-black/[0.13] sm:flex md:ml-8 min-[1300px]:flex">
      <span class="font-semibold">{props.user}</span><svg width="2" height="2" aria-hidden="true"
        class="fill-slate-900 dark:fill-white">
        <circle cx="1" cy="1" r="1"></circle>
      </svg><span class="font-medium">
        <span class="inline">{props.slogan}</span></span><svg viewBox="0 0 5 8"
          class="h-2 w-[5px] fill-black/30 dark:fill-white " fill-rule="evenodd" clip-rule="evenodd"
          aria-hidden="true">
        <path
          d="M.2.24A.75.75 0 0 1 1.26.2l3.5 3.25a.75.75 0 0 1 0 1.1L1.26 7.8A.75.75 0 0 1 .24 6.7L3.148 4 .24 1.3A.75.75 0 0 1 .2.24Z">
        </path>
      </svg>
    </Link>
  )
}