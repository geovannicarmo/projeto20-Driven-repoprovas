export function errorTypeToStatusCode(type: AppErrorTypes) {
    if (type === "conflict") return 409;
    if (type === "not_found") return 404;
    if (type === "unauthorized") return 401;
    if (type === "wrong_schema") return 422;
    if (type === "internal-server-eror") return 500;
    
    return 400;
  }

export function conflictError(message?: string):AppError{

    return { type: "conflict", message }
}

export function notFoundError(message?: string): AppError {
    return { type: "not_found", message };
  }
  
  export function unauthorizedError(message?: string): AppError {
    return { type: "unauthorized", message };
  }
  
  export function wrongSchemaError(message?: string): AppError {
    return { type: "wrong_schema", message };
  }

  export function internalServerError(message?: string): AppError {
    return { type: "internal-server-eror", message };
  }


type AppErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema" | "internal-server-eror";

export interface AppError {
    type: AppErrorTypes;
    message: string | undefined;
  }