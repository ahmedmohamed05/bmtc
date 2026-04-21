import env from "../config/env";

type ErrorType =
    | "json_parse_error"
    | "network_error"
    | "validation_error"
    | "unknown_error";

export type ApiResponse<T> =
    | {
        kind: "success";
        status: number;
        data: T | null;
    }
    | {
        kind: "api_error";
        status: number;
        message: string;
    }
    | {
        kind: "client_error";
        type: ErrorType;
        message: string;
    };

export default async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    const url = env.VITE_API_URL + endpoint;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
        const response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                ...options?.headers,
            },
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const { status } = response;

        if (!response.ok) {
            let errorMessage = "Error from API";

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (parseError) {
                    return {
                        kind: "client_error",
                        message: "Failed to parse error JSON: " + parseError,
                        type: "json_parse_error",
                    };
                }
            } else {
                errorMessage = `${status} ${response.statusText}`;
            }

            return {
                kind: "api_error",
                status,
                message: errorMessage,
            };
        }

        const contentLength = response.headers.get("content-length");
        if (response.status !== 204 && contentLength !== "0") {
            try {
                const data = (await response.json()) as T;
                return { kind: "success", data, status };
            } catch (parseError) {
                return {
                    kind: "client_error",
                    message: "Failed to parse response JSON: " + parseError,
                    type: "json_parse_error",
                };
            }
        }

        return { kind: "success", data: null as T, status };
    } catch (error) {
        // Network errors, CORS issues, etc.
        return {
            kind: "client_error",
            message:
                error instanceof Error ? error.message : "Network error occurred",
            type: "network_error",
        };
    }
}
