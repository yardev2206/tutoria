// importar resolvers
const TutoriadoResolver = require('./Resolvers/TutoriadoResolver');
const PlanAccionResolver = require('./Resolvers/PlanAccionResolver');
const ActividadResolver = require('./Resolvers/ActividadResolver');
const AsistenciaResolver = require('./Resolvers/AsistenciaResolver');

// registrar las mutaciones de la aplicacion
module.exports = {
    creatutoriadosAll: TutoriadoResolver.creatutoriadosAll,
    createPlanAccion: PlanAccionResolver.createPlanAccion,
    createActividad: ActividadResolver.createActividad,
    createAsistenciasAll: AsistenciaResolver.createAsistenciasAll,
    markAsAsistencia: AsistenciaResolver.markAsAsistencia,
}
