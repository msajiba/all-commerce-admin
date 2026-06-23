/**
 * Server-side client for the Super Admin versioned API (`/api/v1`). Every call
 * runs on the admin server (never the browser), using the non-public
 * `SUPER_ADMIN_API` base URL.
 */

const API_BASE =
  process.env.SUPER_ADMIN_API ?? "http://localhost:5002/api/v1";

export type AuthUser = { id: string; name: string; email: string };

export type StoreSettings = { primaryColor: string; font: string };

export type StoreSummary = {
  id: string;
  subdomain: string;
  name: string;
  theme: string;
  settings: StoreSettings;
  createdAt: string;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string };

async function request<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<ApiResult<T>> {
  const { token, headers, ...rest } = init;

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch {
    return {
      ok: false,
      status: 0,
      error: "Cannot reach the server. Please try again.",
    };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const error =
      body && typeof body === "object" && "error" in body
        ? String((body as { error: unknown }).error)
        : "Request failed.";
    return { ok: false, status: response.status, error };
  }

  return { ok: true, data: body as T };
}

export function signUp(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResult<{ token: string; user: AuthUser }>> {
  return request("/auth/signup", { method: "POST", body: JSON.stringify(body) });
}

export function signIn(body: {
  email: string;
  password: string;
}): Promise<ApiResult<{ token: string; user: AuthUser }>> {
  return request("/auth/signin", { method: "POST", body: JSON.stringify(body) });
}

export function fetchMe(
  token: string,
): Promise<
  ApiResult<{ user: AuthUser & { createdAt: string }; stores: StoreSummary[] }>
> {
  return request("/auth/me", { token });
}

export function createStore(
  token: string,
  body: { subdomain: string; theme: string },
): Promise<ApiResult<{ store: StoreSummary }>> {
  return request("/stores", {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });
}

export function updateStore(
  token: string,
  subdomain: string,
  body: { theme: string },
): Promise<ApiResult<{ store: StoreSummary }>> {
  return request(`/stores/${encodeURIComponent(subdomain)}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(body),
  });
}
