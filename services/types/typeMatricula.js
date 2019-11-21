
const GET_ALUMNO = `
    {
        getAlumnos{
            data {
                cod_alumno
                txt_nombre_completo
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


module.exports = { GET_ALUMNO, GET_ACTA_NOTAS }