export const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovado":
      return "text-green-600";
    case "Reprovado":
      return "text-red-600";
    default:
      return "text-black dark:text-white";
  }
};
