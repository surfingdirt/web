// Describe schemas (not for the validation)
const typeDefs = `
  type Highlight {
    id: Int!
    name: String!
  }

  type Query {
    highlights: [Highlight]
  }
`;

export default typeDefs;
