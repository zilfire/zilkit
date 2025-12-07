'use client';
import type { FormattedNavData } from './utils/formatNavData.js';
import SanityImage from '@zilfire/next-sanity-image';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import DesktopNav from './DesktopNav.js';
import { IoIosMenu as MenuIcon } from 'react-icons/io';
import Image from '../../components/Image.js';
import NextLink from 'next/link';

type NavigationProps = {
  navData?: FormattedNavData;
  logo?: SanityImageWithAlt;
  sidePanelOpen: boolean;
  setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navigation: React.FC<NavigationProps> = ({ navData, logo, setSidePanelOpen }) => {
  return (
    <>
      <div className="container mx-auto flex px-2 md:px-4 lg:px-6 items-center">
        <div className="align-center relative mr-4 flex w-40 items-center md:w-44">
          <div className="w-40 sm:w-48 md:w-52">
            {logo && (
              <NextLink href="/">
                <Image
                  imageObject={logo}
                  alt={logo.alt}
                  imageSizes={[200, 260, 400]}
                  priority={true}
                />
              </NextLink>
            )}
          </div>
        </div>
        <div className="hidden grow items-center justify-end 2xl:flex">
          <DesktopNav navData={navData} />
        </div>
        <div className="grow 2xl:hidden">
          <div className="flex flex-row-reverse">
            <button
              id="open-side-panel"
              type="button"
              className="m-1"
              onClick={() => {
                setSidePanelOpen(true);
              }}
            >
              <MenuIcon className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:ring-2 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 md:h-10 md:w-10" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
