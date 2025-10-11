import clsx from 'clsx';
import { ThemeColor, ColorTone, OpacityOption } from '../../../types/style-types/index.js';
import { styleGuide } from '../../style/style-guide.js';
import { getBGColorClass } from '../../style/utils.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import type { ThemeContext } from '../../../types/context-types/index.js';
import SanityImage from '@zilfire/next-sanity-image';

export type HeroSectionProps = {
  children?: React.ReactNode;
  className?: string;
  classOverride?: boolean;
  bgColor?: ThemeColor;
  bgColorTone?: ColorTone;
  overlayColor?: ThemeColor;
  overlayColorTone?: ColorTone;
  overlayOpacity?: OpacityOption;
  backgroundImage?: SanityImageWithAlt;
  themeContext: ThemeContext;
};

const defaultBGColorTone: ColorTone = '500';
const defaultClassName = 'relative overflow-hidden';

export const HeroSection: React.FC<HeroSectionProps> = ({
  children,
  className,
  classOverride,
  bgColor,
  bgColorTone = defaultBGColorTone,
  backgroundImage,
  themeContext,
}) => {
  const bgClass = bgColor ? getBGColorClass(bgColor, bgColorTone, styleGuide) : false;
  const { sanityConfig } = themeContext;

  return (
    <section className={clsx(classOverride !== true && defaultClassName, className, bgClass)}>
      {backgroundImage && (
        <div className="absolute z-0 w-full h-full">
          <SanityImage
            imageObject={backgroundImage}
            alt={backgroundImage.alt || 'Hero Image'}
            sanityConfig={sanityConfig}
            layout="cover"
          />
        </div>
      )}
      {children}
    </section>
  );
};
