import React from "react";
import mainPhoto from "../../assets/main/image 370.png";
import logo from "../../assets/main/logo.png";

import girl from "../../assets/main/girl.png";
import nudeGirl from "../../assets/main/nudeGirl.png";
import star from "../../assets/main/star.svg";
import blueStar from "../../assets/main/blueStar.svg";
import wand from "../../assets/main/MagicWand.svg";
import "./index.css";

const WelcomePage = () => {
  return (
    <section id="welcome">
      <div className="welcome-column">
        <div className="welcome-container elipse-bg stars">
          <div className="welcome-container-box">
            <img
              className="main-photo"
              src={mainPhoto}
              alt="main photo of girl"
            />
          </div>
          <div className="welcome-container-box">
            <img className="logo-img" src={logo} alt="logo" />
            <div className="logo">
              <span className="nude">NUDE</span>
              <span className="hub">HUB</span>
              <span className="ai">
                <span className="a">A</span>
                <span className="i">I</span>
              </span>
            </div>
          </div>
        </div>
        <div className="welcome-container">
          <div className="plashka">
            <div className="plashka-content">
              <div className="plashka-box-left">
                <h2 className="plashka-title">
                  Get undressed your own AI Girlfriend
                </h2>
                <p className="plashka-subtitle">
                  Your dream companion awaits! Create your AI Girlfriend, shape
                  <br />
                  her look, personality, and bring her to life in one click.
                  100%
                  <br /> powered by Artificial Intelligence.
                </p>
                <button className="plashka-button">
                  <img src={wand} alt="wand" /> Create your AI
                </button>
              </div>

              <div className="plashka-box-right">
                <img src={girl} className="girl-img" alt="girl" />
                <img src={nudeGirl} className="nude-girl-img" alt="nude girl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={star} alt="star" className="star-1" />
      <img src={star} alt="star" className="star-2" />
      <img src={star} alt="star" className="star-3" />
      <img src={star} alt="star" className="star-4" />
      <img src={blueStar} alt="star" className="star-5" />
      <img src={blueStar} alt="star" className="star-6" />
      <img src={blueStar} alt="star" className="star-7" />
    </section>
  );
};

export default WelcomePage;

// import React from "react";
// import mainPhoto from "../../assets/main/image 370.png";
// import logo from "../../assets/main/logo.png";

// import girl from "../../assets/main/girl.png";
// import nudeGirl from "../../assets/main/nudeGirl.png";
// import star from "../../assets/main/star.svg";
// import blueStar from "../../assets/main/blueStar.svg";
// import wand from "../../assets/main/MagicWand.svg";
// import "./index.css";

// const WelcomePage = () => {
//   return (
//     <section id="welcome">
//       <div className="welcome-column">
//         <div className="welcome-container elipse-bg stars">
//           <div className="welcome-container-box">
//             <img
//               className="main-photo"
//               src={mainPhoto}
//               alt="main photo of girl"
//             />
//           </div>
//           <div className="welcome-container-box">
//             <img className="logo-img" src={logo} alt="logo" />
//             <div class="logo">
//               <span class="nude">NUDE</span>
//               <span class="hub">HUB</span>
//               <span class="ai">
//                 <span class="a">A</span>
//                 <span class="i">I</span>
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="welcome-container">
//           <div className="plashka">
//             <div className="plashka-content">
//               <div className="plashka-box-left">
//                 <h2 className="plashka-title">
//                   Get undressed your own AI Girlfriend
//                 </h2>
//                 <p className="plashka-subtitle">
//                   Your dream companion awaits! Create your AI Girlfriend, shape
//                   <br />
//                   her look, personality, and bring her to life in one click.
//                   100%
//                   <br /> powered by Artificial Intelligence.
//                 </p>
//                 <button className="plashka-button">
//                   <img src={wand} /> Create your AI
//                 </button>
//               </div>

//               <div className="plashka-box-right">
//                 <img src={girl} />
//                 <img src={nudeGirl} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <img src={star} alt="star" className="star-1" />
//       <img src={star} alt="star" className="star-2" />
//       <img src={star} alt="star" className="star-3" />
//       <img src={star} alt="star" className="star-4" />
//       <img src={blueStar} alt="star" className="star-5" />
//       <img src={blueStar} alt="star" className="star-6" />
//       <img src={blueStar} alt="star" className="star-7" />
//     </section>
//   );
// };

// export default WelcomePage;
