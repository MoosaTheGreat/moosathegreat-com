import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <Link href="/">
        <a className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
          </div>
          <span className="font-bold uppercase tracking-widest hidden md:block">MoosaTheGreat</span>
        </a>
      </Link>
      <nav>
        <Link href="/admin"><a className="text-xs uppercase tracking-widest hover:text-gray-400">Admin Panel</a></Link>
      </nav>
    </header>
  );
};

export default Header;