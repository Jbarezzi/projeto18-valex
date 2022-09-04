function notFoundError(entity: string) {
  return {
		type: "error_not_found",
		message: `Não foi possível encontrar ${entity}!`
	};
}

export {notFoundError};