import DocumentType from '@/components/ui/form/file/DocumentType'
import ImageType from '@/components/ui/form/file/ImageType'
import VideoFileUpload from '@/components/ui/form/file/VideoType'
export default function page() {
  return (
    <>
    video
    <VideoFileUpload/>
    Image
    <ImageType />

    <DocumentType/>
    </>
  )
}
