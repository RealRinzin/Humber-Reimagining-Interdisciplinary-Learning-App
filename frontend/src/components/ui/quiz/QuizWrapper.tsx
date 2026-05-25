import FlipCard from "./FlipCard";

export default function QuizWrapper({ quizzes }: any) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {quizzes?.map((quiz: any, index: number) => {
        return (
            <FlipCard {...quiz} key={index} />
        );
      })}
    </div>
  );
}
