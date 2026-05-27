import { serverFetch } from "@/lib/fetch";
import { RingProgressPerCalculator } from "@/utils/RingProgressPerCalculator";
export default async function page() {
  const res = await serverFetch("/topics");
  const { data: topics } = await res.json();
  console.log(topics);
  return (
    <>
      {topics.map((topic: any, index: number) => {
        return (
          <div key={index}>
            <h5>{topic.title}</h5>
            {
              topic?.videos.map((video:any,index:number)=>{
                return(
                  <ul key={index}>
                    <li>
                      </li>
                      <li>
                        {
                          RingProgressPerCalculator(video?.user_video_setting)
                        }
                      </li>
                  </ul>
                )

              })
            }
          </div>
        );
      })}
    </>
  );
}
