import React from "react";

import fullHeart from "../../assets/pricing/fullHeart.svg";
import emptyHeart from "../../assets/pricing/emptyHeart.svg";

const Pricing = () => {
  return (
    <section>
      <h1 className="pricing-title">Pricing & plans</h1>
      <div className="pricing-container">
        <div className="pricing-card">
          <div className="card-header">lifetime</div>
          <div className="card-title">One</div>
          <div className="card-subtitle">1 credit</div>
          <ul className="card-features">
            <li>Excellent quality (UHD)</li>
            <li>Body type trait access</li>
            <li>Age trait access</li>
            <li>No watermark</li>
            <li>No queue</li>
            <li>Undress Mode</li>
          </ul>
          <div className="card-price">
            <span className="old-price">€4</span>
            <span className="new-price">€2</span>
          </div>
          <div className="card-footnote">One credit - One picture</div>
        </div>
        <div className="pricing-card">
          <div className="card-header">lifetime</div>
          <div className="card-title">Ultra Plan</div>
          <div className="card-subtitle">600 credits</div>
          <ul className="card-features">
            <li>Excellent quality (UHD)</li>
            <li>Body type trait access</li>
            <li>Age trait access</li>
            <li>No watermark</li>
            <li>No queue</li>
            <li>Undress Mode</li>
          </ul>
          <div className="card-price">
            <span className="old-price">€31.5</span>
            <span className="new-price">€15.75/mo</span>
          </div>
          <div className="card-footnote">For a total €188.99</div>
        </div>
        <div className="pricing-card">
          <div className="card-header">lifetime</div>
          <div className="card-title">Super Plan</div>
          <div className="card-subtitle">90 credits</div>
          <ul className="card-features">
            <li>Excellent quality (UHD)</li>
            <li>Body type trait access</li>
            <li>Age trait access</li>
            <li>No watermark</li>
            <li>No queue</li>
            <li>Undress Mode</li>
          </ul>
          <div className="card-price">
            <span className="old-price">€14.84</span>
            <span className="new-price">€7.42/mo</span>
          </div>
          <div className="card-footnote">For a total €88.99</div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
