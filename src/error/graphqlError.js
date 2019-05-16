class GraphQLError extends Error {
  constructor(message) {
    super(message);
    this.name = "GraphQLError";
  }
}