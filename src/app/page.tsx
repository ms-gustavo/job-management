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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <ThemeToggle />
      <div className="flex flex-col md:flex-row mb-8 w-full">
        <div className="p-4 bg-background-light dark:bg-background-dark shadow rounded-lg md:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">
            Bem-vindo ao Sistema de Gerenciamento de Vagas!
          </h1>
          <p className="text-text-light dark:text-text-dark">
            Essa ferramenta simplifica o controle das suas oportunidades de
            emprego, permitindo que você registre novas vagas, visualize e
            gerencie suas candidaturas com facilidade. Com uma interface
            intuitiva, você pode editar o status das vagas diretamente, filtrar
            e ordenar por status ou data de aplicação, e navegar entre as opções
            de maneira fluida. Adaptada para todos os dispositivos, a plataforma
            oferece uma experiência de usuário eficiente e agradável, ajudando
            você a manter suas oportunidades organizadas e sob controle.
          </p>
        </div>

        <div className="flex flex-col w-full p-4 rounded-lg md:w-1/2">
          {isRegistering ? (
            <RegisterForm toggleForm={toggleForm} />
          ) : (
            <LoginForm toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
