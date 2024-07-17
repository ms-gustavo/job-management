export const fetchData = async (
  endpoint: string,
  method: string,
  data: string
) => {
  const response = await fetch(endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: data,
  });

  return response;
};
