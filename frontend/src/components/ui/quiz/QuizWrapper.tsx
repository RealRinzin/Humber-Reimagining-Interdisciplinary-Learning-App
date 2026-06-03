import FlipCard from "./FlipCard";

export default function QuizWrapper({ quizzes }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-4">
      {quizzes?.map((quiz: any, index: number) => {
        return (
            <FlipCard {...quiz} key={index} />
        );
      })}
    </div>
  );
}
