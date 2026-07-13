"use client";

import { useFetch } from "@/hooks/client/useFetch";
export default function UserList() {
  const {data:users,loading,error} = useFetch('https://jsonplaceholder.typicode.com/users')
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
