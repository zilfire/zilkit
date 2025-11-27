'use client';
import type { FormattedNavData } from './utils/formatNavData.js';
import SanityImage from '@zilfire/next-sanity-image';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import DesktopNav from './DesktopNav.js';
import { IoIosMenu as MenuIcon } from 'react-icons/io';
import type { ThemeContext } from '../../../config/types/config.types.js';

type NavigationProps = {
  navData?: FormattedNavData;
  logo?: SanityImageWithAlt;
  sidePanelOpen: boolean;
  setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  context: ThemeContext;
};

export const Navigation: React.FC<NavigationProps> = ({
  navData,
  logo,
  setSidePanelOpen,
  context,
}) => {
  const { sanityConfig, LinkComponent: NextLink } = context;
  return (
    <>
      <div className="container mx-auto flex px-2 md:px-4 lg:px-6 items-center">
        <div className="align-center relative mr-4 flex w-40 items-center md:w-44">
          <div className="w-40 sm:w-48 md:w-52">
            {logo && (
              <NextLink href="/">
                <SanityImage
                  imageObject={logo}
                  alt={logo.alt}
                  imageSizes={[200, 260, 400]}
                  priority={true}
                  sanityConfig={sanityConfig}
                />
              </NextLink>
            )}
          </div>
        </div>
        <div className="hidden grow items-center justify-end 2xl:flex">
          <DesktopNav navData={navData} context={context} />
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
