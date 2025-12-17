'use client';
import { H2 } from '../../text/H2.js';
import { Blockquote } from '../../text/Blockquote.js';
import clsx from 'clsx';
import type { ThemeContext } from '../../../config/context.js';
import { Section } from '../../components/Section.js';
import type { SectionOptions } from '../../components/Section.js';
import type { FaqBlockData } from '../../../sanity/data-types/index.js';
import type { ThemeColor } from '../../style/types/style.types.js';
import type {
  TextStyleOptions,
  TextStyleOverride,
  TextElement,
} from '../../style/types/text-style-classes.js';
import type { BorderColor } from '../../style/types/border-style.types.js';
import { getBorderColorClass, getBorderEdgeClass } from '../../style/utils/border-style-utils.js';
import { getGapSpacingClass } from '../../style/utils/layout-style-utils.js';
import { FaqItem } from './FaqItem.js';
import { FAQ_DEFAULTS } from './faq-block-config.js';
import { styleClassNames } from '../../style/classes/style-classes.js';

/**
 * Helper function to generate border classes
 */
const getBorderClasses = (
  edge: 'top' | 'bottom' | 'left' | 'right' | 'all',
  borderColor: BorderColor | undefined,
  borderThickness: 'thin' | 'medium' | 'thick' | undefined
) => {
  const colorClass = getBorderColorClass(borderColor || FAQ_DEFAULTS.border.color, styleClassNames);
  const edgeClass = getBorderEdgeClass(
    edge,
    borderThickness || FAQ_DEFAULTS.border.thickness,
    styleClassNames
  );

  return { colorClass, edgeClass };
};

/**
 * Helper function to generate layout classes
 */
const getLayoutClasses = () => {
  const gapClass = getGapSpacingClass(FAQ_DEFAULTS.layout.columnGap, styleClassNames);
  const colOneClass = 'w-full, lg:w-1/3';
  const colTwoClass = 'w-full lg:w-2/3';

  return { gapClass, colOneClass, colTwoClass };
};

type FaqOptions = {
  sectionOptions?: SectionOptions;
  descriptionOptions?: {
    sidebarRuleColor?: ThemeColor;
    className?: string;
    styleOverride?: TextStyleOverride;
    styleOptions?: TextStyleOptions;
    id?: string;
  };
  headlineOptions?: {
    styleOptions?: TextStyleOptions;
    className?: string;
    styleOverride?: TextStyleOverride;
    as?: TextElement;
    id?: string;
  };
  faqContentOptions?: {
    id?: string;
  };
  questionOptions?: {
    styleOptions?: TextStyleOptions;
    className?: string;
    styleOverride?: TextStyleOverride;
    borderColor?: BorderColor;
    borderThickness?: 'thin' | 'medium' | 'thick';
  };
  answerOptions?: {
    className?: string;
    styleOverride?: TextStyleOverride;
    styleOptions?: TextStyleOptions;
  };
  plusIconOptions?: {
    color?: ThemeColor;
  };
};

type FaqBlockProps = {
  data: FaqBlockData;
  options?: FaqOptions;
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
};

export const FaqBlock: React.FC<FaqBlockProps> = ({
  data,
  options,
  ariaLabel,
  ariaLabelledby,
  id,
}) => {
  const { heading, description, faqs } = data;
  const { borderColor, borderThickness } = options?.questionOptions || {};
  const {
    headlineOptions = {},
    sectionOptions = {},
    descriptionOptions = {},
    faqContentOptions = {},
  } = options || {};

  const { id: descriptionId } = descriptionOptions;
  const { id: faqContentId } = faqContentOptions;

  // Get border classes using helper function
  const { colorClass: borderColorClass, edgeClass: borderEdgeClass } = getBorderClasses(
    'top',
    borderColor,
    borderThickness
  );

  // Get layout classes using helper function
  const { gapClass, colOneClass, colTwoClass } = getLayoutClasses();

  // Set up description border color override
  const descriptionBorderColorClass = getBorderColorClass(
    descriptionOptions.sidebarRuleColor || FAQ_DEFAULTS.blockquote.borderColor,
    styleClassNames
  );

  const descriptionClassOverrides =
    typeof descriptionOptions.styleOverride === 'string'
      ? descriptionOptions.styleOverride
      : {
          ...descriptionOptions.styleOverride,
          borderColor: descriptionOptions.styleOverride?.borderColor || descriptionBorderColorClass,
        };

  // @todo: Refactor size to accomodate new text size naming convention

  // Set up headline options with defaults
  const mergedHeadlineOptions = {
    ...headlineOptions,
    styleOptions: {
      ...headlineOptions?.styleOptions,
      size: headlineOptions?.styleOptions?.textSize || FAQ_DEFAULTS.headline.size,
    },
  };

  return (
    <Section {...sectionOptions} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} id={id}>
      <div className={clsx('flex flex-wrap lg:flex-nowrap', gapClass)}>
        <div className={colOneClass}>
          {heading && <H2 {...mergedHeadlineOptions}>{heading}</H2>}
          {description && (
            <Blockquote
              styleOverride={descriptionClassOverrides}
              className={descriptionOptions.className}
              styleOptions={descriptionOptions.styleOptions}
              id={descriptionId}
            >
              {description}
            </Blockquote>
          )}
        </div>
        {faqs && faqs.length > 0 && (
          <div className={clsx(colTwoClass, borderEdgeClass, borderColorClass)} id={faqContentId}>
            {faqs.map((faq, index) => (
              <FaqItem qa={faq} index={index} key={index} options={options} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
