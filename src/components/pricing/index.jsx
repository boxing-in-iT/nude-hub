import React, { useState, useRef, useEffect } from "react";
import fullHeart from "../../assets/pricing/fullHeart.svg";
import emptyHeart from "../../assets/pricing/emptyHeart.svg";
import "./index.css";

const Pricing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const animationFrameRef = useRef(null);

  const handleScroll = () => {
    if (isScrollingRef.current) return;
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = containerRef.current.firstChild.clientWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
      animationFrameRef.current = null;
    });
  };

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
    }, 500); // Adjust the timeout duration based on the scroll animation duration
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const cards = [
    {
      title: "One",
      subtitle: "1 credit",
      features: [
        "Excellent quality (UHD)",
        "Body type trait access",
        "Age trait access",
        "No watermark",
        "No queue",
        "Undress Mode",
      ],
      oldPrice: "€4",
      newPrice: "€2",
      footnote: "One credit - One picture",
    },
    {
      title: "Ultra Plan",
      subtitle: "600 credits",
      features: [
        "Excellent quality (UHD)",
        "Body type trait access",
        "Age trait access",
        "No watermark",
        "No queue",
        "Undress Mode",
      ],
      oldPrice: "€31.5",
      newPrice: "€15.75/mo",
      footnote: "For a total €188.99",
    },
    {
      title: "Super Plan",
      subtitle: "90 credits",
      features: [
        "Excellent quality (UHD)",
        "Body type trait access",
        "Age trait access",
        "No watermark",
        "No queue",
        "Undress Mode",
      ],
      oldPrice: "€14.84",
      newPrice: "€7.42/mo",
      footnote: "For a total €88.99",
    },
  ];

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <h1 className="pricing-title">
          Pricing <span style={{ color: "#DE7084" }}>&</span> plans
        </h1>
        <div className="pricing-cards" ref={containerRef}>
          {cards.map((card, index) => (
            <div
              className={`pricing-card ${
                card.title === "Ultra Plan" ? "elite-pricing-card" : ""
              }`}
              key={index}
            >
              <div className="card-title">{card.title}</div>
              <div className="card-subtitle">{card.subtitle}</div>
              <ul className="card-features">
                {card.features.map((feature, i) => (
                  <li className="card-feature" key={i}>
                    <img
                      src={i < 4 ? fullHeart : emptyHeart}
                      alt={i < 4 ? "full heart" : "empty heart"}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="card-price">
                <span className="old-price">{card.oldPrice}</span>
                <span className="new-price">{card.newPrice}</span>
              </div>
              <div className="card-footnote">{card.footnote}</div>
            </div>
          ))}
        </div>
        <div className="dots-container">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
