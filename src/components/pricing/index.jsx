import React from "react";

import fullHeart from "../../assets/pricing/fullHeart.svg";
import emptyHeart from "../../assets/pricing/emptyHeart.svg";

const Pricing = () => {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <h1 className="pricing-title">
          Pricing <span style={{ color: "#DE7084" }}>&</span> plans
        </h1>
        <div className="pricing-cards">
          <div className="pricing-card">
            {/* <div className="card-header">lifetime</div> */}
            <div className="card-title">One</div>
            <div className="card-subtitle">1 credit</div>
            <ul className="card-features">
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Excellent quality (UHD)
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Body type trait access
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Age trait access
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                No watermark
              </li>
              <li className="card-feature">
                <img src={emptyHeart} alt="empty heart" />
                No queue
              </li>
              <li className="card-feature">
                <img src={emptyHeart} alt="empty heart" />
                Undress Mode
              </li>
            </ul>
            <div className="card-price">
              <span className="old-price">€4</span>
              <span className="new-price">€2</span>
            </div>
            <div className="card-footnote">One credit - One picture</div>
          </div>
          <div className="pricing-card">
            {/* <div className="card-header">lifetime</div> */}
            <div className="card-title">Ultra Plan</div>
            <div className="card-subtitle">600 credits</div>
            <ul className="card-features">
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Excellent quality (UHD)
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Body type trait access
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Age trait access
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                No watermark
              </li>
              <li className="card-feature">
                <img src={emptyHeart} alt="empty heart" />
                No queue
              </li>
              <li className="card-feature">
                <img src={emptyHeart} alt="empty heart" />
                Undress Mode
              </li>
            </ul>
            <div className="card-price">
              <span className="old-price">€31.5</span>
              <span className="new-price">€15.75/mo</span>
            </div>
            <div className="card-footnote">For a total €188.99</div>
          </div>
          <div className="pricing-card">
            {/* <div className="card-header">lifetime</div> */}
            <div className="card-title">Super Plan</div>
            <div className="card-subtitle">90 credits</div>
            <ul className="card-features">
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Excellent quality (UHD)
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Body type trait access
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                Age trait access
              </li>
              <li className="card-feature">
                <img src={fullHeart} alt="full heart" />
                No watermark
              </li>
              <li className="card-feature">
                <img src={emptyHeart} alt="empty heart" />
                No queue
              </li>
              <li className="card-feature">
                <img src={emptyHeart} alt="empty heart" />
                Undress Mode
              </li>
            </ul>
            <div className="card-price">
              <span className="old-price">€14.84</span>
              <span className="new-price">€7.42/mo</span>
            </div>
            <div className="card-footnote">For a total €88.99</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
