// Get the browser 
async function fetchCsrfToken(): Promise<string> {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
    });
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

    if (!token) throw new Error("XSRF-TOKEN cookie not found");

    return decodeURIComponent(token);
}