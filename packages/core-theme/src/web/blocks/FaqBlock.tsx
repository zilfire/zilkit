'use client';
import { useRef, useState } from 'react';
import { H2 } from '../text/H2.js';
import { Blockquote } from '../text/Blockquote.js';
import clsx from 'clsx';
import type { ThemeContext } from '../../types/context-types/index.js';
import { Section } from '../components/Section.js';
import type { SectionOptions } from '../components/Section.js';
import { FaPlus as PlusIcon, FaMinus as MinusIcon } from 'react-icons/fa6';
import type { FaqBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { PortableTextBlock } from '@portabletext/types';
import { textComponents } from '../text/text-components.js';
import { PortableText } from 'next-sanity';
import type { ThemeColor } from '../../types/style-types/style-class-names.js';
import type { TextStyleOptions } from '../text/Text.js';
import type {
  TextClassOverrides,
  TextSize,
  TextElement,
} from '../../types/style-types/text-style-classes.js';
import type { BorderColor } from '../../types/style-types/border-style-classes.js';
import { getTextColorClass } from '../style/style-utils/text-style-utils.js';
import {
  getBorderColorClass,
  getBorderEdgeClass,
} from '../style/style-utils/border-style-utils.js';
import {
  getGapSpacingClass,
  getColumnLayoutClass,
} from '../style/style-utils/layout-style-utils.js';

const QUESTION_COLOR_DEFAULT = 'black' as const;
const ANSWER_COLOR_DEFAULT = 'muted' as const;
const PLUS_ICON_COLOR_DEFAULT = 'primary' as const;
const BORDER_COLOR_DEFAULT = 'muted' as const;
const BORDER_THICKNESS_DEFAULT = 'thin' as const;
const COLUMN_GAP_DEFAULT = 'lg' as const;
const FIRST_COLUMN_LAYOUT_DEFAULT = 'third' as const;
const SECOND_COLUMN_LAYOUT_DEFAULT = 'twoThirds' as const;
const BLOCKQUOTE_BORDER_COLOR_DEFAULT = 'primary' as const;
const HEADLINE_SIZE_DEFAULT: TextSize = 'sm' as const;

type FaqOptions = {
  sectionOptions?: SectionOptions;
  descriptionOptions?: {
    sidebarRuleColor?: ThemeColor;
    className?: string;
    classOverrides?: TextClassOverrides;
    styleOptions?: TextStyleOptions;
  };
  headlineOptions?: {
    styleOptions?: TextStyleOptions;
    className?: string;
    classOverrides?: TextClassOverrides;
    as?: TextElement;
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
    size?: TextSize;
  };
};

type FaqBlockProps = {
  data: FaqBlockData;
  options?: FaqOptions;
  context: ThemeContext;
};

type FAQItemProps = {
  qa: {
    question: string;
    answer: PortableTextBlock;
  };
  options?: FaqOptions;
  index: number;
  context: ThemeContext;
};

export const FaqBlock: React.FC<FaqBlockProps> = ({ data, options, context }) => {
  const { heading, description, faqs } = data;
  const { borderColor, borderThickness } = options?.questionOptions || {};
  const { headlineOptions = {}, sectionOptions = {} } = options || {};

  const borderColorClass = getBorderColorClass(
    borderColor || BORDER_COLOR_DEFAULT,
    context.styleClasses
  );
  const borderEdgeClass = getBorderEdgeClass(
    'top',
    borderThickness || BORDER_THICKNESS_DEFAULT,
    context.styleClasses
  );

  const gapClass = getGapSpacingClass(COLUMN_GAP_DEFAULT, context.styleClasses);

  const colOneLayoutClass = getColumnLayoutClass(FIRST_COLUMN_LAYOUT_DEFAULT, context.styleClasses);

  const colTwoLayoutClass = getColumnLayoutClass(
    SECOND_COLUMN_LAYOUT_DEFAULT,
    context.styleClasses
  );

  const blockQuoteBorderClass = getBorderColorClass(
    options?.descriptionOptions?.sidebarRuleColor || BLOCKQUOTE_BORDER_COLOR_DEFAULT,
    context.styleClasses
  );

  headlineOptions.styleOptions = {
    ...headlineOptions?.styleOptions,
    size: headlineOptions?.styleOptions?.size || HEADLINE_SIZE_DEFAULT,
  };

  return (
    <Section context={context} {...sectionOptions}>
      <div className={clsx('flex flex-wrap lg:flex-nowrap', gapClass)}>
        <div className={colOneLayoutClass}>
          {heading && <H2 {...headlineOptions}>{heading}</H2>}
          {description && (
            <Blockquote classOverrides={{ borderColor: blockQuoteBorderClass }}>
              {description}
            </Blockquote>
          )}
        </div>
        {faqs && faqs.length > 0 && (
          <div className={clsx(colTwoLayoutClass, borderEdgeClass, borderColorClass)}>
            {faqs.map((faq, index) => (
              <FaqItem qa={faq} index={index} key={index} options={options} context={context} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

const FaqItem = ({ qa, index, options, context }: FAQItemProps) => {
  const questionTextColor = options?.questionOptions?.styleOptions?.color || QUESTION_COLOR_DEFAULT;
  const answerTextColor = options?.answerOptions?.styleOptions?.color || ANSWER_COLOR_DEFAULT;
  const plusIconColor = options?.plusIconOptions?.color || PLUS_ICON_COLOR_DEFAULT;
  const { borderColor, borderThickness } = options?.questionOptions || {};
  const { styleClasses } = context;

  const borderColorClass = getBorderColorClass(
    borderColor || BORDER_COLOR_DEFAULT,
    context.styleClasses
  );
  const borderEdgeClass = getBorderEdgeClass(
    'bottom',
    borderThickness || BORDER_THICKNESS_DEFAULT,
    context.styleClasses
  );

  const [open, setOpen] = useState(false);
  const qaRef = useRef<HTMLDivElement>(null);
  const handleToggle = (): void => {
    const answerElement = qaRef.current;
    if (!answerElement) {
      console.log('Answer element not found');
      return;
    }

    if (answerElement.classList.contains('open')) {
      answerElement.classList.remove('open');
      answerElement.style.maxHeight = '0';
      setOpen(false);
    } else {
      answerElement.classList.add('open');
      answerElement.style.maxHeight = `${answerElement.scrollHeight}px`;
      setOpen(true);
    }
  };

  return (
    <div className={clsx('py-4 flex gap-x-4', borderEdgeClass, borderColorClass)}>
      <div>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg">
            <a
              className={clsx('cursor-pointer', getTextColorClass(questionTextColor, styleClasses))}
              onClick={(e) => {
                e.preventDefault();
                handleToggle();
              }}
            >
              {qa.question}
            </a>
          </div>
          <div className="px-4">
            <button
              className={clsx('collapsible', getTextColorClass(plusIconColor, styleClasses))}
              onClick={(e) => {
                e.preventDefault();
                handleToggle();
              }}
              aria-label="Toggle answer visibility"
              aria-expanded={open}
              aria-controls={`collapsible-answer-${index}`}
              role="button"
              id={`collapsible-button-${index}`}
              type="button"
            >
              {open ? <MinusIcon /> : <PlusIcon />}
            </button>
          </div>
        </div>
        <div
          className={clsx('transition-all overflow-hidden duration-300 ease-out')}
          id={`collapsible-answer-${index}`}
          style={{ maxHeight: '0' }}
          ref={qaRef}
        >
          <div className="mt-4 ml-2">
            <PortableText
              value={qa.answer}
              components={textComponents(
                {
                  styleOptions: {
                    color: 'muted',
                  },
                },
                context
              )}
            />
          </div>
        </div>
      </div>
      {/* <div className="px-4">
        <button
          className={clsx('collapsible', getTextColorClass(plusIconColor, styleClasses))}
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
          aria-label="Toggle answer visibility"
          aria-expanded={open}
          aria-controls={`collapsible-answer-${index}`}
          role="button"
          id={`collapsible-button-${index}`}
          type="button"
        >
          {open ? <MinusIcon /> : <PlusIcon />}
        </button>
      </div> */}
    </div>
  );
};
