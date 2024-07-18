import React from "react";
import { JobListProps } from "@/interfaces/interfaces";
import { getStatusColor } from "@/utils/getStatusColor";

const JobList: React.FC<JobListProps> = ({ jobs, onDelete }) => {
  return (
    <div>
      {jobs.length === 0 && (
        <div className="flex items-center justify-center min-h-[150px]">
          <h2 className="text-lg font-bold text-center">
            Não há vagas cadastradas
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col"
          >
            <h3 className="font-bold mb-2">{job.title}</h3>
            <p className="mb-2">Empresa: {job.company}</p>
            <p className={`mb-2 ${getStatusColor(job.status)}`}>
              Status: {job.status}
            </p>
            <p className="mb-2">
              Data de Aplicação: {new Date(job.appliedAt).toLocaleDateString()}
            </p>
            <p className="mb-2">Site: {job.site}</p>
            <button
              onClick={() => job.id && onDelete(job.id)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
