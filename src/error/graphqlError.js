class GraphQLError extends Error {
  constructor(message, code, errors) {
    super(message);
    this.name = 'GraphQLError';
    this.code = code;
    this.errors = errors;
  }
}

export default GraphQLError;
