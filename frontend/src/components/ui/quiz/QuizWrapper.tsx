import FlipCard from "./FlipCard";

export default function QuizWrapper({ quizzes }: any) {
  // console.log(quizzes[0])
  return (
    <div className="grid grid-cols-3 gap-5">
      {quizzes.map((quiz: any, index: number) => {
        return (
            <FlipCard {...quiz} key={index} />
        //   <div key={index}>
        //     {/* {quiz.question} */}
        //     <FlipCard question={quiz.question} answer={quiz.answer} difficulty={quiz.difficulty} />
        //   </div>
        );
      })}
    </div>
  );
}
