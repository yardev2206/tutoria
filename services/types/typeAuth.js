const GET_PERSONA = `
    query findPersona($dni: ID!) {
        findPersona(id: $dni) {
            id
            nombre_completo
            direccion
            telefono
        }
    }
`


const GET_DATA_FICHA = `
    query getDataFicha($per_alumno: ID!){
        per_alumno: findPersona(id: $per_alumno) {
            nombre_completo
            numero_de_documento
            direccion
            telefono
        }
    }
`;

module.exports = {
    GET_PERSONA,
    GET_DATA_FICHA,
};