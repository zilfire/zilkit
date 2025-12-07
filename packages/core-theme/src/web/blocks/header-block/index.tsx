'use client';
import clsx from 'clsx';
import { MdOutlineMail as EmailIcon, MdOutlinePhoneInTalk as PhoneIcon } from 'react-icons/md';
import { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation.js';
import MobileNav from './MobileNav.js';
import type { HeaderBlockData } from '../../../sanity/data-types/blocks/header-block-data.types.js';
import formatNavData from './utils/formatNavData.js';

type HeaderProps = {
  data: HeaderBlockData;
  promoBar?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ data: { logo, navData }, promoBar }) => {
  // const { sanityConfig } = context;
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerStatus, setHeaderStatus] = useState<
    'relative' | 'absolute' | 'fixed-above' | 'fixed'
  >('relative');
  const [headerLive, setHeaderLive] = useState(false);

  const navBarRef = useRef<HTMLDivElement>(null);
  const promoBarRef = useRef<HTMLDivElement>(null);
  const formattedNavData = navData ? formatNavData(navData) : undefined;

  useEffect(() => {
    if (headerHeight !== 0 || !navBarRef.current || headerStatus !== 'relative') return;
    setHeaderHeight(navBarRef.current.clientHeight);
    setHeaderStatus('absolute');
    setHeaderLive(true);
  }, [headerHeight, headerStatus]);

  useEffect(() => {
    if (!headerLive || !window) return;
    const handleScroll = () => {
      const header = navBarRef.current;
      if (header) {
        if (window.scrollY > headerHeight && headerStatus === 'absolute') {
          setHeaderStatus('fixed-above');
          setShowPromo(false);
        } else if (window.scrollY <= headerHeight) {
          if (!showPromo) {
            setShowPromo(true);
          }
          if (window.scrollY === 0) {
            setTimeout(() => {
              setHeaderStatus('absolute');
            }, 300);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerLive, headerStatus, headerHeight, showPromo]);

  useEffect(() => {
    if (headerStatus === 'fixed-above') {
      setTimeout(() => {
        setHeaderStatus('fixed');
      }, 300);
    }
  }, [headerStatus]);

  const PromoBar = () => (
    <div className={clsx('bg-sky-900 hidden overflow-hidden md:block')} ref={promoBarRef}>
      <div className="text-md container mx-auto text-right px-2 md:px-4 lg:px-6">
        <div className="py-1 space-x-4 flex justify-end">
          <a
            href="mailto:info@zilfire.com"
            className="text-white hover:text-amber-100  align-middle"
          >
            <EmailIcon className="mr-1 inline " />
            info@zilfire.com
          </a>

          <a href="tel:7045120125" className=" text-white hover:text-amber-100  align-middle">
            <PhoneIcon className="mr-1 inline " />
            704-512-0125
          </a>
        </div>
      </div>
    </div>
  );

  const Navbar = () => (
    <div className={`py-3`}>
      {formattedNavData && (
        <Navigation
          navData={formattedNavData}
          logo={logo}
          sidePanelOpen={sidePanelOpen}
          setSidePanelOpen={setSidePanelOpen}
        />
      )}
    </div>
  );

  return (
    <header id="header" className={`transition-all duration-500 w-full relative`}>
      <div className="2xl:hidden">
        {formattedNavData && (
          <MobileNav
            navData={formattedNavData}
            sidePanelOpen={sidePanelOpen}
            setSidePanelOpen={setSidePanelOpen}
          />
        )}
      </div>
      <div
        className={clsx(
          'z-40 bg-white  shadow-sm w-svw',
          headerStatus === 'fixed-above' && 'fixed left-0 top-0 -translate-y-full ',
          headerStatus === 'fixed' &&
            'fixed left-0 translate-y-0 transition-transform duration-300 ',
          headerStatus === 'relative' && 'relative ',
          headerStatus === 'absolute' && 'absolute left-0 top-0 '
        )}
        ref={navBarRef}
      >
        {promoBar !== false && (
          <div>
            <div
              className={clsx(
                'overflow-hidden transition-all duration-300',
                showPromo ? 'max-h-10' : 'max-h-0'
              )}
            >
              <PromoBar />
            </div>
          </div>
        )}
        <Navbar />
      </div>
      <div
        className="bg-white"
        style={{ height: headerStatus === 'relative' ? '0' : headerHeight }}
      />
    </header>
  );
};
