export function client(endpoint: string, customConfig?: any, applyData?: any) {
  const headers = { "content-type": "application/json" };
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
  console.log(config);
  return window
    .fetch(`${process.env.NEXT_PUBLIC_URL}/api/${endpoint}`, config)
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        applyData(data);
      } else {
        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
      }
    });
}
