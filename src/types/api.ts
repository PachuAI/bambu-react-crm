// Tipos para responses de API
export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type ApiError = {
  error: string;
  message: string;
  statusCode: number;
};

// Ejemplo de tipo de dominio
export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
};