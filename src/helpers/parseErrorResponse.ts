import { ERROR_KEY } from "@/constants";

export function parseErrorResponse(message: string) {
  return { [ERROR_KEY]: message };
}
