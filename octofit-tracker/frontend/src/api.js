const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim() || '';

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const getApiUrl = (resource) => {
  const apiBaseUrl = getApiBaseUrl();
  return `${apiBaseUrl}/api/${resource}/`;
};

export const fetchJson = async (resource) => {
  const response = await fetch(getApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}`);
  }

  const payload = await response.json();

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && payload.data && Array.isArray(payload.data.data)) {
    return payload.data.data;
  }

  if (payload && Array.isArray(payload)) {
    return payload;
  }

  return payload?.data ?? [];
};
