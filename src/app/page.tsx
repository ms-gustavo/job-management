"use client";

import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const HomePage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mb-8 md:mr-8 p-4 bg-white shadow rounded-lg md:w-1/2 md:flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Bem-vindo ao Sistema de Gerenciamento de Vagas!
        </h1>
        <p className="text-gray-600">
          Este sistema permite que você gerencie suas candidaturas a empregos de
          forma eficaz, organizando suas vagas por status e data de aplicação.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
          velit suscipit ipsum quam minus id illum eaque voluptas reprehenderit
          pariatur! Optio, quod neque? Inventore quam eos mollitia iure atque
          beatae pariatur maiores doloremque! Aut numquam et mollitia ab,
          deleniti, ut officia obcaecati explicabo quisquam ipsum culpa
          consectetur iste fuga iusto ea voluptate. Mollitia accusantium
          distinctio aliquid quam earum alias provident libero magnam eos quis!
          Delectus hic atque quas natus quisquam ad est fuga, consequatur
          provident eligendi debitis vero placeat deserunt! lorem800
        </p>
      </div>

      <div className="p-4 bg-white shadow rounded-lg md:w-1/2">
        <div className="flex flex-col w-full">
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
