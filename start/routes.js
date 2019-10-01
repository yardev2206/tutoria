"use strict";

const Route = use('Route')
const GraphqlAdonis = use('ApolloServer')
const schema = require('../app/Graphql/schema')

Route.route('/graphql', ({ request, auth, response }) => {
    return GraphqlAdonis.graphql({
    schema,
    context: { auth }
    }, request, response)
}, ['GET', 'POST'])

Route.get('/graphiql', ({ request, response }) => {
    return GraphqlAdonis.graphiql({ endpointURL: '/graphql' }, request, response)
})


Route.get('/', async function() {

    const Alumno = use('App/Models/Alumno');
    const alumnos = await Alumno.first();

    return alumnos.toJSON();
});