"use client";
import CodeCard from "@/components/ui/cards/ code/CodeCard";
import TextContent from "@/components/ui/cards/content/TextContent";
import FlashCard from "@/components/ui/cards/flashCard/FlashCard";
import RamblingCard from "@/components/ui/cards/rambling/RamblingCard";
import VideoCard from "@/components/ui/cards/video/VideoCard";
import CheckBox from "@/components/ui/form/CheckBox";
import Select from "@/components/ui/form/Select";
import TextInput from "@/components/ui/form/Text";
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
import { useState } from "react";

export default function NewNodePage() {
  const [topic, setTopic] = useState();
  const addNewTopic = () => {
    console.log("new topics");
  };
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
                <li className="flex basis-1/3 gap-2 items-center justify-start w-fit border border-slate-100 rounded-md px-2 text-white text-sm ">
                  <p>
                    <FontAwesomeIcon
                      icon={faEye}
                      size="1x"
                      className="cursor-pointer"
                    />
                  </p>
                  <p className="text-gray-100 text-xs">
                    {/* <select className="outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer"> */}
                    <select className="outline-none  focus:ring-0 cursor-pointer">
                      {/* <option>{topics?.student_visible ?"Visible to Students":"Hidden from Students"}</option> */}
                      <option value="0">Hidden from Students</option>
                      <option value="1">Visible to Students</option>
                    </select>
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
                  <button
                    className="bg-slate-200 text-xs rounded-md px-2 py-1 cursor-pointer"
                    onClick={addNewTopic}
                  >
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
          Topic Setting
        </h1>
        <ul className="flex gap-4 my-6 text-gray-600 text-md">
          <li>Group</li>
          <li>
            <Select title="Select Node Group" endpoint="node_groups/list" />
          </li>
        </ul>
        <ul className="flex gap-4  text-gray-600 text-md">
          <li>Topic Connections</li>
          <li>
            <Select title="Select Connection" endpoint="topics" />
          </li>
        </ul>
        <ul className="flex gap-4 my-4">
          <li className="text-xs px-2 py-1 bg-gray-500 rounded-md text-white font-medium relative">Intro to spac <span className="absolute -top-1 -right-1 bg-blue-600 h-3 w-3 flex justify-center items-center rounded">x</span></li>
          <li className="text-xs px-2 py-1 bg-gray-500 rounded-md text-white font-medium relative">Normal <span className="absolute -top-1 -right-1 bg-blue-600 h-3 w-3 flex justify-center items-center rounded">x</span></li>
          <li className="text-xs px-2 py-1 bg-gray-500 rounded-md text-white font-medium relative">Metric<span className="absolute -top-1 -right-1 bg-blue-600 h-3 w-3 flex justify-center items-center rounded">x</span></li>
        </ul>
        {/* Content */}
        <div className="mt-10">
          <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700">
            Content
          </h1>
          <p className="py-4 text-sm text-gray-500">
            Select type of content or create you own.
          </p>
          <div>
            <ul className="flex gap-10 items-center">
              <li>
                <TextInput type="number" value={232.4} label="X Axis" />
              </li>
              <li>
                <TextInput type="number" value={4234.1} label="Y Axis" />
              </li>
              <li>
                <TextInput type="text" value="Interactive Path" label="X Axis" />
              </li>
              <li>
                <TextInput type="color" value={"red"} label="Color" />
              </li>
              <li>
                <CheckBox checked={false} label="Video" />
              </li>
              <li>
                <CheckBox checked={false} label="Codes" />
              </li>
              <li>
                <CheckBox checked={false} label="Ramblings" />
              </li>
              <li>
                <CheckBox  checked={false} label="Quiz" />
              </li>
              <li>
                <CheckBox checked={true} label="Interactive" />
              </li>
            </ul>
          </div>
        </div>
        {/* Content */}
        <TextContent />
        {/* <VideoCard /> */}
        {/* <AddContent /> */}
        {/* <FlashCard /> */}
        {/* <CodeCard /> */}
        {/* <RamblingCard /> */}
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
