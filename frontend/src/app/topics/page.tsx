import { cookies } from "next/headers";
export default async function NodePage() {
  const cookieStore = (await cookies()).toString();

  const res = await fetch(`${process.env.BASE_END_PONT}/api/user`, {
    method: "GET",
    headers: {
      Cookie: cookieStore,
      Accept: "application/json",
    },
  });
  const data = await res.json();

  // Uses
  const users = await fetch(`${process.env.BASE_END_PONT}/api/v1/users`, {
    headers: {
      Cookie: cookieStore,
      Accept: "application/json",
      Referer: "http://localhost:3000",
    },
  });
  const user = await users.json();
  console.log(user);

  // return page
  return (
    <>
      <h1>{data.name}</h1>
    </>
  );
}
