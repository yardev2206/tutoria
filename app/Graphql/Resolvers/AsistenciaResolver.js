'use strict';

const Asistencia = use('App/Models/Asistencia');
const Actividad = use('App/Models/Actividad');
const Carbon = require('../../Helpers/Carbon');

class AsistenciaResolver {

    createAsistenciasAll = async (root, { actividad_id, collection = [] }) => {
        try {
            let actividad = await Actividad.find(actividad_id);
            // verificar actividad
            if (!actividad) throw new Error('La actividad no existe!');
            // crear asistencias
            let payload = [];
            await collection.filter(async obj => {
                await payload.push({
                    actividad_id: actividad.id,
                    plan_accion_id: actividad.plan_accion_id,
                    tutoriado_id: obj.tutoriado_id,
                    alumno_id: obj.alumno_id,
                    persona_id: obj.persona_id
                })
            });
            // guardar
            Asistencia.createMany(payload);
            // actualizar la actividad
            actividad.reunion = true;
            actividad.count_asistencias = actividad.count_asistencias + payload.length;
            await actividad.save();
            // response
            return { success: true, code: '201', message: 'Los registros se guardarón correctamente!' }
        } catch(error) {
            return { success: false, code: "501", message: error.message };
        }
    }


    markAsAsistencia = async (root, { asistencia_id }) => {
        try {
            let asistencia = await Asistencia.find(asistencia_id);
            // validamos aistencia
            if (! asistencia) throw new Error('La asistencia es incorrecta!');
            // obtenemos la actividad
            let actividad = await Actividad.find(asistencia.actividad_id);
            // validamos actividad
            if (! actividad) throw new Error('La actividad no existe');
            // validamos que aun no empieza la actividad
            let fecha_current = await Carbon.date();
            if (actividad.fecha != fecha_current) throw new Error("La actividad no está disponible");
            // marcar la asistencia
            asistencia.activo = asistencia.activo ? false : true;
            await asistencia.save();
            // response
            return { success: true, code: '201', message: 'La asistencia se actualizó correctamente!' }
        } catch (error) {
            return { success: false, code: '501', message: error.message };
        }
    }

}

module.exports = new AsistenciaResolver;