// importar resolvers
const TutoriadoResolver = require('./Resolvers/TutoriadoResolver');
const PlanAccionResolver = require('./Resolvers/PlanAccionResolver');
const ActividadResolver = require('./Resolvers/ActividadResolver');

// registrar la mutaciones de la aplicacion
module.exports = {
    creatutoriadosAll: TutoriadoResolver.creatutoriadosAll,
    createPlanAccion: PlanAccionResolver.createPlanAccion,
    createActividad: ActividadResolver.createActividad,
}