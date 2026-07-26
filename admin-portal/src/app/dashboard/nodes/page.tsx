import Select from "@/components/ui/form/Select";
import { faCaretDown, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewNodePage() {
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
                  <button className="bg-slate-500 text-xs rounded-md px-2 py-1 text-white">
                    Cancel
                  </button>
                </li>
                <li>
                  <button className="bg-slate-200 text-xs rounded-md px-2 py-1 ">
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
            <Select title="Select Node Group" />
          </li>
        </ul>
        <ul className="flex gap-4  text-gray-600 text-md">
          <li>Connections</li>
          <li>
            <Select title="Select Connection" />
          </li>
        </ul>
        {/* Content */}
        <div className="my-10">
          <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700">
            Content
          </h1>
          <p className="py-4 text-sm text-gray-500">Select type of content or create you own.</p>
        </div>
      </div>

      {/*  */}
    </>
  );
}
