'use strict';

const Tutor = use('App/Models/Tutor');

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

}

module.exports = new TutorResolver;