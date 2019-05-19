class GraphQLError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'GraphQLError';
    this.code = code;
  }
}

export default GraphQLError;
