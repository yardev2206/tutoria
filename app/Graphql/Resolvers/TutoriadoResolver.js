'use strict';

const Tutoriado = use('App/Models/Tutoriado')
const Tutor = use('App/Models/Tutor')
const { GET_ALUMNO, GET_ACTA_NOTAS } = require('../../../services/types/typeMatricula');
const { matricula } = require('../../../services/apis');

class TutoriadoResolver {

    
    async addTutoriados (root, { cod_docente, page = 1, like = '' } ){

        let alumnos = [];
        let payload = [];

        await matricula({ query: GET_ACTA_NOTAS, variables: { docente: cod_docente, page, like } })
        .then(async res => {
            let { getActaNotas } = res.data;
            // obtenemos el array de estudiantes del super SIGA
            alumnos = getActaNotas.data;
            // obtenemos a los tutoriados del docente
            let tutoriados = await Tutoriado.query()
                .where('docente_id', cod_docente)
                .fetch(); 
            // parseamos a JSON
            tutoriados = await tutoriados.toJSON();
            // filtrar a los alumnos que tienen tutor
            await alumnos.filter(obj => {
                let exist = tutoriados.filter(tu => {
                    return tu.alumno_id == obj.alumno.COD_ALUMNO;
                }).length;
                // retornamos a los alumnos que no existen
                if (!exist) return payload.push(obj.alumno);
            });
        }).catch(err => console.log(err));

        return payload;
    }


    async getTutoriados(root, { page, like, order = 'ASC' } ) {
        let tutoriados = Tutoriado.query()
            .orderBy('persona_id', order);
        // realizar filtrado
        if (like) tutoriados = tutoriados.where('persona_id', 'like', `%${like}%`)
            .orWhere('alumno_id', 'like', `%${like}%`)
            .orWhere('tutor_id', 'like', `%${like}%`)
            .orWhere('periodo_id', 'like', `%${like}%`)
        // paginar
        tutoriados = await tutoriados.paginate(page, 30);
        // devolver tutoriados en tutoriados
        return tutoriados.toJSON();
    }


    async creatutoriadosAll(root, { cod_docente, periodo, input }) {
        try {
            // payload
            let payload = [];
            // verificar si el docente ya es un tutor
            let tutor = await Tutor.query()
                .where('docente_id', cod_docente)
                .where('periodo_id', periodo)
                .first();
            // crear si el docente no es un tutor
            if (!tutor) tutor = await Tutor.create({
                persona_id: cod_docente, 
                docente_id: cod_docente,
                carrera_id: "1210",
                facultad_id: "12",
                periodo_id: periodo
            })
            // verificamos si no se obtuvo al tutor
            if (!tutor) throw new Error('El docente no está asignado!');
            // obtenemos a todos los tutoriados del docente
            let tutoriados = await Tutoriado.query()
                .where('docente_id', cod_docente)
                .where('periodo_id', periodo)
                .fetch()
            // serializar
            tutoriados = await tutoriados.toJSON();
            tutor = tutor.toJSON();
            // preparamos el payload
            await input.filter(async alum => {
                let existe = await tutoriados.filter(tu => alum.alumno_id == tu.alumno_id).length;
                if (!existe) {
                    payload.push({
                        persona_id: alum.persona_id,
                        alumno_id: alum.alumno_id,
                        tutor_id: tutor.id,
                        docente_id: cod_docente,
                        periodo_id: periodo
                    });
                }
            })
            // almacenamos a los tutoriados
            Tutoriado.createMany(payload);
            // response
            return {
                success: true, 
                code: "201", 
                message: "Se asígno los tutoriados al docente!"
            }
        } catch (error) {
            return {
                success: false,
                code: "501",
                message: error.message
            }
        }
    }

}

module.exports = new TutoriadoResolver;