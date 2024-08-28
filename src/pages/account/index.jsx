import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./components/index.css";
import AccountInfo from "./components/account-info";
import logoutButton from "../../assets/account/logout.svg";
import AccountTable from "./components/account-table";
import { authActions } from "../../store";

const AccountPage = () => {
  const auth = useSelector((x) => x.auth.value);

  console.log("Auth:", auth);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(authActions.logout());
  };

  return (
    <section id="account">
      <div className="account-header">
        <div className="account-header-info">
          {auth ? <AccountInfo user={auth} /> : <p>Loading...</p>}
        </div>
        <div className="account-header-buttons-box">
          <button
            onClick={() => handleLogout()}
            className="account-header-button"
          >
            <img src={logoutButton} alt="logout" />
            LogOut
          </button>
        </div>
      </div>
      <div>
        <AccountTable />
      </div>
    </section>
  );
};

export default AccountPage;
