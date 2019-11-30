// importacion de los resolvers
const TutoriadoResolver = require('./Resolvers/TutoriadoResolver');
const TutorResolver = require('./Resolvers/TutorResolver');
const ActividadResolver = require('./Resolvers/ActividadResolver');
const PlanAccionResolver = require('./Resolvers/PlanAccionResolver');
const AsistenciaResolver = require('./Resolvers/AsistenciaResolver');

// registrar las consultas de tu aplicacion
module.exports = {
    addTutoriados: TutoriadoResolver.addTutoriados,
    getTutores: TutorResolver.getTutores,
    getTutoriados: TutoriadoResolver.getTutoriados,
    getTutoriadosTutor: TutoriadoResolver.getTutoriadosTutor,
    getActividades: ActividadResolver.getActividades,
    getPlanAccionTutor: TutorResolver.getPlanAccionTutor,
    getActividadesPlanAccion: ActividadResolver.getActividadesPlanAccion,
    findActividad: ActividadResolver.findActividad,
}