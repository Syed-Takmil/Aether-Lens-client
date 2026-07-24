import Link from 'next/link';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const currentPath = usePathname();
  
  return (
    <Link 
      href={href} 
      className={`${
        currentPath === href 
          ? 'border-b-2 border-teal-700 text-teal-700 font-semibold' 
          : 'text-gray-600 hover:text-teal-700 transition'
      } px-3 py-2 rounded-md text-sm font-medium`}
    >
      {children}
    </Link>
  );
};

export default NavLink;