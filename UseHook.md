
# Custom Hook | Fundamental
## useState

When React renders a component, it runs your function from top to bottom. Every time something changes, it runs it again. Normal variables get reset every time. useState solves that — it remembers the value between renders.
Here is the simplest example:
```js
const [count, setCount] = useState(0);
```
This one line gives you three things. count is the current value. setCount is the function to update it. 0 is the starting value.
When you call setCount(5), React updates the value and re-renders the component. Now count is 5. If you just did count = 5 without useState, it would work once but React would not know anything changed, so the screen would never update.

A real example
```js
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
Every time the button is clicked, setCount is called with the new value. React re-renders the component. The screen shows the updated number.

The only rule
Never change the value directly. Always use the setter function.
```js
jscount = 5;        // ❌ wrong — React won't know
setCount(5);      // ✅ correct — React re-renders
```
That is all of **useState**. Just a value and a function to update it.



## useEffect
When React runs your component function, it expects it to be clean — just calculate what to show on screen and return it. But sometimes you need to do something extra after rendering, like calling an API, setting a timer, or reading from localStorage. These are called side effects.
useEffect is the place React gives you to run those side effects safely — after the component has rendered.

The basic shape
```js
useEffect(() => {
  // your side effect goes here
}, []);
```
It takes two things. A function to run, and a dependency array [] that controls when to run it.

A simple example
```js
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('component appeared on screen');
    // this is where you would fetch from Laravel
  }, []);

  return <p>Hello</p>;
}
```
The console.log runs once — after the component first appears on screen. Not before, not during. After.

The dependency array — this is the most important part
The array controls when the effect runs. There are three cases.
Empty array [] — run once on mount
```js
useEffect(() => {
  // runs once when component first appears
}, []);
```
Array with a value [userId] — run when that value changes
```js
useEffect(() => {
  // runs every time userId changes
}, [userId]);
```
No array at all — run after every render
```js
useEffect(() => {
  // runs after every single render
  // almost always wrong, avoid this
});
```
Now put useState and useEffect together
This is the pattern you will use to fetch from Laravel:
```js
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```
What happens here step by step. Component renders with users as empty array. After render, useEffect fires and calls the Laravel API. When the response comes back, setUsers is called with the data. React re-renders the component. Now users has data and the list shows on screen.

That is useEffect. Just a way to run code after rendering, with the array controlling when.
Ready to move to the three states — loading, data, and error?


## The problem
Right now our fetch looks like this:
```js
useEffect(() => {
  fetch('http://localhost:8000/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```
This works but it is incomplete. When the page first loads, there is a moment where users is an empty array and nothing is shown. If the API fails, nothing happens — no error message, just silence. The user has no idea what is going on.
Every API call has exactly three possible situations and you must handle all three.

The three states
```
Loading — the request is in flight. Show a spinner or a message.
Data — the request succeeded. Show the result.
Error — the request failed. Show an error message.
```

How to model them
You need three separate useState declarations:
```js
const [users, setUsers]     = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError]     = useState(null);
```
Now wire them into the fetch
```js
useEffect(() => {

  setLoading(true);   // request is starting
  setError(null);     // clear any old error

  fetch('http://localhost:8000/api/users')
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      return res.json();
    })
    .then(data => {
      setUsers(data);     // store the data
    })
    .catch(err => {
      setError(err.message);  // store the error
    })
    .finally(() => {
      setLoading(false);  // request is done either way
    });

}, []);
```
Notice .finally() — it runs whether the request succeeded or failed. So loading always goes back to false at the end.
Also notice if (!res.ok) — this is important with fetch. Unlike Axios, fetch does not automatically throw on errors like 404 or 500. You have to check res.ok yourself and throw manually.

Handle all three in the UI
```js
function UserList() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:8000/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

Now the component handles every situation. The user always sees something meaningful on screen.

---

### **The pattern to memorize**

Every single hook you write that talks to Laravel will follow this exact pattern:
```js
setLoading(true)
  → fetch
    → success: setData()
    → failure: setError()
  → finally: setLoading(false)
  ```
You will write this over and over. It becomes muscle memory.

Now you have all three building blocks — useState, useEffect, and the three states. Ready to move to building your first custom hook?


The problem with keeping it in the component
Right now all the logic lives inside the component. That works fine for one component. But what if you have two pages that both need to show users? You copy paste everything. What if you have three pages? Three copies. This is messy and hard to maintain.
A custom hook solves this by moving the logic out of the component into its own reusable function.

The rule for creating a custom hook
It is just a regular JavaScript function. The only rule is that its name must start with use. That is what tells React to apply hook rules to it.
```js
function useUsers() {
  // hook logic goes here
}
```
Now move everything into it
Take everything from the component and put it inside useUsers. Then return what the component needs.
```js
function useUsers() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:8000/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
}
```
That is your first custom hook. Nothing new here. You just moved the same code into a function and added return at the end.

Now the component becomes very clean
```js
function UserList() {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```
The component has no idea how the data is fetched. It does not know about fetch, or useEffect, or the API URL. It just asks for the data and displays it. That is the whole point.

And any other component can use the same hook
```js
function UserDropdown() {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Something went wrong</p>;

  return (
    <select>
      {users.map(u => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </select>
  );
}
```

Same hook, completely different component. The fetch logic is written once and shared everywhere.

---

### **Where to put the file**

Create a `hooks` folder in your Next.js project and save it as `useUsers.js`.
```js
hooks/
  useUsers.js
Then import it in any component that needs it.
jsimport { useUsers } from '../hooks/useUsers';
```
That is a custom hook. You moved logic out of the component, gave it a name starting with use, and returned what the component needs.
Ready to move to sending data to Laravel — the POST hook?


### Perfect. So far we only fetched data. Now we send data to Laravel.

The difference from a GET hook
In useUsers, the fetch happens automatically when the component appears on screen — that is why we used useEffect.
For POST, we do not want to send data automatically. We want to send it only when the user clicks a button or submits a form. So there is no useEffect here. Instead we expose a function that the component calls whenever it is ready.

The hook
```js
function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  async function createUser(formData) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to create user');
      }

      return await res.json(); // the new user Laravel returns

    } catch (err) {
      setError(err.message);
      return null;

    } finally {
      setLoading(false);
    }
  }

  return { createUser, loading, error };
}
```
Notice we return createUser as a function. The component decides when to call it.

The component
```js
function CreateUserForm() {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const { createUser, loading, error } = useCreateUser();

  async function handleSubmit(e) {
    e.preventDefault();

    const newUser = await createUser({ name, email });

    if (newUser) {
      setSuccess(`${newUser.name} created successfully`);
      setName('');
      setEmail('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>

      {error   && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}
```
What happens step by step
User fills the form and clicks submit. handleSubmit runs. It calls
```js 
createUser({ name, email }) 
```
from the hook. The hook sets loading to true, sends the POST request to Laravel, waits for the response. If Laravel returns the new user, the hook returns it. The component receives it and shows the success message. If Laravel returns an error, the hook sets error and returns null. The component shows the error message.

The key difference to remember
GET hook — logic runs inside useEffect automatically on mount. Returns data.
POST hook — logic runs inside a function you call manually. Returns a function.