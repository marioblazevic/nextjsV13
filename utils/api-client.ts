export function client(endpoint: string, customConfig?: any, applyData?: any) {
  
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: customConfig?.body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig?.headers,
    },
  };

  if (customConfig?.body) {
    config.body = JSON.stringify(customConfig.body);
  }
  
  return fetch(`${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      if (applyData) return applyData(data);
      return data;
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}
