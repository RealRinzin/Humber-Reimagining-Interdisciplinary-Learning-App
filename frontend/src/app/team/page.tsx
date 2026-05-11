import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import { serverFetch } from "@/lib/fetch";
import Image from "next/image";

export default async function TeamPage() {
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

        <h2 className="text-2xl font-bold py-5">The Project</h2>
        <p>
          Our project responds to this opportunity and aims to develop an online
          platform that combines a branching knowledge map with rich multimedia
          resources. Unlike traditional textbooks or linear e-learning modules,
          this platform encourages exploration and contextual understanding. By
          giving students agency to choose their path and weaving together
          mathematics, physics, and programming through multimedia.
        </p>

        {/* Member */}
        <h2 className="text-2xl font-bold py-5">Meet Our Team</h2>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
            <div className="flex flex-col" key={num}>
              <Image
                src="/img/team/Dina-Sabie.png"
                height={100}
                width={100}
                alt="Alt"
                className="rounded-full"
              />
              <p>Designatioin</p>
              <p>Role</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-4 py-10">
          {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
            <div className="flex flex-col" key={num}>
              <Image
                src="/img/team/Dina-Sabie.png"
                height={70}
                width={70}
                alt="Alt"
                className="rounded-full"
              />
              <p>Designatioin</p>
              <p>Role</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
