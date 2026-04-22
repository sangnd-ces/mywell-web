export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    let body: { code?: string; message?: string; [k: string]: unknown } | undefined;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    return new ApiError(
      res.status,
      body?.code ?? `HTTP_${res.status}`,
      body?.message ?? res.statusText,
      body,
    );
  }
}
