import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
}

const NavLink = ({ href, children, active }: NavLinkProps) => {
  const highlightCurrentPath = active ? 'font-semibold underline' : '';
  return (
    <Link href={href} className={`hover:text-gray-300 ${highlightCurrentPath}`}>
      {children}
    </Link>
  );
};

export default NavLink;
