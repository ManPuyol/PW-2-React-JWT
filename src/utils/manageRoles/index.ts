export async function changeRoles(userId: string | number, roles: string[]) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            roles
        }),
    });
  }