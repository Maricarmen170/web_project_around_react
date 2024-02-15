
import { BASE_URL } from "./config";


//export const registerUser = async (email, password) => {
    //const response = await api.registerUser(email, password)
//}

export const registerUser = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

export const authorize = (identifier, password) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({identifier,password})
    })
    .then((response => response.json()))
    .then((data) => {
        if(data.user) {
            localStorage.setItem('jwt', data.jwt);

            return data;
        }
    })
    .catch(err => console.log(err))
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  };
  