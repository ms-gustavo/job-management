"use client";

import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ThemeToggle from "@/components/ThemeToggle";

const HomePage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
      <ThemeToggle />
      <div className="flex flex-col md:flex-row mb-8 w-full">
        <div className="p-4 bg-background-light dark:bg-background-dark shadow rounded-lg md:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">
            Bem-vindo ao Sistema de Gerenciamento de Vagas!
          </h1>
          <p className="text-text-light dark:text-text-dark">
            Este sistema permite que você gerencie suas candidaturas a empregos
            de forma eficaz, organizando suas vagas por status e data de
            aplicação.
          </p>
        </div>

        <div className="p-4 dark:bg-background-dark rounded-lg md:w-1/2">
          <div className="flex flex-col w-full">
            {isRegistering ? (
              <RegisterForm toggleForm={toggleForm} />
            ) : (
              <LoginForm toggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
