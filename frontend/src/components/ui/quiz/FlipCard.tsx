interface FlipCardProps {
  question: string;
  answer: string;
  difficulty:string
}

export default function FlipCard({ question, answer,difficulty }: FlipCardProps) {
  return (
    <div className="w-78 h-50 cursor-pointer group bg-slate-300 rounded-2xl">
      <div
        className="relative w-full h-full transition-transform duration-500
                  transform-3d
                  group-hover:transform-[rotateY(180deg)]"
      >
        <div
          className="absolute inset-0 rounded-xl 
                    backface-hidden
                    flex flex-col items-center justify-center gap-2 p-6"
        >
          <p className="m-0 py-1 uppercase">{difficulty}</p>

          <p className="py-2 border-y border-gray-400">{question}</p>
          <p className="m-0 p-0">Click to Flip!</p>
        </div>
        <div
          className="absolute inset-0 
                    backface-hidden bg-slate-900 text-white rounded-2xl
                    transform-[rotateY(180deg)]
                    flex flex-col items-center justify-center gap-2 p-6"
        >
          <p className="m-0 p-0 uppercase">{difficulty}</p>

          <p className="py-2 border-y border-gray-200">{answer}</p>
          <p className="m-0 py-1">Click to Flip!</p>
        </div>
      </div>
    </div>
  );
}
