import { faCaretLeft, faParagraph, faVial } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CourseTabs({ title }: { title: string }) {
  return (
    <section className="my-2" >
      <div className="flex justify-between bg-slate-300 p-3 rounded-sm">
        <h2 className="text-xl font-bold text-gray-600 "><FontAwesomeIcon icon={faVial} size="1x" /> {title} <FontAwesomeIcon icon={faCaretLeft} size="1x" /></h2>
        <div className="h-8 w-8 rounded-full border-6 border-slate-600 bg-slate-400 hover:border-green-600 hover:cursor-pointer hover:bg-white transition duration-300 ease-in-out 
 hover:shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]
         ">
        </div>
      </div>
      <div className="p-3">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </section>
  )
}
