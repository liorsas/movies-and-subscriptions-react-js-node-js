const membersModelBl = require("../models/membersModelBL");
const subscriptionModelBL = require("../models/subscriptionsModelBL");

const movieModelBl = require("../models/moviesModelBL");
const mongoose = require("mongoose");

async function getSubscriptions() {
  try {
    let tmp = [];

    let members = await membersModelBl.getMembers();

    for (let i = 0; i < members.length; i++) {
      members[i].subscription =
        await subscriptionModelBL.getSubscriptionsSearchByMemberId(
          members[i]._id
        );
      tmp[i] = members[i].subscription;

      members[i].unSeenMovies = await movieModelBl.getMovies();

      for (let k = 0; k < members[i].subscription.length; k++) {
        for (let j = 0; j < members[i].subscription[k].movies.length; j++) {
          let movId = members[i].subscription[k].movies[j].movieid;
          members[i].subscription[k].movies[j].moviename =
            await movieModelBl.getMovie(movId);
        }
      }
    }

    for (let n = 0; n < members.length; n++) {
      for (let m = 0; m < members[n].subscription.length; m++) {
        if (members[n].subscription[m].movies !== undefined) {
          members[n].subscription = members[n].subscription[m].movies;
        }
      }
    }

    let finalArr = members.map((mem) => ({
      id: mem._id,
      name: mem.name,
      email: mem.email,
      city: mem.city,

      subscription: mem.subscription.map((mov) => ({
        movieid: mov.movieid,
        date: new Date(mov.date).toLocaleDateString("he-IL"),
        moviename: mov.moviename.name,
      })),

      unSeenMov: mem.unSeenMovies.filter(function (array_el) {
        return (
          mem.subscription.filter(function (anotherOne_el) {
            return anotherOne_el.movieid == array_el._id;
          }).length == 0
        );
      }),
    }));

    return finalArr;
  } catch (err) {
    console.log(err);
  }
}

async function updateSubscription(memId, movObj) {
  let memberSub = await subscriptionModelBL.getSubscriptionsSearchByMemberId(
    memId
  );

  let member = memberSub[0];

  member.movies.push(movObj);

  let newObj = {
    memberid: member.memberid,
    movies: member.movies,
  };

  console.log(member._id);

  let updServer = await subscriptionModelBL.updateSubscription(
    member._id,
    newObj
  );

  return updServer;
}

async function addSubscription(movieObj) {
  let newObj = {
    memberid: mongoose.Types.ObjectId(movieObj.memberid),
    movies: movieObj.movies,
  };

  let updServer = await subscriptionModelBL.addSubscription(newObj);

  return updServer;
}

async function deleteMovieFromMember(memId, movId) {
  // let movieId = mongoose.Types.ObjectId(movId)
  let memberSub = await subscriptionModelBL.getSubscriptionsSearchByMemberId(
    memId
  );

  let member = memberSub[0];

  if (member.movies.length > 1) {
    let movies = member.movies.filter((el) => el.movieid.toString() !== movId);

    let newObj = {
      memberid: memId,
      movies: movies,
    };
    let updServer = await subscriptionModelBL.updateSubscription(
      member._id,
      newObj
    );

    return updServer;
  } else {
    let deleteSubMember = await subscriptionModelBL.deleteSubscription(
      member._id
    );
    return deleteSubMember;
  }
}

async function deleteMember(memId) {
  try {
    console.log(memId);
    //get member from subscription by member id

    let member = await subscriptionModelBL.getSubscriptionsSearchByMemberId(
      memId
    );
    console.log(member[0]);

    if (member.length == 0) {
      let delMember = await membersModelBl.deleteMember(memId);
      return delMember;
    }

    if (member.length > 0) {
      let delSubscription = await subscriptionModelBL.deleteSubscription(
        member[0]._id
      );

      let delMember = await membersModelBl.deleteMember(memId);

      return delMember;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getSubscriptions,
  updateSubscription,
  addSubscription,
  deleteMovieFromMember,
  deleteMember,
};
