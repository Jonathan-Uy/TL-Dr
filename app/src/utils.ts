import axios from "axios";

const url = "http://localhost:5000";

export function getFromStorage(key: string) {
  return localStorage.getItem(key);
}

export function setInStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeFromStorage(key: string) {
  localStorage.removeItem(key);
}

export async function login(email: string, password: string) {
  const { data } = await axios.post(`${url}/auth/login`, {
    email,
    password,
  });

  if (data.error) {
    throw new Error(data.error);
  }

  setInStorage("token", data.token);

  return data;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await axios.post(`${url}/auth/register`, {
    name,
    email,
    password,
  });

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export function logout() {
  removeFromStorage("token");
  window.location.assign("/login");
}

export function isEmpty(obj: object) {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
}

export async function getUser(token: string) {
  const { data } = await axios.get(`${url}/user/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
