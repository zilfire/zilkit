import clsx from "clsx";

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}): React.ReactElement => {
  return (
    <div
      className={clsx(
        "container mx-auto px-3 md:px-4 lg:px-6",
        className ? className : ""
      )}
    >
      {children}
    </div>
  );
};
