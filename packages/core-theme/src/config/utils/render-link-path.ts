import type { NavLink } from '../../sanity/data-types/index.js';

export const renderLinkPath = (NavLink: NavLink): string => {
  const { useInternalPath, internalLink, externalLink, internalPath } = NavLink;
  if (useInternalPath && internalPath) {
    const idString = internalLink?.id ? `#${internalLink.id}` : '';

    return internalPath + idString;
  } else if (externalLink && externalLink.href) {
    return externalLink.href;
  }
  return '';
};
