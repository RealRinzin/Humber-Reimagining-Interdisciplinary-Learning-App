
import { getAllUsers } from "@/services/user/userService"
import ListPage from "./list"
import { cookies } from "next/headers";
export default async function NodePage() {
    const cookieStore = await cookies();

    const res = await fetch('http://localhost:8000/api/user', {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString(),
            Accept: "application/json"
        }
    });
    const data = await res.json();
    console.log(data);

    // return page
    return (
        <>
            <ListPage />
        </>
    )
}

