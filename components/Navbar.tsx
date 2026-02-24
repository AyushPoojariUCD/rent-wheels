import Link from 'next/link';
import Image from 'next/image';

import CustomButton from './CustomButton';

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image 
            src="/logo.png"
            alt="Car Hub Logo"
            width={118}
            height={18}
            className="object-contain hover:shadow-lg
            hover:scale-105
            transition-all
            duration-300"
          />
        </Link>

        <CustomButton 
          title="Sign In"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] hover:shadow-lg
            hover:scale-105
            transition-all
            duration-300"
        />
      </nav>
    </header>
  )
}

export default Navbar;