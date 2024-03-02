export async function getUsers() {
  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "GET",
    credentials: 'include',
  }).then(function (res) { return res.json(); })
}