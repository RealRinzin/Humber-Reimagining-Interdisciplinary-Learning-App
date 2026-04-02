import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OnBoardingRegistration() {
  return (
    <div className="flex justify-center-safe items-center h-screen">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-slate-300/90 flex flex-col px-5 py-16 gap-10 rounded-2xl">
        <div className="flex justify-center bg-slate-800 mx-auto p-5 rounded-full">
            <FontAwesomeIcon icon={faAtom} size='4x' className="text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-900 tracking-widest">
          SPACES PROJECT
        </h1>
        <div className="text-center">
          <a
            href=""
            className="bg-slate-800 text-white rounded-md py-2 px-3  hover:bg-slate-900 transition-colors duration-200 font-medium"
          >
            Create an Account
          </a>
          <p className="text-gray-500 text-xs mt-4">
            Already have an Account?
            <a
              href="#"
              className="underline text-slate-800 hover:text-slate-900"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
