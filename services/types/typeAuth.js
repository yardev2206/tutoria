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

module.exports = {
    GET_PERSONA
};