import axios from "axios";

async function loginUser(obj) {
  try {
    let resp = await fetch("https://moviesandsub.herokuapp.com/api/users/log", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(obj),
    });
    let stat = await resp.json();

    return stat;
  } catch (err) {
    throw new Error("connection failled -> server is down!");
  }
}

async function addNewUser(userObj) {
  try {
    let resp = await axios({
      method: "post",
      url: "https://moviesandsub.herokuapp.com/api/users/add",
      data: userObj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to crate a new user by admin");
  }
}

async function deleteUser(userId) {
  try {
    let resp = await axios({
      method: "delete",
      url: "https://moviesandsub.herokuapp.com/api/users/del/" + userId,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail deleting  a user.");
  }
}

async function getUser(userId) {
  try {
    let resp = await axios({
      method: "get",
      url: "https://moviesandsub.herokuapp.com/api/users/" + userId,

      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to get user details.");
  }
}

async function updateUser(userId, obj) {
  try {
    let resp = await axios({
      method: "put",
      url: "https://moviesandsub.herokuapp.com/api/users/upd/" + userId,
      data: obj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to update user detalis.");
  }
}

const exportUserUtils = {
  addNewUser,
  deleteUser,
  getUser,
  updateUser,
  loginUser,
};

export default exportUserUtils;
