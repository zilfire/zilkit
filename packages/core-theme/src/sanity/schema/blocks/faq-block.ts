import { defineField, defineType } from "sanity";
import { FaQuestion as QuestionIcon } from "react-icons/fa";

export const faqBlock = defineType({
  name: "faqBlock",
  title: "FAQ Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineField({
          name: "faq",
          title: "FAQ",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "richText",
            }),
          ],
          preview: {
            select: {
              title: "question",
            },
            prepare({ title }) {
              return {
                title,
                media: QuestionIcon,
              };
            },
          },
        }),
      ],
    }),
  ],
});
