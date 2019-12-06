
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



`;


module.exports = { 
    GET_ALUMNO, 
    GET_ACTA_NOTAS,
    FIND_DOCENTE,
}