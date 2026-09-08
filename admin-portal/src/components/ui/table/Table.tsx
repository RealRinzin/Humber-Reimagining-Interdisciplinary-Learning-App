"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  content: string;
  status: "Published" | "Draft" | "Pending";
  publishedDate: string;
}

const statusStyles: Record<Article["status"], string> = {
  Published: "bg-green-100 text-green-700 border border-green-300",
  Draft: "bg-gray-100 text-gray-600 border border-gray-300",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
};

export default function Table({ articles }: { articles: Article[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-300/60">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-800">S.No</th>
            <th className="px-4 py-3 font-semibold text-gray-800">Title</th>
            <th className="px-4 py-3 font-semibold text-gray-800">Author</th>
            <th className="px-4 py-3 font-semibold text-gray-800">Category</th>
            <th className="px-4 py-3 font-semibold text-gray-800">Content</th>
            <th className="px-4 py-3 font-semibold text-gray-800">Status</th>
            <th className="px-4 py-3 font-semibold text-gray-800">Published</th>
            <th className="px-4 py-3 font-semibold text-gray-800 text-center">View</th>
            <th className="px-4 py-3 font-semibold text-gray-800 text-center">Edit</th>
            <th className="px-4 py-3 font-semibold text-gray-800 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr
              key={article.id}
              className={`border-t border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >
              <td className="px-4 py-4 align-top text-gray-800">{index + 1}</td>

              <td className="px-4 py-4 align-top text-gray-800 max-w-[160px] truncate">
                {article.title}
              </td>

              <td className="px-4 py-4 align-top">
                <span className="text-red-800 font-medium">author</span>
              </td>

              <td className="px-4 py-4 align-top">
                <span className="text-red-800 font-medium">Category</span>
              </td>

              <td className="px-4 py-4 align-top text-gray-700 max-w-md">
                <p className="line-clamp-2">content</p>
              </td>

              <td className="px-4 py-4 align-top">
                <span
                  className={`inline-block rounded-md px-3 py-1 text-xs font-medium ${
                    statusStyles[article.status]
                  }`}
                >
                  {article.status}
                </span>
              </td>

              <td className="px-4 py-4 align-top whitespace-nowrap text-gray-800">
                {article.publishedDate}
              </td>

              <td className="px-4 py-4 align-top text-center">
                <button className="text-gray-700 hover:text-gray-900">
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </td>

              <td className="px-4 py-4 align-top text-center">
                <button className="text-blue-600 hover:text-blue-800">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </td>

              <td className="px-4 py-4 align-top text-center">
                <button className="text-red-600 hover:text-red-800">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}