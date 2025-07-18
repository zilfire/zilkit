import type { TestBlockData } from "../../data-types/test-block";
import { TestComponent } from "../components/TestComponent";

type TestBlockProps = {
  data: TestBlockData;
};

export const TestBlock: React.FC<TestBlockProps> = ({ data }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <TestComponent />
    </div>
  );
};
