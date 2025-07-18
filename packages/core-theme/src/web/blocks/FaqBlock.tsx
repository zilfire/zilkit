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

type FaqBlockProps = {
  data: FaqBlockData;
};

type FAQItemProps = {
  qa: {
    question: string;
    answer: PortableTextBlock;
  };

  index: number;
};

export const FaqBlock: React.FC<FaqBlockProps> = ({ data }) => {
  const { heading, description, faqs } = data;

  return (
    <Section className="bg-stone-50 px-2" id="faq">
      <Container>
        <div className="flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="w-full lg:w-4/12 mb-8">
            {heading && <h2 className="w-100 text-3xl font-bold mb-4 text-gray-700">{heading}</h2>}
            {description && (
              <p className="text-gray-600 border-l-4 border-accent-500 pl-2 italic">
                {description}
              </p>
            )}
          </div>
          {faqs && faqs.length > 0 && (
            <div className="w-full lg:w-8/12 -mb-6 border-t">
              {faqs.map((faq, index) => (
                <FaqItem qa={faq} index={index} key={index} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

const FaqItem = ({ qa, index }: FAQItemProps) => {
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
            className="cursor-pointer"
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
              components={portableTextComponents({ normalSpan: true })}
            />
          </div>
        </div>
      </div>
      <div className="grow flex justify-end items-start sky-500">
        <button
          className="collapsible w-4 text-primary-700"
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
