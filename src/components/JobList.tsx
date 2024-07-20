import React, { useEffect, useState } from "react";
import { JobListProps } from "@/interfaces/interfaces";
import { FaPen } from "react-icons/fa";

const JobList: React.FC<JobListProps> = ({
  jobs,
  onDelete,
  onUpdateStatus,
}) => {
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm === "") {
        setFilteredJobs(jobs);
      } else {
        const filtered = jobs.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, jobs]);

  const handleEditClick = (jobId: string, currentStatus: string) => {
    setEditingJobId(jobId);
    setUpdatedStatus(currentStatus);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdatedStatus(e.target.value);
  };

  const handleStatusUpdate = (jobId: string, status: string) => {
    onUpdateStatus(jobId, status);
    setEditingJobId(null);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    } else if (sortOption === "date") {
      return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
    }
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "text-green-600";
      case "Reprovado":
        return "text-red-600";
      default:
        return "text-black dark:text-white";
    }
  };

  return (
    <div>
      {sortedJobs.length === 0 && (
        <div
          id="no-job-registered"
          className="flex items-center justify-center min-h-[150px]"
        >
          <h2 className="text-lg font-bold text-center">
            Não há vagas cadastradas
          </h2>
        </div>
      )}

      {jobs.length > 0 && (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por título..."
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <div id="sort-jobs-container" className="flex justify-center mb-4">
            <div className="m-2">
              <button
                id="order-by-status-button"
                onClick={() => handleSortChange("status")}
                className={`${
                  sortOption === "status"
                    ? "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
                    : "bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600"
                } text-white font-bold py-2 px-4 rounded transition duration-300 mr-2`}
              >
                Ordenar por Status
              </button>
            </div>
            <div className="m-2">
              <button
                id="order-by-date-button"
                onClick={() => handleSortChange("date")}
                className={`${
                  sortOption === "date"
                    ? "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
                    : "bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600"
                } text-white font-bold py-2 px-4 rounded transition duration-300`}
              >
                Ordenar por Data de Aplicação
              </button>
            </div>
          </div>
          <div
            id="new-job-container"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {sortedJobs.map((job, index: number) => (
              <div
                id={`new-job-${index}`}
                key={job.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col"
              >
                <h3 id={`new-job-title-${index}`} className="font-bold mb-2">
                  {job.title}
                </h3>
                <p id={`new-job-company-${index}`} className="mb-2">
                  Empresa: {job.company}
                </p>
                <div
                  id={`new-job-select-container-${index}`}
                  className="flex items-center mb-2"
                >
                  {editingJobId === job.id ? (
                    <div
                      id={`editing-job-container-${index}`}
                      className="flex items-center"
                    >
                      <select
                        id={`editing-job-status-${index}`}
                        value={updatedStatus}
                        onChange={handleStatusChange}
                        onBlur={() =>
                          handleStatusUpdate(job.id!, updatedStatus)
                        }
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                      >
                        <option value="Análise">Análise</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Reprovado">Reprovado</option>
                      </select>
                    </div>
                  ) : (
                    <span className="flex items-center">
                      <span
                        id={`new-job-status-${index}`}
                        className={`mb-2 ${getStatusColor(job.status)}`}
                      >
                        Status: {job.status}
                      </span>
                      <FaPen
                        id={`new-job-pencil-icon-${index}`}
                        onClick={() => handleEditClick(job.id!, job.status)}
                        className="ml-2 text-blue-600 cursor-pointer hover:text-blue-700"
                      />
                    </span>
                  )}
                </div>
                <p id={`new-job-application-${index}`} className="mb-2">
                  Data de Aplicação:{" "}
                  {new Date(job.appliedAt).toLocaleDateString()}
                </p>
                <p id={`new-job-site-${index}`} className="mb-2">
                  Site: {job.site}
                </p>
                <button
                  id={`new-job-remove-button-${index}`}
                  onClick={() => job.id && onDelete(job.id)}
                  className="mt-2 bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default JobList;
