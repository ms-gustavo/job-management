import { UserActionsProps } from "@/interfaces/interfaces";
import React from "react";

const UserActions: React.FC<UserActionsProps> = ({
  handleLogout,
  toggleJobForm,
  toggleJobList,
}) => {
  return (
    <>
      <button
        onClick={toggleJobForm}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Registrar Nova Vaga
      </button>
      <button
        onClick={toggleJobList}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Listar Vagas
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Logout
      </button>
    </>
  );
};

export default UserActions;
