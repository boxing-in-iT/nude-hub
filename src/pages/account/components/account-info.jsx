import React from "react";
import rabbit from "../../../assets/account/rabbit.png";

const AccountInfo = ({ user }) => {
  return (
    <div className="account-info">
      <h2 className="account-info-title">
        Account<span className="red">Info</span>rmation
      </h2>
      <div className="account-info-box">
        <div className="account-info-photo">
          <img src={rabbit} alt="rabbit" className="info-photo" />
        </div>
        <div className="account-info-data">
          <p className="account-info-data-item">Email: {user.email}</p>
          <p className="account-info-data-item">Name: {user?.firstname}</p>
          <p className="account-info-data-item">Balance: {user.balance}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
