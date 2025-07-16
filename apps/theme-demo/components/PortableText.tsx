import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Image"}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextComponentProps {
  value: any[];
  className?: string;
}

export default function PortableTextComponent({
  value,
  className = "",
}: PortableTextComponentProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
