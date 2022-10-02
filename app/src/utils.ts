import axios from "axios";

export const url = "http://localhost:5000";

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

export async function getFiles(token: string) {
  const { data } = await axios.get(`${url}/file/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function uploadFile(token: string, file: File) {
  let formData = new FormData();
  formData.append("files", file);

  const config = {
    method: "post",
    url: `${url}/file/upload`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  const { data } = await axios(config);

  return data;
}

export async function generateHandoff(token: string, fileId: string) {
  const { data } = await axios.post(
    `${url}/file/generate-report`,
    { fileId: fileId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function generatePatientSummary(
  token: string,
  fileId: string,
  language?: string
) {
  if (language) {
    const { data } = await axios.post(
      `${url}/file/generate-patient-summary`,
      { fileId: fileId, language: language },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } else {
    const { data } = await axios.post(
      `${url}/file/generate-patient-summary`,
      { fileId: fileId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  }
}

export async function getOtherDoctors(token: string) {
  const { data } = await axios.get(`${url}/user/other`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function shareDocument(
  token: string,
  fileId: string,
  userId: string
) {
  const { data } = await axios.post(
    `${url}/file/share`,
    { fileId: fileId, userId: userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function emailDocument(
  token: string,
  fileId: string,
  email: string
) {
  const { data } = await axios.post(
    `${url}/file/email`,
    { fileId: fileId, email: email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function deleteDocument(token: string, fileId: string) {
  const { data } = await axios.post(
    `${url}/file/delete`,
    { fileId: fileId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

export async function downloadDocument(token: string, fileId: string) {
  const { data } = await axios.post(
    `${url}/file/download`,
    { fileId: fileId, responseType: "blob" },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
}
