import React from "react";
import rabbit from "../../../assets/account/rabbit.png";

const AccountTable = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="th-id">ID</th>
            <th className="th-date">Date</th>
            <th className="th-status">Status</th>
            <th className="th-image">
              <img src={rabbit} alt="Bunny Icon" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>6130f3be-81bd-433f-81e7-0f99154856e1</td>
            <td>20.08.2024</td>
            <td>TRANSFORMED</td>
            <td>-2</td>
          </tr>
          <tr>
            <td>6130f3be-81bd-433f-81e7-0f99154856e1</td>
            <td>20.08.2024</td>
            <td>TRANSFORMED</td>
            <td>-2</td>
          </tr>
          <tr>
            <td>Ultra Plan</td>
            <td>20.08.2024</td>
            <td>BUY</td>
            <td>+100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
