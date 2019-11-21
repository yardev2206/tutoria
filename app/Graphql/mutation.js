// importar resolvers
const TutoriadoResolver = require('./Resolvers/TutoriadoResolver');

// registrar la mutaciones de la aplicacion
module.exports = {
    creatutoriadosAll: TutoriadoResolver.creatutoriadosAll,
}