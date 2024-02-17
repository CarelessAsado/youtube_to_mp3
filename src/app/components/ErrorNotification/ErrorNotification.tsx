import React, { useState, useEffect } from "react";
import styles from "./errornotification.module.css";
const useErrorNotification = () => {
  const [isVisible, setIsVisible] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible("");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  const ErrorNotification = () => {
    if (!isVisible) return null;
    return (
      <div
        className={`${styles.tooltip} ${isVisible ? styles.tooltip_show : ""}`}
      >
        {isVisible}
      </div>
    );
  };
  return { ErrorNotification, setError: setIsVisible };
};

export default useErrorNotification;
