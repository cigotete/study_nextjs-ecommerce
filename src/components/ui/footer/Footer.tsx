import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10 pb-5">

      <Link
        href='/'
      >
        <span className={`${ titleFont.className } antialiased font-bold `}>Ewow </span>
        <span>| shop </span>
        <span>&copy; { new Date().getFullYear() }</span>
      </Link>

      <Link
        href='/'
        className="mx-3"
      >
        Legal & Privacy
      </Link>

      <Link
        href='/'
        className="mx-3"
      >
        Locations
      </Link>


    </div>
  )
}