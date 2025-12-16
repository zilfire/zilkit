import { LuLayoutDashboard as DashboardIcon } from 'react-icons/lu';
import { RiInputField as InputIcon } from 'react-icons/ri';
import { FaRegImage as ImageIcon } from 'react-icons/fa';

const CMSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M14 8h4" />
      <path d="M14 12h4" />
      <path d="M14 16h4" />
    </svg>
  );
};

export type IconConfig = {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type IconRegistry = {
  [key: string]: IconConfig;
};

export const iconRegistry: IconRegistry = {
  dashboard: {
    title: 'Dashboard',
    Icon: DashboardIcon,
  },
  inputField: {
    title: 'Input Field',
    Icon: InputIcon,
  },
  image: {
    title: 'Image',
    Icon: ImageIcon,
  },
  cms: {
    title: 'CMS',
    Icon: CMSIcon,
  },
};
