import { PortableTextBlock } from "@portabletext/types";

export type FaqBlockData = {
  _type: "faqBlock";
  heading?: string;
  description?: string;
  faqs: {
    question: string;
    answer: PortableTextBlock;
  }[];
};
