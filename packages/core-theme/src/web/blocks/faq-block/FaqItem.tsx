'use client';
import { useRef } from 'react';
import clsx from 'clsx';
import { FaPlus as PlusIcon, FaMinus as MinusIcon } from 'react-icons/fa6';
import { PortableText } from 'next-sanity';
import type { PortableTextBlock } from '@portabletext/types';
import type { ThemeContext } from '../../../config/context.js';
import type { TextStyleOptions, TextStyleOverride } from '../../style/types/text-style-classes.js';
import type { ThemeColor } from '../../style/types/style.types.js';
import type { BorderColor } from '../../style/types/border-style.types.js';
import { getTextColorClass } from '../../style/utils/text-style-utils.js';
import { getBorderColorClass, getBorderEdgeClass } from '../../style/utils/border-style-utils.js';
import { textComponents } from '../../text/text-components.js';
import { useToggle } from './faq-block-hooks.js';
import { FAQ_DEFAULTS } from './faq-block-config.js';
import { styleClassNames } from '../../style/classes/style-classes.js';

type FaqItemOptions = {
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

export type FaqItemProps = {
  qa: {
    question: string;
    answer: PortableTextBlock;
  };
  options?: FaqItemOptions;
  index: number;
  context: ThemeContext;
};

export const FaqItem: React.FC<FaqItemProps> = ({ qa, index, options, context }) => {
  const questionTextColor =
    options?.questionOptions?.styleOptions?.textColor || FAQ_DEFAULTS.question.color;
  const answerTextColor =
    options?.answerOptions?.styleOptions?.textColor || FAQ_DEFAULTS.answer.color;
  const plusIconColor = options?.plusIconOptions?.color || FAQ_DEFAULTS.plusIcon.color;
  const { borderColor, borderThickness } = options?.questionOptions || {};

  const borderColorClass = getBorderColorClass(
    borderColor || FAQ_DEFAULTS.border.color,
    styleClassNames
  );
  const borderEdgeClass = getBorderEdgeClass(
    'bottom',
    borderThickness || FAQ_DEFAULTS.border.thickness,
    styleClassNames
  );

  const [open, toggle] = useToggle(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    const answerElement = answerRef.current;
    if (!answerElement) {
      console.warn('Answer element not found');
      return;
    }

    if (answerElement.classList.contains('open')) {
      answerElement.classList.remove('open');
      answerElement.style.maxHeight = '0';
    } else {
      answerElement.classList.add('open');
      answerElement.style.maxHeight = `${answerElement.scrollHeight}px`;
    }
    toggle();
  };

  return (
    <div className={clsx('py-6 flex', borderEdgeClass, borderColorClass)}>
      <div className="flex-1">
        <button
          className={clsx('cursor-pointer text-left w-full')}
          onClick={handleToggle}
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          type="button"
        >
          <div className="flex justify-between items-center">
            <div
              className={clsx(
                'font-semibold text-lg',
                getTextColorClass(questionTextColor, styleClassNames)
              )}
            >
              {qa.question}
            </div>
            <div className="flex-shrink-0">
              {open ? (
                <MinusIcon className={getTextColorClass(plusIconColor, styleClassNames)} />
              ) : (
                <PlusIcon className={getTextColorClass(plusIconColor, styleClassNames)} />
              )}
            </div>
          </div>
        </button>

        <div
          className={clsx('transition-all overflow-hidden duration-300 ease-out')}
          id={`faq-answer-${index}`}
          style={{ maxHeight: '0' }}
          ref={answerRef}
          role="region"
          aria-labelledby={`faq-question-${index}`}
        >
          <div className="mt-4 ml-2">
            <PortableText
              value={qa.answer}
              components={textComponents({
                styleOptions: {
                  textColor: answerTextColor,
                },
                className: 'last:mb-0',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
