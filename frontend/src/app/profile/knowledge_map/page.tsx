import TabProgressBar from "@/components/ui/progress/Tab";
import TabHorizontal from "@/components/ui/progress/TabHorizontal";
import { cookies } from "next/headers";

const cookieStore = await cookies();
export default async function KnowledgeMapPage(){

  const res = await fetch('http://localhost:8000/api/v1/users', {
    headers: {
      Cookie: cookieStore.toString(), // 🔥 important
    },
    cache: 'no-store',
  });
console.log(res.status)
  const user = await res.json();
  console.log(user)
    return(
        <>
        <TabHorizontal/>
        <TabProgressBar/>
        </>
    )
}