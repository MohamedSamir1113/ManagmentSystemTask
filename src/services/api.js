import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";

export async function fetchUsers() {
  const { data } = await axios.get(BASE_URL);
  return data.users;
}

export async function addUser(data) {
  const { data: newUser } = await axios.post(`${BASE_URL}/add`, data);
  return newUser;
}

export async function updateUser(id, data) {
  const { data: updated } = await axios.put(`${BASE_URL}/${id}`, data);
  return updated;
}

export async function deleteUser(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
}
