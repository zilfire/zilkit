interface ContainerProps {
  children: React.ReactNode;
}

// todo: add responsive padding props
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto px-4 md:px-8 lg:px-16">{children}</div>;
};
