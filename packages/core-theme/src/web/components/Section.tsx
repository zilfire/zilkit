import clsx from "clsx";

type SectionProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

export const Section = ({
  children,
  className,
  id,
}: SectionProps): React.ReactElement => {
  return (
    <section
      className={clsx("py-16 md:py-24", className ? className : "")}
      id={id}
    >
      {children}
    </section>
  );
};
