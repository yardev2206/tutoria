'use stric'

const { makeExecutableSchema } = require('graphql-tools')
const { importSchema } = require('graphql-import')

// types
const Query = require('./query')
const Mutation = require('./mutation')

// configuracion de graphql
const typeDefs = importSchema(__dirname + '/Types/schema.graphql')
const resolvers = { 
    Query,
    Mutation,
}

// exportar el schema
module.exports = makeExecutableSchema({ typeDefs, resolvers });