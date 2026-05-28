import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import { serverFetch } from "@/lib/fetch";
import toHtmlDangerous from "@/utils/toHtmlDangerous";
import Image from "next/image";
export default async function TeamPage() {
  const res = await serverFetch("/projects");
  const { data: project } = await res.json();
  return (
    <main className="">
      <h1 className="bg-gray-800 text-white py-8 px-30 text-2xl ">
        {project.title}
      </h1>
      <div className="px-1 md:px-30 py-5">
        <section
          className="w-auto bg-amber-50 h-110 bg-cover bg-no-repeat bg-top rounded-2xl "
          style={{
            backgroundImage: 'url("/img/team/team.jpg")',
          }}
        ></section>
        <div className="py-10">
          <h2 className="text-2xl font-bold py-5">{project?.heading}</h2>
          <p>{project?.description}</p>
        </div>

        <div className="py-10">
          <h2 className="text-2xl font-bold py-5">The Sponsors</h2>
          <p>
            This project was funded through the
            <a
              href="https://humber.ca/about/vision/reimagining-learning/teaching-learning-innovation-fund"
              className="text-blue-800 px-2 font-medium"
            >
              Builders of Brilliance Teaching & Learning Innovation Fund
            </a>
            at Humber Polytechnic.
          </p>
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
