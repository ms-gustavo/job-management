export const fetchData = async (
  endpoint: string,
  method: string,
  data?: string,
  additionalHeaders?: Record<string, string>
) => {
  const options: RequestInit = {
    method: method,
    headers: { "Content-type": "application/json", ...additionalHeaders },
  };

  if (method !== "GET" && data) {
    options.body = data;
  }

  const response = await fetch(endpoint, options);

  return response;
};
