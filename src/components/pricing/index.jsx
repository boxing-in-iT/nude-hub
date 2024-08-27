import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages, packagesActions } from "../../store";
import { useNavigate } from "react-router-dom";
import fullHeart from "../../assets/pricing/fullHeart.svg";
import emptyHeart from "../../assets/pricing/emptyHeart.svg";
import "./index.css";
import { Trans } from "react-i18next";

const Pricing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [] } = useSelector((state) => state.package);

  useEffect(() => {
    dispatch(packagesActions.fetchPackages());
  }, [dispatch]);

  const handleDotClick = (index) => {
    isScrollingRef.current = true;
    const cardWidth = containerRef.current.firstChild.clientWidth;
    containerRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollingRef.current = false;
      setActiveIndex(index);
    }, 500);
  };

  const handleCardClick = (id) => {
    navigate(`/package/${id}`);
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        {/* <h1 className="pricing-title">
          Pricing <span style={{ color: "#DE7084" }}>&</span> plans
        </h1> */}
        <h1 className="pricing-title">
          <Trans
            i18nKey="pricing_plans"
            components={{
              span: <span style={{ color: "#DE7084" }} />,
            }}
          />
        </h1>

        <div className="pricing-cards" ref={containerRef}>
          {items.map((item, index) => (
            <div
              className={`pricing-card ${
                item.title === "Ultra Plan" ? "elite-pricing-card" : ""
              }`}
              key={index}
            >
              <div className="card-title">{item.name}</div>
              <div className="card-subtitle">{item.credits}</div>
              <ul className="card-features">
                {item.excluded.map((feature, i) => (
                  <li className="card-feature" key={i}>
                    <img
                      src={i < 4 ? fullHeart : emptyHeart}
                      alt={i < 4 ? "full heart" : "empty heart"}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <div
                style={{ cursor: "pointer" }}
                className="card-price"
                onClick={() => handleCardClick(item.id)}
              >
                <span className="old-price">300</span>
                <span className="new-price">{item.cost}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="dots-container">
          {items.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeIndex ? "active-dot" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
