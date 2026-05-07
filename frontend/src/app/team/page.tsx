import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import { serverFetch } from "@/lib/fetch";


export default async function TeamPage(){

  const res = await serverFetch(`/videos`);
  const { data:video } = await res.json();
  console.log(video)
    return(
        <>
        <div className="bg-black">
        <CourseNodeLink/>
        </div>
        </>
    )
}