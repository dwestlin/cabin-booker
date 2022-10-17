import { API_URL } from "./common";

const login = (username, password) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, pwd: password }),
  };

  return fetch(`${API_URL}/login`, options)
    .then((response) => response.json())
    .then((data) => {
      if (data.accessToken) localStorage.setItem("user", JSON.stringify(data));
    });
};

export { login, API_URL };
