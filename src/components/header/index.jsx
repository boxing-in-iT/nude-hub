import React from "react";
import logo from "../../assets/header/logo.svg";
import boy from "../../assets/header/GenderMale.svg";
import girl from "../../assets/header/GenderFemale.svg";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <div className="header-box">
          <img className="header-logo" src={logo} alt="logo" />
          <div className="header-box-genders">
            <div className="header-box-gender">
              <img src={boy} alt="boys" />
              <p>boys</p>
            </div>
            <div className="header-box-gender">
              <img src={girl} alt="girls" />
              <p>girls</p>
            </div>
          </div>
        </div>
        <div className="header-box">
          <nav>
            <ul className="header-box-menu">
              <li className="header-box-menu-item">Home</li>
              <li className="header-box-menu-item">Examples</li>
              <li className="header-box-menu-item">Pricing</li>
              <li className="header-box-menu-item">How to</li>
            </ul>
            <button className="header-login-button">Login</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React from "react";
// import logo from "../../assets/header/logo.svg";
// import boy from "../../assets/header/GenderMale.svg";
// import girl from "../../assets/header/GenderFemale.svg";

// const Header = () => {
//   return (
//     <header>
//       <div className="header-content">
//         <div className="header-box">
//           <img className="header-logo" src={logo} alt="logo" />
//           <div className="header-box-genders">
//             <div className="header-box-gender">
//               <img src={boy} />
//               <p>boys</p>
//             </div>
//             <div className="header-box-gender">
//               <img src={girl} />
//               <p>girls</p>
//             </div>
//           </div>
//         </div>
//         <div className="header-box">
//           <nav>
//             <ul className="header-box-menu">
//               <li className="header-box-menu-item">Home</li>
//               <li className="header-box-menu-item">Examples</li>
//               <li className="header-box-menu-item">Pricing</li>
//               <li className="header-box-menu-item">How to</li>
//             </ul>
//             <button className="header-login-button">Login</button>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
