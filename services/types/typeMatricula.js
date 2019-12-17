
const GET_ALUMNO = `
    {
        getAlumnos{
            data {
                COD_ALUMNO
                TXT_NOMBRE_COMPLETO
            }
        }
    }
`;


const GET_ACTA_NOTAS = `
    query getActaNotas($page: Int, $docente: String, $like: String) {
        getActaNotas(page: $page, input: { docente: $docente, like: $like }) {
            total
            lastPage
            perPage
            data {
                alumno {
                    COD_ALUMNO
                    TXT_NOMBRE_COMPLETO
                    COD_DOCUMENTO
                }
            }
        }
    }
`;


const FIND_DOCENTE = `
    query findDocente($dni: ID!){
        findDocente(id: $dni) {
            COD_DOCENTE
            TXT_APELLIDOS_NOMBRES
            TXT_PREFIJO
        }
    }
`;


const FICHA_TUTORIAL = `
    query fichaTutorial($id: String!, $cod: ID!, $docente_id: ID!) {
        avance: findAvanceCurricular(filters: [{key: "COD_ALUMNO", value: $id}]) {
            COD_ALUMNO
            NUM_PROM_APROB_PLAN_ACTUAL
            NUM_PROM_POND_PERIODO_ANT
            NUM_CRED_APROB_PLAN_ACTUAL
            NUM_CUR_INSC_PERIODO_ANT
        },
        alumno: findAlumno(id: $cod) {
            TXT_OBSERVACION
            COD_PERIODO
            COD_MODALIDAD_INGRESO
        },
  		docente:findDocente(id: $docente_id) {
            TXT_APELLIDOS_NOMBRES	
            TXT_PREFIJO
		}
    }
`;


module.exports = { 
    GET_ALUMNO, 
    GET_ACTA_NOTAS,
    FIND_DOCENTE,
    FICHA_TUTORIAL,
}