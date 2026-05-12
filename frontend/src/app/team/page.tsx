import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import { serverFetch } from "@/lib/fetch";
import Image from "next/image";

export default async function TeamPage() {
  const res = await serverFetch("/projects");
  const { data: project } = await res.json();
  console.log(project.title);
  return (
    <main className="">
      <h1 className="bg-gray-800 text-white py-8 px-30 text-2xl ">
        About Space Project
      </h1>
      <div className="px-1 md:px-30 py-5">
        <section
          className="w-auto bg-amber-50 h-110 bg-cover bg-no-repeat bg-top rounded-2xl "
          style={{
            backgroundImage: 'url("/img/team/team.jpg")',
          }}
        ></section>
        <div className="py-10">
          <h2 className="text-2xl font-bold py-5">{project?.title}</h2>
          <p>{project?.description}</p>
        </div>

        <div className="py-10">
          <h2 className="text-2xl font-bold py-5">The Sponsors</h2>
          <p>{project?.sponsor}</p>
        </div>

        {/* Member */}
        <h2 className="text-2xl font-bold py-10">Meet Our Team</h2>
        <div className="grid grid-cols-4 gap-">
          {project.teams.map((team: any, index: number) => {
            return (
              <div className="flex flex-col items-center py-4" key={index}>
                <Image
                  src={`/img/team/${team.mugshot}`}
                  height={100}
                  width={100}
                  alt="Alt"
                  className="rounded-full"
                />
                <p className="pt-3 font-bold">{`${team?.first_name} ${team?.last_name}`}</p>
                <p className="text-gray-500">{team.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
