const gqlRequest = require('gql-request-node');

module.exports = {
    matricula: (config = { query, variables}) => gqlRequest.client('http://localhost:4444/graphql', config),
    auth: (config = { query, variables}) => gqlRequest.client('http://167.172.246.241:3333/graphql', config),
};