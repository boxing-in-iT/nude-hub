import React from "react";
import { Trans, useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  return (
    <section style={{ minHeight: "80vh" }} id="faq">
      <div className="faq-title-box">
        {/* <h2 className="faq-title">
          FAQs about NUDE<span className="red">HUB</span>
        </h2> */}
        <h2 className="faq-title">
          <Trans
            i18nKey="faq_title"
            components={{
              span: <span style={{ color: "#DE7084" }} />,
            }}
          />
        </h2>
      </div>
      <div className="faqs">
        <div className="faq-item">
          <h2 className="faq-item-title">
            <Trans
              i18nKey="faq_item_1_title"
              components={{
                span: <span style={{ color: "#DE7084" }} />,
              }}
            />
          </h2>
          <p className="faq-answer">{t("faq_item_1_answer")}</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-item-title">
            <Trans
              i18nKey="faq_item_2_title"
              components={{
                span: <span style={{ color: "#DE7084" }} />,
              }}
            />
          </h2>
          <p className="faq-answer">{t("faq_item_2_answer")}</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-item-title">
            <Trans
              i18nKey="faq_item_3_title"
              components={{
                span: <span style={{ color: "#DE7084" }} />,
              }}
            />
          </h2>
          <p className="faq-answer">{t("faq_item_3_answer")}</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-item-title">
            <Trans
              i18nKey="faq_item_4_title"
              components={{
                span: <span style={{ color: "#DE7084" }} />,
              }}
            />
          </h2>
          <p className="faq-answer">{t("faq_item_4_answer")}</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-item-title">
            <Trans
              i18nKey="faq_item_5_title"
              components={{
                span: <span style={{ color: "#DE7084" }} />,
              }}
            />
          </h2>
          <p className="faq-answer">{t("faq_item_5_answer")}</p>
        </div>
      </div>
    </section>
  );
};

export default Faq;
