interface Error {
  field: string;
  message: Array<any>;
}

export const serializeValidationError = (err: any[]) => {
  const invalid: Error[] = [];
  err.forEach(({ property, constraints }: any) => {
    invalid.push({ field: property, message: Object.values(constraints) });
  });
  return invalid;
};
