'use strict';

const Actividad = use('App/Models/Actividad');

class ActividadResolver {

    async getActividades(root, { page, like, order = 'ASC' }) {
        let actividades = Actividad.query()
            .orderBy('periodo_id', order);
        // filtrar
        if (like) actividades.where('periodo_id', 'like', `%${like}%`)
                .orWhere('descripcion', 'like', `%${like}%`)
                .orWhere('fecha_inicio', 'like', `%${like}%`)
                .orWhere('fecha_final', 'like', `%${like}%`);
        //  paginar actividades
        actividades = await actividades.paginate(page, 30);
        // revolver actividades en formato JSON
        return actividades.toJSON();
    }

}

module.exports = new ActividadResolver;