export async function changePassword(email, password) {
    return fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
  }