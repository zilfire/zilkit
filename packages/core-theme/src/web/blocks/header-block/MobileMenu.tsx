import clsx from 'clsx';
import type { ThemeContext } from '../../../config/types/config.types.js';
import type { FormattedNavData } from './utils/formatNavData.js';
import { FaChevronDown as Chevron } from 'react-icons/fa6';
// import { MdOutlineMail as EmailIcon, MdOutlinePhoneInTalk as PhoneIcon } from 'react-icons/md';
import { useRef, useEffect } from 'react';

type MobileMenuProps = {
  navData?: FormattedNavData;
  context: ThemeContext;
  sidePanelOpen: boolean;
  setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  navData,
  setSidePanelOpen,
  sidePanelOpen,
  context,
}) => {
  useEffect(() => {
    if (!sidePanelOpen) {
      removeActiveClasses();
    }
  }, [sidePanelOpen]);

  const NextLink = context.LinkComponent;

  const collapsibleRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);

  const removeActiveClasses = () => {
    collapsibleRefs.current.forEach((menu) => {
      if (menu) {
        menu.classList.remove('active');
        const content = menu.querySelector('.content') as HTMLElement;
        if (content) {
          content.style.maxHeight = '0';
        }
        const chevron = menu.querySelector('.chevron');
        if (chevron) {
          chevron.classList.remove('rotate-180');
        }
        const button = menu.querySelector('.collapsible');
        if (button) {
          button.classList.remove('text-gray-700');
        }
      }
    });
  };

  const handleToggle = (index: number) => {
    const menu = collapsibleRefs.current[index];
    if (menu) {
      let active = false;
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
      } else {
        menu.classList.add('active');
        active = true;
      }
      const chevron = menu.querySelector('.chevron');
      const button = menu.querySelector('.collapsible');
      const content = menu.querySelector('.content') as HTMLElement;
      if (!content) return;

      if (active) {
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        content.style.maxHeight = '0';
      }
      if (chevron) {
        chevron.classList.toggle('rotate-180', active);
      }
      if (button) {
        button.classList.toggle('text-gray-700', active);
      }
    }
  };

  if (!navData) {
    return null;
  }
  return (
    <div>
      {navData.map((element, index) => {
        if (!element.children || element.children.length == 0) {
          return (
            <NextLink
              ref={(el) => {
                collapsibleRefs.current[index] = el;
              }}
              key={index}
              href={element.href || '#'}
              onClick={() => {
                setSidePanelOpen(false);
                console.log('collapsibleRefs', collapsibleRefs);
                removeActiveClasses();
              }}
              className={clsx(
                'my-4 block text-base font-semibold text-gray-950',
                'hover:text-gray-700 focus:text-gray-700 focus:outline-none'
              )}
            >
              {element.text}
            </NextLink>
          );
        }

        return (
          <div
            key={index}
            className="my-4"
            ref={(el) => {
              collapsibleRefs.current[index] = el;
            }}
          >
            <button
              className={clsx(
                'collapsible',
                'w-full cursor-pointer text-left font-semibold text-gray-950 outline-none',
                'focus:outline-none'
              )}
              aria-expanded={false}
              aria-controls="collapsible-content-0"
              role="button"
              id={`collapsible-button-0${index}`}
              onClick={() => {
                handleToggle(index);
              }}
            >
              <span>
                {element.text}
                <Chevron className="chevron ml-1 inline-block h-3 w-3 transition-transform duration-500" />
              </span>
            </button>
            <div
              // id="collapsible-content-0"
              className={clsx(
                'content',
                'transition-max-height overflow-hidden duration-300 ease-out',
                ''
              )}
              style={{ maxHeight: '0' }}
              role="region"
              aria-labelledby="collapsible-button-0"
            >
              <ul className="list-outside px-2 pt-2">
                {element.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <NextLink
                      href={child.href || '#'}
                      className={clsx(
                        'font-body block text-base text-gray-700',
                        'hover:text-gray-700 focus:text-gray-700 focus:outline-none',
                        childIndex === element.children!.length - 1 ? '' : 'pb-2'
                      )}
                      onClick={() => {
                        setSidePanelOpen(false);
                        removeActiveClasses();
                      }}
                    >
                      {child.text}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      {/* <div>
        <a href="mailto:info@zilfire.com" className="mb-4 inline-block text-sky-950 font-semibold">
          <EmailIcon className="mr-1 inline" />
          info@zilfire.com
        </a>

        <a href="tel:9197713230" className="mb-4 inline-block text-sky-950 font-semibold">
          <PhoneIcon className="mr-1 inline" />
          704-512-0125
        </a>
      </div> */}
    </div>
  );
};

export default MobileMenu;
