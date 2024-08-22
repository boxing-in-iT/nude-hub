import React from "react";
import "./components/index.css";
import AccountInfo from "./components/account-info";
import logoutButton from "../../assets/account/logout.svg";
import AccountTable from "./components/account-table";

const AccountPage = () => {
  return (
    <section id="account">
      <div className="account-header">
        <div className="account-header-info">
          <AccountInfo />
        </div>
        <div className="account-header-buttons-box">
          <button className="account-header-button">
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
