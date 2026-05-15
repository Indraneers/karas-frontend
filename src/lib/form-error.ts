import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { ApiError, toApiError } from "./api-error";

interface HandleFormErrorOptions {
  /** Override the toast title when falling back to a toast. */
  fallbackTitle?: string;
}

/**
 * Route an unknown error to either form-field errors or a sonner toast.
 *
 * - If the error carries per-field messages and a form is provided,
 *   each message is applied via `form.setError`.
 * - Otherwise the user-facing message is shown via sonner.
 *
 * The normalized {@link ApiError} is returned so callers can branch further
 * on `status` or `code` if they need to.
 */
export function handleFormError<T extends FieldValues>(
  error: unknown,
  form?: UseFormReturn<T>,
  options: HandleFormErrorOptions = {}
): ApiError {
  const apiError = toApiError(error);

  if (form && apiError.hasFieldErrors) {
    const unknownFields: string[] = [];
    for (const [field, message] of Object.entries(apiError.fieldErrors)) {
      const formField = field as Path<T>;
      try {
        form.setError(formField, { type: "server", message });
      }
      catch {
        unknownFields.push(`${ field }: ${ message }`);
      }
    }
    if (unknownFields.length > 0) {
      toast.error(apiError.message, { description: unknownFields.join("\n") });
    }
    return apiError;
  }

  toast.error(options.fallbackTitle ?? apiError.message, {
    description: options.fallbackTitle ? apiError.message : undefined
  });
  return apiError;
}
