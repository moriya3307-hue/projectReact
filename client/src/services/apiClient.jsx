const BASE_URL = "http://localhost:3001";

export async function request(path, { method = "GET", body } = {}) {
  const options = { method };

  if (body !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`שגיאת שרת (${res.status})`);

  return res.json();
}

export function createResourceApi(resource) {
  return {
    getList: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(query ? `/${resource}?${query}` : `/${resource}`);
    },

    getById: (id) => request(`/${resource}/${id}`),

    create: (data) => request(`/${resource}`, { method: "POST", body: data }),

    patch: (id, changes) =>
      request(`/${resource}/${id}`, { method: "PATCH", body: changes }),

    remove: (id) => request(`/${resource}/${id}`, { method: "DELETE" }),
  };
}
