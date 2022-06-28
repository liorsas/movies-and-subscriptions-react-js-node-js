const userModel = require("../models/userModel");
const usersBL = require("../models/userModelBL");
const usersFileDal = require("../DALs/usersFileDal");
const permitionFile = require("../DALs/permissionsFileDal");
const User = require("../models/userModel");

async function authCheck(obj) {
  try {
    let usersArr = await usersBL.getUsersDb();

    let validUser = usersArr.find((el) => el.username == obj.username);

    if (validUser && (await validUser.matchPassword(obj.pass))) {
      let userFile = await usersFileDal.getUsersDal();

      let user = userFile.users.find((usr) => usr.id == validUser._id);

      let permFile = await permitionFile.getPermissionsDal();

      let permitions = permFile.permissions.find(
        (prm) => prm.id == validUser._id
      );

      let rtnObj = {
        id: permitions.id,
        name: user.firstname + " " + user.lastname,
        role: validUser.role,
        sessionTime: user.SessionTimeOut,
        permitions: permitions.permissions,
      };

      return rtnObj;
    } else return false;
  } catch (err) {
    console.log(err);
  }
}

async function checkAdmin(obj) {
  try {
    let usersDB = await usersBL.getUsersDb();
    let fndUser = userModel.find(
      (el) => el.username == obj.username && el.passward == obj.pass
    );

    if (fndUser) {
      if (fndUser.role == "Admin") {
        return true;
      } else {
        return false;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
  }
}

async function checkUserExsitsAnUpdate(obj) {
  try {
    let usersDB = await usersBL.getUsersDb();

    let fndUser = usersDB.find((el) => el.username == obj.username);

    console.log(fndUser);

    if (fndUser) {
      if (fndUser.passward !== obj.pass) {
        let newObj = {
          username: obj.username,
          passward: parseInt(obj.pass),
          role: fndUser.role,
        };

        let userid = fndUser._id.toString();

        let resp = await usersBL.updateUserBYid(userid, newObj);

        return resp;
      } else return false;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { authCheck, checkAdmin, checkUserExsitsAnUpdate };
