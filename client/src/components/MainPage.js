import { Route, Routes } from "react-router-dom";
import AddMember from "./AddMember";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import LoginPage from "./LoginPage";
import MainMovies from "./MainMovies";
import MainSubscriptions from "./MainSubscriptions";
import MenuPage from "./MenuPage";
import Movies from "./Movies";
import Subscriptions from "./Subscriptions";
import Users from "./Users";
import EditMember from "./EditMember";
import MainUsersAdmin from "./MainUsersAdmin";
import AddNewUser from "./AddNewUser";
import EditUser from "./EditUser";

function MainPage() {
  return (
    <div className="main-page">
      <Routes>
        <Route path="/" element={<LoginPage />}>
          {" "}
        </Route>

        <Route path="/menu" element={<MenuPage />}>
          <Route path="" element={<MainMovies />}>
            <Route path="" element={<Movies />}>
              {" "}
            </Route>
            <Route path="add" element={<AddMovie />}>
              {" "}
            </Route>
          </Route>
          <Route path="mainsub" element={<MainSubscriptions />}>
            <Route path="" element={<Subscriptions />}>
              {" "}
            </Route>
            <Route path="add" element={<AddMember />}>
              {" "}
            </Route>
          </Route>
          <Route path="editmember/:id" element={<EditMember />}></Route>
          <Route path="editmovie/:id" element={<EditMovie />}></Route>
          <Route path="edituser/:id" element={<EditUser />}></Route>

          <Route path="users" element={<MainUsersAdmin />}>
            <Route path="" element={<Users />}>
              {" "}
            </Route>
            <Route path="add" element={<AddNewUser />}>
              {" "}
            </Route>
          </Route>
          <Route path="loguut" element={<LoginPage />}>
            {" "}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default MainPage;
