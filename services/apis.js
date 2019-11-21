const gqlRequest = require('gql-request-node');

module.exports = {
    matricula: (config = { query, variables}) => gqlRequest.client('http://181.176.160.73:7777/graphql', config),
};