import { getAllUsers } from "@/services/user/userService";
export default async function useUsers() {
    const data = await getAllUsers();
    console.log(data);
console.log("User Hooks")
}
