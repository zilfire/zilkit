'use client';
import { useRef, useState } from 'react';
import { H2 } from '../text/H2.js';
import { Blockquote } from '../text/Blockquote.js';
import clsx from 'clsx';
import type { ThemeContext } from '../../types/context-types/index.js';
import { Section } from '../components/Section.js';
import { FaPlus as PlusIcon, FaMinus as MinusIcon } from 'react-icons/fa6';
import type { FaqBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { PortableTextBlock } from '@portabletext/types';
import { textComponents } from '../text/text-components.js';
import { PortableText } from 'next-sanity';
import type { ThemeColor } from '../../types/style-types/color-style-classes.js';
import type { TextStyleOptions } from '../text/Text.js';
import type { TextClassOverrides, TextSize } from '../../types/style-types/text-style-classes.js';
import { getTextColorClass } from '../style/style-utils/color-style-utils.js';

const QUESTION_COLOR_DEFAULT = 'black' as const;
const ANSWER_COLOR_DEFAULT = 'muted' as const;
const PLUS_ICON_COLOR_DEFAULT = 'primary' as const;

type FaqOptions = {
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
  };
  questionOptions?: {
    styleOptions?: TextStyleOptions;
    className?: string;
    classOverrides?: TextClassOverrides;
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

// const getBorderColor = (color: ThemeColor): string => {
//   return `border-${color}-500`;
// };

// const getFontColor = (color: ThemeColor): string => {
//   return `text-${color}-500`;
// };

export const FaqBlock: React.FC<FaqBlockProps> = ({ data, options, context }) => {
  const { heading, description, faqs } = data;

  // @todo: add borderColor to layout styles and implement color option
  return (
    <Section context={context} backgroundColor="neutral-light" verticalSpacing="lg" id="faq">
      <div className="flex flex-wrap lg:flex-nowrap gap-x-8">
        <div className="w-full lg:w-4/12 mb-8">
          {heading && <H2 className="">{heading}</H2>}
          {description && (
            <Blockquote classOverrides={{ borderColor: 'border-primary-500' }}>
              {description}
            </Blockquote>
          )}
        </div>
        {faqs && faqs.length > 0 && (
          <div className="w-full lg:w-8/12 -mb-6 border-t border-gray-400">
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
  const { styleClasses } = context;

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
    <div className="border-b py-4 flex gap-x-4 lg:gap-x-8 border-gray-400">
      <div>
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
      <div className="grow flex justify-end items-start">
        <button
          className={clsx('collapsible w-4', getTextColorClass(plusIconColor, styleClasses))}
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
  );
};
