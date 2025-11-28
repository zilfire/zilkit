import type { FormattedNavData, FormattedNavElement } from './utils/formatNavData.js';
import clsx from 'clsx';
import type { ThemeContext } from '../../../config/types/config.types.js';
// import { useState } from "react";
import { FaChevronDown as Chevron } from 'react-icons/fa6';

type DesktopNavProps = {
  navData?: FormattedNavData;
  context: ThemeContext;
};

const renderNavElement = (
  element: FormattedNavElement,
  context: ThemeContext,
  index: number
): React.ReactElement | null => {
  const NextLink = context.LinkComponent;
  if (!element) return null;
  if (!element.children || element.children.length == 0) {
    return (
      <NextLink
        key={index}
        href={element.href || '#'}
        className={clsx('font-body text-base font-semibold', 'text-gray-950 hover:text-green-700')}
      >
        {element.text}
      </NextLink>
    );
  }

  return (
    <div key={index} className="group relative">
      <button
        className={clsx('font-body text-base font-semibold text-gray-950', 'hover:text-green-700')}
      >
        {element.text}
        <Chevron className="ml-1 inline h-3 w-3" />
      </button>
      <div
        className={clsx(
          'element-children absolute -left-4 hidden',
          'z-50 w-56 min-w-full py-1.5 opacity-0',
          'duration-5000 transition-opacity group-hover:block group-hover:opacity-100'
        )}
      >
        <div className="rounded-lg bg-gray-50 py-2 shadow-lg">
          {element.children.map((child, childIndex) => (
            <NextLink
              key={childIndex}
              href={child.href || '#'}
              className="font-body block px-4 py-1 text-base text-gray-950 hover:bg-green-100"
            >
              {child.text}
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
};

const DesktopNav: React.FC<DesktopNavProps> = ({ navData, context }) => {
  if (!navData) return null;
  return (
    <nav className="flex space-x-4">
      {navData.map((element, index) => renderNavElement(element, context, index))}
    </nav>
  );
};

export default DesktopNav;
