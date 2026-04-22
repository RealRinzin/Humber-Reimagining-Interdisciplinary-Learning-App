# Server Component -  API Call

```ts
  //
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  // 👇 get and decode the XSRF token
  const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value ?? "";
  const decodedXsrf = decodeURIComponent(xsrfToken);
  console.log("All cookies:", cookieStore.getAll()); // 👈 add this
  // Function
  const res = await fetch("http://localhost:8000/api/v1/videos", {
    headers: {
      Accept: "application/json",
      Cookie: cookieHeader, // forward cookies manually
      "X-XSRF-TOKEN": decodedXsrf, // 👈 add this
      Referer: "http://localhost:3000", // 👈 add this
    },
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);
```
```tsx
Notes 
1. We need to include referer  "Referer":" http://localhost:3000",
// 👈 add this since server does not know the call
2. also include  "X-XSRF-TOKEN": decodedXsrf, // 👈 add this"
```


# Client Component - API Call
```ts

 const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/videos', {
            credentials: 'include', // browser handles cookies + referer automatically
            headers: {
                Accept: 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => setData(data));
    }, []);
    console.log(data)
```