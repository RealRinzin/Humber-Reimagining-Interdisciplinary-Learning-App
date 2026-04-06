import TabProgressBar from "@/components/ui/progress/Tab";
import TabHorizontal from "@/components/ui/progress/TabHorizontal";
import { cookies } from "next/headers";

export default async function KnowledgeMapPage(){
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users`, {
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
        <TabProgressBar name="Coming up " completed={4} incomplete={10}/>
        </>
    )
}