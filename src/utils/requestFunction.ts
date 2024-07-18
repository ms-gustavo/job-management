export const fetchData = async (
  endpoint: string,
  method: string,
  data?: string,
  additionalHeaders?: Record<string, string>,
  queryParams?: Record<string, string>
) => {
  let url = endpoint;
  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += `?${queryString}`;
  }

  const options: RequestInit = {
    method: method,
    headers: { "Content-type": "application/json", ...additionalHeaders },
  };

  if (method !== "GET" && data) {
    options.body = data;
  }

  const response = await fetch(url, options);

  return response;
};
