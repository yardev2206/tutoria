'use strict';

const Tutor = use('App/Models/Tutor');
const PlanAccion = use('App/Models/PlanAccion');

class TutorResolver {

    async getTutores(root, { order = 'ASC', like, page = 1 }) {
        let tutores = Tutor.query()
            .orderBy('periodo_id', order);
        // realizar filtro
        if (like) {
            tutores = tutores.where('persona_id', 'like', `%${like}%`)
                .where('docente_id', 'like', `%${like}%`)
                .where('carrera_id', 'like', `%${like}%`)
                .where('facultad_id', 'like', `%${like}%`)
                .where('periodo_id', 'like', `%${like}%`)
        }
        // recuperar relaciones
        tutores = tutores.with('tutoriados');
        // devolver array de tutores
        tutores = await tutores.paginate(page, 30);
        return tutores.toJSON();
    }

    
    async createTutor(root, args) {
        return await Tutor.create(args);
    }

    getPlanAccionTutor = async (root, { tutor_id, page = 1, like, order = 'ASC' }) => {
        let plan_acciones = await PlanAccion.query()
            .where('tutor_id', tutor_id)
            .paginate(page, 30)
        return plan_acciones.toJSON();
    }

}

module.exports = new TutorResolver;