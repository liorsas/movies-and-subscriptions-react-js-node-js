import axios from "axios";

async function getSubscriptions() {
  try {
    let resp = await axios({
      method: "get",
      url: "https://moviesandsub.herokuapp.com/api/sub",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });
    return resp.data;
  } catch (err) {
    throw new Error("fail to get subscriptions.");
  }
}

async function saveMovieToExistMmeber(memId, movObj) {
  try {
    let resp = await axios({
      method: "put",
      url: "https://moviesandsub.herokuapp.com/api/sub/update/" + memId,
      data: movObj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to update movie to exsist member.");
  }
}

async function saveMovieToNewMmeber(movieObj) {
  try {
    let resp = await axios({
      method: "post",
      url: "https://moviesandsub.herokuapp.com/api/sub",
      data: movieObj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to add  new subscriptions(movie).");
  }
}

async function deleteMovieFromMember(memId, movId) {
  try {
    let data = {
      movieid: movId,
    };

    let resp = await axios({
      method: "put",
      url: "https://moviesandsub.herokuapp.com/api/sub/delmov/" + memId,
      data: data,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });
    return resp.data;
  } catch (err) {
    throw new Error("fail deleting movie from subscription.");
  }
}

async function deleteMember(memId) {
  try {
    let resp = await axios({
      method: "delete",
      url: "https://moviesandsub.herokuapp.com/api/sub/del/" + memId,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });
    return resp.data;
  } catch (err) {
    throw new Error("fail deleting member from list");
  }
}

async function addNewMember(memObj) {
  try {
    let resp = await axios({
      method: "post",
      url: "https://moviesandsub.herokuapp.com/api/members",
      data: memObj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to create new member.");
  }
}

async function updateMember(memId, memObj) {
  try {
    let resp = await axios({
      method: "put",
      url: "https://moviesandsub.herokuapp.com/api/members/" + memId,
      data: memObj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });
    return resp.data;
  } catch (err) {
    throw new Error("fail updating member details.");
  }
}

async function getMember(memId) {
  try {
    let resp = await axios.get(
      "https://moviesandsub.herokuapp.com/api/members/" + memId
    );
    return resp.data;
  } catch (err) {
    throw new Error("fail to get member details.");
  }
}

const exportFunction = {
  getSubscriptions,
  saveMovieToExistMmeber,
  saveMovieToNewMmeber,
  deleteMovieFromMember,
  deleteMember,
  addNewMember,
  updateMember,
  getMember,
};
export default exportFunction;
