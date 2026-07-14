
import { LoginDTypes } from '@/types/user.type';
import { getCookie } from './cookie';
// Step 1: get CSRF cookie
// This function will call the endpoint to get the CSRF cookie and store it in the browser. 
// This is required to get the CSRF token from the server and store it in the cookie, so that it can be sent with the login request. 
// The CSRF token is required to prevent CSRF attacks, and it is usually stored in a cookie by the server. By calling this function before login, you ensure that the CSRF token is available in the cookie and can be sent with the login request. 
// If you don't call this function before login, the login request will fail with a 419 error (CSRF token mismatch) because the server will not receive the CSRF token in the request.
async function getCsrfCookie() {
    // await fetch(`http://localhost:8000/api/v1/sanctum/csrf-cookie`, {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: 'include', // required to store the cookie
    });
}
// Step 2: call this function to login the user
// This function will throw an error if the login fails, so you can catch it in your component and display an error message to the user.
/**
 * @param username 
 * @param password 
 * @returns 
 */
export async function login(username: string, password: string): Promise<LoginDTypes> {
    // Step 1 — get CSRF cookie
    // This is required to get the CSRF token from the server and store it in the cookie, so that it can be sent with the login request.
    // The CSRF token is required to prevent CSRF attacks, and it is usually stored in a cookie by the server. 
    // By calling this function before login, you ensure that the CSRF token is available in the cookie and can be sent with the login request.
    // If you don't call this function before login, the login request will fail with a 419 error (CSRF token mismatch) because the server will not receive the CSRF token in the request.
    // Note: If your backend is configured to use a different endpoint for getting the CSRF cookie, you should update the URL in this function accordingly.
    // For example, if your backend is configured to use `/api/csrf-cookie` instead of `/sanctum/csrf-cookie`, you should update the URL in this function to `${API_URL}/api/csrf-cookie`.
    /**
     * In Laravel Sanctum, the default endpoint for getting the CSRF cookie is `/sanctum/csrf-cookie`.
     * This endpoint is used to set the CSRF token in a cookie, which is then sent with subsequent requests to protect against CSRF attacks.
     * If your Laravel application is using Sanctum for authentication, you should call this endpoint before making any authenticated requests (like login) to ensure that the CSRF token is properly set in the cookie.
     */
    await getCsrfCookie();
    // Step 2 — login the user
    // This function will throw an error if the login fails, so you can catch it in your component and display an error message to the user.
    /**
     * In this function, we are making a POST request to the login endpoint of our backend API.
     *  We include the username and password in the request body as JSON. We also include the CSRF token in the headers, which we retrieve from the cookie using the `getCookie` function. 
     * The `credentials: 'include'` option is used to ensure that cookies are sent with the request, which is necessary for authentication to work properly. 
     * If the login is successful, we return the response as JSON. If the login fails, we throw an error with the message from the response.
     */
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/login`, {
        method: 'POST', // use POST method for login
        credentials: 'include', // required to send cookies with the request
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') ?? ''),  // include the CSRF token from the cookie in the headers
        },
        // 
        body: JSON.stringify({ username, password }), // send the username and password in the request body as JSON
    });
    if (!res.ok) {
        const error = await res.json(); // get the error message from the response
        throw new Error(error.message || 'Login failed'); // throw an error with the message from the response, or a default message if the response does not include a message
    }
    // If the login is successful, we return the response as JSON. 
    // The response should include the user data and any authentication tokens that are needed for subsequent requests.
    return res.json();
}
