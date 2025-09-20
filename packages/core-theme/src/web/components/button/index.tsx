// @ts-ignore
import Link from 'next/link';

export type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  path: string;
};

export const Button: React.FC<ButtonProps> = ({ onClick, children, path }) => {
  return (
    <Link href={path}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">{children}</button>
    </Link>
  );
};
