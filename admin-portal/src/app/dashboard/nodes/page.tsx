import CodeCard from "@/components/ui/cards/ code/CodeCard";
import TextContent from "@/components/ui/cards/content/TextContent";
import FlashCard from "@/components/ui/cards/flashCard/FlashCard";
import RamblingCard from "@/components/ui/cards/rambling/RamblingCard";
import VideoCard from "@/components/ui/cards/video/VideoCard";
import Select from "@/components/ui/form/Select";
import {
  faBook,
  faCaretDown,
  faCirclePlay,
  faCircleQuestion,
  faCode,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function NewNodePage() {
  return (
    <>
      <div className="bg-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 justify-between  p-6 ">
            <div className="basis-4/6">
              <ul className="flex gap-2">
                <li className="basis-2/3">
                  <input
                    type="text"
                    className="w-full border border-slate-400 rounded-md px-3 text-white"
                    placeholder="Node Name"
                  />
                </li>
                <li className="flex basis-1/3 gap-2 items-center justify-around border border-slate-100 rounded-md px-2 text-white text-sm ">
                  <p>
                    <FontAwesomeIcon
                      icon={faEye}
                      size="1x"
                      className="cursor-pointer"
                    />
                  </p>
                  <p className="text-xs">Visible to Students</p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      size="1x"
                      className="cursor-pointer"
                    />
                  </p>
                </li>
              </ul>
            </div>
            {/* End Side */}
            <div className="basis-2/6">
              <ul className="flex justify-end gap-2">
                <li>
                  <button className="bg-slate-500 text-xs rounded-md px-2 py-1 text-white cursor-pointer">
                    Cancel
                  </button>
                </li>
                <li>
                  <button className="bg-slate-200 text-xs rounded-md px-2 py-1 cursor-pointer">
                    Save
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Node Setting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-6">
        <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700">
          Node Setting
        </h1>
        <ul className="flex gap-4 my-6 text-gray-600 text-md">
          <li>Group</li>
          <li>
            <Select title="Select Node Group" endpoint="codes" />
          </li>
        </ul>
        <ul className="flex gap-4  text-gray-600 text-md">
          <li>Connections</li>
          <li>
            <Select title="Select Connection" endpoint="topics"/>
          </li>
        </ul>
        {/* Content */}
        <div className="mt-10">
          <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700">
            Content
          </h1>
          <p className="py-4 text-sm text-gray-500">
            Select type of content or create you own.
          </p>
        </div>
        {/* Content */}
        <TextContent />
        <VideoCard />
        {/* <AddContent /> */}
        <FlashCard />
        <CodeCard />
        <RamblingCard />
        {/* Cards */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-gray-500 my-4">
          <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
            <span>
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="cursor-pointer text-2xl"
              />
            </span>
            <span className="text-sm">Videos</span>
          </li>
          <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
            <span>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="cursor-pointer text-2xl"
              />
            </span>
            <span className="text-sm">Flashcards</span>
          </li>
          <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
            <span>
              <FontAwesomeIcon
                icon={faBook}
                className="cursor-pointer text-2xl"
              />
            </span>
            <span className="text-sm">Resources</span>
          </li>
          <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
            <span>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="cursor-pointer text-2xl"
              />
            </span>
            <span className="text-sm">FAQ</span>
          </li>
          <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
            <span>
              <FontAwesomeIcon
                icon={faCode}
                className="cursor-pointer text-2xl"
              />
            </span>
            <span className="text-sm">Codes</span>
          </li>
          <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
            <span>
              <FontAwesomeIcon
                icon={faPlus}
                className="cursor-pointer text-2xl"
              />
            </span>
            <span className="text-sm">Custom</span>
          </li>
        </ul>
      </div>
      {/*  */}
    </>
  );
}
