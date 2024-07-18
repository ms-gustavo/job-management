export const getStatusColor = (status: string) => {
  console.log("STATUS>>>>>", status); // Para depuração
  switch (status) {
    case "Aprovado":
      return "text-green-600";
    case "Reprovado":
      return "text-red-600";
    default:
      return "text-black dark:text-white";
  }
};
