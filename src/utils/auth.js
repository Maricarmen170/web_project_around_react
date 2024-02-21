import { BASE_URL } from "./config";

export const registerUser = async (email, password) => {
    try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
  };

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
        }
    })
    .catch(err => console.log(err))
};

export const checkToken = async (token) => {
    try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res",res)
    return await res.json();
  } catch (err) {
    console.log(err);
  }
  };