"use strict";

const Route = use('Route');
const GraphqlAdonis = use('ApolloServer');
const schema = require('../app/Graphql/schema');
const { client } = require('gql-request-node');
const gql = require('gql-tag');

// api de graphql
Route.route('/graphql', ({ request, auth, response }) => {
    return GraphqlAdonis.graphql({
    schema,
    context: { auth }
    }, request, response)
}, ['GET', 'POST'])

// api de interacion de graphql
Route.get('/graphiql', ({ request, response }) => {
    return GraphqlAdonis.graphiql({ endpointURL: '/graphql' }, request, response)
})


Route.get('/', async function() {
    return { message: 'Sistema de Tutoria' };
});


// api para genera reportes den pdf
Route.group(() => {

    Route.get('/constancia/:tutoriado_id', 'ReportController.constancia');
    Route.get('/plan_accion/:id', 'ReportController.plan_accion');
    Route.get('/ficha_tutoria/:id', 'ReportController.ficha_tutoria');

}).prefix('reports');