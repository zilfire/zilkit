'use client';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { FaPlus as PlusIcon, FaMinus as MinusIcon } from 'react-icons/fa6';
import type { FaqBlockData } from '../../data-types/blocks/faq-block';
import type { PortableTextBlock } from '@portabletext/types';
import { portableTextComponents } from '../text';
import { PortableText } from 'next-sanity';
import type { ThemeColor, FontStyle, ColorMode } from '../../data-types/utility/styling';
import { Text } from '../text';

type FaqOptions = {
  colorMode?: ColorMode;
  sidebarRuleColor?: ThemeColor;
  sidebarRule?: boolean;
  descriptionFontStyle?: FontStyle;
  descriptionTextColor?: ThemeColor;
  headlineTextColor?: ThemeColor;
  questionTextColor?: ThemeColor;
  answerTextColor?: ThemeColor;
  plusIconColor?: ThemeColor;
};

type FaqBlockProps = {
  data: FaqBlockData;
  options?: FaqOptions;
};

type FAQItemProps = {
  qa: {
    question: string;
    answer: PortableTextBlock;
  };
  options?: FaqOptions;
  index: number;
};

const getBorderColor = (color: ThemeColor): string => {
  return `border-${color}-500`;
};

const getFontColor = (color: ThemeColor): string => {
  return `text-${color}-500`;
};

export const FaqBlock: React.FC<FaqBlockProps> = ({ data, options }) => {
  const { heading, description, faqs } = data;
  const { sidebarRuleColor, sidebarRule, descriptionFontStyle, headlineTextColor } = options || {};
  const sidebarRuleOn = typeof sidebarRule === 'boolean' ? sidebarRule : true;
  const italicDescription =
    descriptionFontStyle === 'italic' || typeof descriptionFontStyle === 'undefined';

  return (
    <Section className="bg-stone-50 px-2" id="faq">
      <Container>
        <div className="flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="w-full lg:w-4/12 mb-8">
            {heading && (
              <Text
                as="h2"
                size="sm"
                // className="w-100 text-3xl font-bold mb-4"
              >
                {heading}
              </Text>
            )}
            {description && (
              <p
                className={clsx(
                  'text-gray-600 ml-1',
                  sidebarRuleOn &&
                    `border-l-4 pl-2 ${getBorderColor(sidebarRuleColor || 'primary')}`,
                  italicDescription && 'italic'
                )}
              >
                {description}
              </p>
            )}
          </div>
          {faqs && faqs.length > 0 && (
            <div className="w-full lg:w-8/12 -mb-6 border-t">
              {faqs.map((faq, index) => (
                <FaqItem qa={faq} index={index} key={index} options={options} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

const FaqItem = ({ qa, index, options }: FAQItemProps) => {
  const { questionTextColor, answerTextColor, plusIconColor } = options || {};
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
    <div className="border-b py-4 flex gap-x-4 lg:gap-x-8">
      <div>
        <div className="font-semibold text-lg">
          <a
            className={clsx('cursor-pointer', getFontColor(questionTextColor || 'black'))}
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
          ref={(el) => {
            qaRef.current = el;
          }}
        >
          <div className="mt-4 ml-2">
            <PortableText
              value={qa.answer}
              components={portableTextComponents({
                normalSpan: true,
                themeColor: 'neutral',
              })}
            />
          </div>
        </div>
      </div>
      <div className="grow flex justify-end items-start sky-500">
        <button
          className={clsx('collapsible w-4', getFontColor(plusIconColor || 'primary'))}
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
          aria-label="Toggle answer visibility"
          aria-expanded="false"
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
