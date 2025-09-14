import { HeroBlockData } from '../../sanity/data-types';

type HeroBlockProps = {
  data: HeroBlockData;
};

export const HeroBlock: React.FC<HeroBlockProps> = ({
  data: { heading, description, backgroundImage },
}) => {
  return (
    <div className="bg-gray-300 p-8">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <p className="text-lg">{description}</p>
    </div>
  );
};
