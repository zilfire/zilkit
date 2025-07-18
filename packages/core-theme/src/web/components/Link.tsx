import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
  reference?: string;
  className?: string;
  href?: string;
};

export const Link: React.FunctionComponent<Props> = ({
  children,
  href,
  className,
}) => {
  if (href)
    return (
      <NextLink href={href} className={className}>
        {children}
      </NextLink>
    );

  return (
    <NextLink href={"#"} className={className}>
      {children}
    </NextLink>
  );
};
