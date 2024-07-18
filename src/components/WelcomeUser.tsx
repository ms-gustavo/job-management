import { User } from "@/interfaces/interfaces";
import React from "react";

const WelcomeUser: React.FC<User> = (userData: User) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Bem vindo, {userData.name}</h1>
      <p>
        Você tem {userData.jobs.length} vagas cadastradas. O que deseja fazer
        hoje?
      </p>
    </>
  );
};

export default WelcomeUser;
