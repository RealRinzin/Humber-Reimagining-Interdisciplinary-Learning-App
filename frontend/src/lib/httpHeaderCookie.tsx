import { cookies } from "next/headers";

async function HeaderCookie(){
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  
  const res = await fetch('http://localhost:8000/api/v1/users', {
    headers: {
      Cookie: cookieHeader,
      Referer: 'http://localhost:3000', // required for Sanctum stateful check
    },
    cache: 'no-store',
  });

  const user = await res.json();
  
}