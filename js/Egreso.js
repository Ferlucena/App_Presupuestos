console.log('Egreso inicializada...');

class Egreso extends Dato{
    //DEFINO VARIABLES ESTATICAS DE LA CLASE
    static contadorEgresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.contadorEgresos;
    }
    //GETTERS
    get id(){
        return this._id;
    }
}


