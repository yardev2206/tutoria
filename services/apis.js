const gqlRequest = require('gql-request-node');

module.exports = {
    matricula: (config = { query, variables}) => gqlRequest.client('http://181.176.160.73:4444/graphql', config),
    auth: (config = { query, variables}) => gqlRequest.client('http://167.172.246.241:3333/graphql', config),
};