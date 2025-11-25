'use client';
import { H2 } from '../../text/H2.js';
import { Blockquote } from '../../text/Blockquote.js';
import clsx from 'clsx';
import type { ThemeContext } from '../../../types/context-types/index.js';
import { Section } from '../../components/Section.js';
import type { SectionOptions } from '../../components/Section.js';
import type { FaqBlockData } from '../../../types/sanity-data-types/blocks/index.js';
import type { ThemeColor } from '../../../types/style-types/style-class-names.js';
import type { TextStyleOptions } from '../../../types/style-types/text-style-classes.js';
import type {
  TextClassOverrides,
  TextElement,
} from '../../../types/style-types/text-style-classes.js';
import type { BorderColor } from '../../../types/style-types/border-style-classes.js';
import {
  getBorderColorClass,
  getBorderEdgeClass,
} from '../../style/style-utils/border-style-utils.js';
import { getGapSpacingClass } from '../../style/style-utils/layout-style-utils.js';
import { FaqItem } from './FaqItem.js';
import { FAQ_DEFAULTS } from './faq-block-config.js';

/**
 * Helper function to generate border classes
 */
const getBorderClasses = (
  edge: 'top' | 'bottom' | 'left' | 'right' | 'all',
  borderColor: BorderColor | undefined,
  borderThickness: 'thin' | 'medium' | 'thick' | undefined,
  context: ThemeContext
) => {
  const colorClass = getBorderColorClass(
    borderColor || FAQ_DEFAULTS.border.color,
    context.styleClasses
  );
  const edgeClass = getBorderEdgeClass(
    edge,
    borderThickness || FAQ_DEFAULTS.border.thickness,
    context.styleClasses
  );

  return { colorClass, edgeClass };
};

/**
 * Helper function to generate layout classes
 */
const getLayoutClasses = (context: ThemeContext) => {
  const gapClass = getGapSpacingClass(FAQ_DEFAULTS.layout.columnGap, context.styleClasses);
  const colOneClass = 'w-full, lg:w-1/3';
  const colTwoClass = 'w-full lg:w-2/3';

  return { gapClass, colOneClass, colTwoClass };
};

type FaqOptions = {
  sectionOptions?: SectionOptions;
  descriptionOptions?: {
    sidebarRuleColor?: ThemeColor;
    className?: string;
    classOverrides?: TextClassOverrides;
    styleOptions?: TextStyleOptions;
    id?: string;
  };
  headlineOptions?: {
    styleOptions?: TextStyleOptions;
    className?: string;
    classOverrides?: TextClassOverrides;
    as?: TextElement;
    id?: string;
  };
  faqContentOptions?: {
    id?: string;
  };
  questionOptions?: {
    styleOptions?: TextStyleOptions;
    className?: string;
    classOverrides?: TextClassOverrides;
    borderColor?: BorderColor;
    borderThickness?: 'thin' | 'medium' | 'thick';
  };
  answerOptions?: {
    className?: string;
    classOverrides?: TextClassOverrides;
    styleOptions?: TextStyleOptions;
  };
  plusIconOptions?: {
    color?: ThemeColor;
  };
};

type FaqBlockProps = {
  data: FaqBlockData;
  options?: FaqOptions;
  context: ThemeContext;
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
};

export const FaqBlock: React.FC<FaqBlockProps> = ({
  data,
  options,
  context,
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
    borderThickness,
    context
  );

  // Get layout classes using helper function
  const { gapClass, colOneClass, colTwoClass } = getLayoutClasses(context);

  // Set up description border color override
  const descriptionBorderColorClass = getBorderColorClass(
    descriptionOptions.sidebarRuleColor || FAQ_DEFAULTS.blockquote.borderColor,
    context.styleClasses
  );

  const descriptionClassOverrides =
    typeof descriptionOptions.classOverrides === 'string'
      ? descriptionOptions.classOverrides
      : {
          ...descriptionOptions.classOverrides,
          borderColor:
            descriptionOptions.classOverrides?.borderColor || descriptionBorderColorClass,
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
    <Section
      context={context}
      {...sectionOptions}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      id={id}
    >
      <div className={clsx('flex flex-wrap lg:flex-nowrap', gapClass)}>
        <div className={colOneClass}>
          {heading && <H2 {...mergedHeadlineOptions}>{heading}</H2>}
          {description && (
            <Blockquote
              classOverrides={descriptionClassOverrides}
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
              <FaqItem qa={faq} index={index} key={index} options={options} context={context} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
