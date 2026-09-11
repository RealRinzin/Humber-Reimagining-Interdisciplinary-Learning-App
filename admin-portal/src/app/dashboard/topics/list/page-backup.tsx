"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  content: string;
  status: "Published" | "Draft";
  publishedDate: string;
}
interface AdminTableProps {
  posts: Post[];
  onView?: (post: Post) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}
const dummyPosts: Post[] = [
  {
    id: 1,
    title: "How Vaccines Train Your Immune System",
    author: "david",
    category: "Business",
    content:
      "The immune system defends the body using two main branches: the innate immune system, which responds immediately to any threat, and the adaptive immune system, which learns to recognize specific pathogens.",
    status: "Published",
    publishedDate: "2026-09-09",
  },
  {
    id: 2,
    title: "The James Webb Space Telescope",
    author: "johnsmith",
    category: "Health",
    content:
      "The James Webb Space Telescope (JWST) is a joint project of NASA, the European Space Agency, and the Canadian Space Agency, designed to observe the universe in infrared.",
    status: "Published",
    publishedDate: "2026-09-09",
  },
  {
    id: 3,
    title: "Remote Work Culture: What Changed",
    author: "janedoe",
    category: "Sports",
    content:
      "The COVID-19 pandemic forced a rapid, unplanned experiment in remote work across millions of companies, reshaping how teams communicate and collaborate.",
    status: "Published",
    publishedDate: "2026-09-09",
  },
  {
    id: 4,
    title: "The Science of Coffee and Focus",
    author: "michael",
    category: "Business",
    content:
      "Throughout the day, a molecule called adenosine gradually builds up in the brain and binds to adenosine receptors, making you feel increasingly tired.",
    status: "Published",
    publishedDate: "2026-09-09",
  },
  {
    id: 5,
    title: "Electric Vehicles and Battery Costs",
    author: "sarah",
    category: "Technology",
    content:
      "Lithium-ion battery pack prices have dropped from over $1,000 per kilowatt-hour in 2010 to under $150 today, making EVs increasingly affordable.",
    status: "Published",
    publishedDate: "2026-09-09",
  },
  {
    id: 6,
    title: "The Mediterranean Diet Explained",
    author: "david",
    category: "Business",
    content:
      "The Mediterranean diet is not a single fixed meal plan but a dietary pattern based on the traditional foods of countries bordering the Mediterranean Sea.",
    status: "Published",
    publishedDate: "2026-09-09",
  },
];
export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2 my-10">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                S.No
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Title
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Author
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Content
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Published
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-800">
                View
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-800">
                Edit
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-800">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyPosts.map((post, i) => (
              <tr
                key={post.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 text-gray-700">{i + 1}</td>
                <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                  {truncate(post.title, 20)}
                </td>
                <td className="px-4 py-3 text-red-700 font-medium">
                  {post.author}
                </td>
                <td className="px-4 py-3 text-red-700 font-medium">
                  {post.category}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-md">
                  {truncate(post.content, 90)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
                      post.status === "Published"
                        ? "bg-green-50 text-green-700 border-green-300"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {post.publishedDate}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    // onClick={() => onView?.(post)}
                    className="text-gray-600 hover:text-gray-900"
                    aria-label="View"
                  >
                    <FontAwesomeIcon icon={faEye} size="sm" />
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    // onClick={() => onEdit?.(post)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Edit"
                  >
                    <FontAwesomeIcon icon={faPen} size="sm" />
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    // onClick={() => onDelete?.(post)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} size="sm" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
