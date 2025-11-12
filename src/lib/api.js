export const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export async function api(path, { method = "GET", body, headers } = {}) {
  const isJson = body && typeof body === "object";
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": isJson ? "application/json" : undefined,
      ...(headers || {}),
    },
    body: isJson ? JSON.stringify(body) : body,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const getUser = () => {
  const raw = localStorage.getItem("lrn_user");
  return raw ? JSON.parse(raw) : null;
};
export const setUser = (u) => localStorage.setItem("lrn_user", JSON.stringify(u));
export const logout = () => localStorage.removeItem("lrn_user");
