import { User } from "@/types/user.types";
export const getAllUsers = async ():Promise<User[]> =>{
    try{
        const res = await fetch('http://localhost:8000/api/users');
        if(!res.ok){
            throw new Error('Failed to fetch user');
        }
        const data : User[]=res.json();
        return data;
    }catch(error){
        throw new Error("Failed to connect")
    }
}