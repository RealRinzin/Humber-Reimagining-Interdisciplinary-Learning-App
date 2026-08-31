import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function EditRamblingCard({ rambling }: { rambling: any }) {
  return (
    <>
      <li className="bg-blue-200 rounded-lg h-5 w-5 flex items-center justify-center">
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer text-xs text-blue-500"
          // onClick={openModal}
        />
      </li>
    </>
  );
}
