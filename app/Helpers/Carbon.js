'use strict';

class Carbon {


    static date = async () => {
        let fecha = new Date().toLocaleDateString();
        let parse = fecha.split('-');
        let payload = [];
        let newDate = await parse.filter(obj => {
            let newObj = obj.length < 2 ? `0${obj}` : obj;
            payload.push(newObj);
        });
        // response
        return payload.join('-');
    }


}


module.exports = Carbon;