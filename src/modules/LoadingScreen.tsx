"use client";

import React, { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";

const LoadingScreen = () => {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(typeof window === "undefined");
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-primary z-50 ${
        isServer ? "visible" : "invisible"
      }`}
    >
      <PacmanLoader color="#fff" size={40} />
    </div>
  );
};

export default LoadingScreen;
