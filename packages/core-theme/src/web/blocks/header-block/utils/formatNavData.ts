import {
  NavMenuWithInternalPath,
  NavLinkWithInternalPath,
} from '../../../../sanity/data-types/objects/nav-link-data.types.js';

export type FormattedNavChild = {
  text: string;
  href?: string;
};

export type FormattedNavElement = {
  text: string;
  href?: string;
  children?: FormattedNavChild[];
};

export type FormattedNavData = FormattedNavElement[] | null;

const formatNavData = (navMenu: NavMenuWithInternalPath): FormattedNavData => {
  if (!navMenu || !navMenu.navElements) {
    console.log('No navElements found in navMenu');
    return null;
  }

  const formatHref = (navLink: NavLinkWithInternalPath): string => {
    let href: string | undefined = undefined;
    let id = navLink.internalLink?.id || undefined;
    if (id) {
      if (typeof id === 'string' && id.startsWith('#')) {
        id = id.slice(1);
      }
    }
    if (navLink.useInternalPath === true && navLink.internalPath) {
      href = navLink.internalPath;
    } else if (
      navLink.externalLink &&
      navLink.externalLink.href &&
      navLink.externalLink.href.length > 0
    ) {
      href = navLink.externalLink.href;
    }

    if (typeof id === 'string' && id !== '' && navLink.useInternalPath === true) {
      href += `#${id}`;
    }

    return href || '#';
  };

  const formattedNavData: FormattedNavData = navMenu.navElements.map((navElement) => {
    const text = navElement.navItem.text || '';

    let href: string | undefined = undefined;
    if (navElement.navItem.link && (!navElement.children || navElement.children.length == 0)) {
      href = formatHref(navElement.navItem.link);
    }

    let children: FormattedNavChild[] | undefined = undefined;

    if (navElement.children && navElement.children.length > 0) {
      children = navElement.children.map((navChild) => {
        const text = navChild.text || '';
        const href = navChild.link ? formatHref(navChild.link) : undefined;
        return { text, href };
      });
    }

    return { text, href, children };
  });

  return formattedNavData;
};

export default formatNavData;
