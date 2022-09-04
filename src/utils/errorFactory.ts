function notFoundError(entity: string) {
  return {
		type: "error_not_found",
		message: `Não foi possível encontrar ${entity}.`
	};
}

function conflictError(message: string) {
  return {
    type: "error_conflict",
    message,
  }
}

export {notFoundError, conflictError};