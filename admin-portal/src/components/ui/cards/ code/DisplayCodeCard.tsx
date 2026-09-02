import { useDelete } from "@/hooks/client/useHTTP";
import { faCopy, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism";
import EditCodeCard from "./EditCodeCard";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { codeDType } from "@/types/code.type";

export default function DisplayCode({ codes }: { codes: codeDType[] }) {
  const { deleteData, loading, error } = useDelete();
  const router = useRouter();
  const deleteQuiz = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      const res = await deleteData(`/codes/${id}`);
      toast.error("Successfully Deleted");
      router.refresh();
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {codes?.map((code: any, index: number) => (
          <div key={index} className="relative">
            <ul className="absolute top-0 right-0 flex gap-1">
              <li className="bg-red-200 rounded-md h-5 w-5 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer text-xs text-red-500"
                  onClick={() => deleteQuiz(code?.id)}
                />
              </li>
              <EditCodeCard code={code} />
              <li className="bg-gray-200 rounded-md h-5 w-5 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faCopy}
                  className="cursor-pointer text-xs text-gray-500"
                />
              </li>
            </ul>
            <SyntaxHighlighter
              language="cpp"
              style={solarizedDarkAtom}
              className="text-xs font-thin rounded-md"
            >
              {code?.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </>
  );
}
