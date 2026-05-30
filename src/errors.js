export class CoqidError extends Error {
  constructor(code, message, hint, exitCode = 1) {
    super(message);
    this.name = "CoqidError";
    this.code = code;
    this.hint = hint;
    this.exitCode = exitCode;
  }
}

export function toPublicError(error) {
  if (error instanceof CoqidError) {
    return error;
  }

  return new CoqidError(
    "INTERNAL_ERROR",
    "Unexpected internal error.",
    "Re-run the command with a valid data file or report this failure.",
    2
  );
}
