import DocumentType from "@/components/ui/form/file/DocumentType";
import FormFileInput from "@/components/ui/form/file/HtmlType";
import HtmlType from "@/components/ui/form/file/HtmlType";
import ImageType from "@/components/ui/form/file/ImageType";
import VideoFileUpload from "@/components/ui/form/file/VideoType";
export default function page() {
  return (
    <>
      <FormFileInput
        type="file"
        name="interactive_path"
        label="interactive path"
      />
      {/* <VideoFileUpload/> */}
      {/* <ImageType /> */}

      {/* <DocumentType/> */}
    </>
  );
}
