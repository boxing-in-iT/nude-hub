import React, { useEffect, useState } from "react";
import "./index.css";
import logo from "../../assets/account/rabbit.png";
import { useDispatch, useSelector } from "react-redux";
import fullHeart from "../../assets/pricing/fullHeart.svg";
import emptyHeart from "../../assets/pricing/emptyHeart.svg";
import { alertActions, packagesActions } from "../../store";
import Modal from "../../components/modal/Modal";

const Packages = () => {
  const { items = [], status } = useSelector((state) => state.package);
  const alert = useSelector((state) => state.alert.value); // Достаем состояние алертов
  const auth = useSelector((x) => x.auth.value);
  const [testItem, setTestItem] = useState(items[0]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(packagesActions.fetchPackages());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      setTestItem(items[0]);
    }
  }, [items]);

  useEffect(() => {
    // Если появляется ошибка, показываем модальное окно
    if (alert?.type === "alert-danger") {
      setShowModal(true);
    }
  }, [alert]);

  const handlePurchase = () => {
    dispatch(
      packagesActions.createPaymentSession({
        userId: 1,
        productId: 1,
      })
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(alertActions.clear()); // Очистка алерта при закрытии модального окна
  };

  return (
    <section className="package-container">
      <div className="package-card">
        <img src={logo} alt="logo" className="package-logo" />
        <div className="package-title">{testItem?.name}</div>
        <div className="package-credits">{testItem?.credits} credits</div>

        <ul className="package-features">
          {testItem?.excluded.map((feature, i) => (
            <li className="package-feature" key={i}>
              <img
                src={i < 4 ? fullHeart : emptyHeart}
                alt={i < 4 ? "full heart" : "empty heart"}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="package-pricing">
          <span className="old-price">€31.50</span>
          <span className="new-price">€{testItem?.cost}/mo</span>
          <div className="package-total">For a total €188.99</div>
        </div>

        <div className="change-plan">CHANGE THE PLAN</div>

        {testItem?.paymentMethods.map((item, i) => (
          <button key={i} onClick={handlePurchase}>
            <img src={item.icon} className="package-payment-icon" alt="icon" />
          </button>
        ))}
      </div>

      {/* Модальное окно для отображения ошибки */}
      <Modal
        message={alert?.message} // Сообщение из состояния alert
        onClose={handleCloseModal} // Функция для закрытия модального окна
      />
    </section>
  );
};

export default Packages;
