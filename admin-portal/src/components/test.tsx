import React, { useEffect, useState } from "react";
import VideoUploadTest from "./ui/form/file/VideoType-Oroginal";
export default function ChildTest({ updateFun,live,videoID}: { updateFun: () => void,live:boolean,videoID:number|null }) {
  const [status, setStatus] = useState<boolean>(live);
  useEffect(() => {
    console.log("Child Componetn");
    setStatus((prev) => !prev);
  }, [updateFun,videoID]);
  return <div>
    {status ? "True" : "false"}
    {
      status && (<>Upload</>)
    }
    <VideoUploadTest videoID={videoID} status={status}/>
  </div>;
}
