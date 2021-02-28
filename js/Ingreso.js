console.log('Ingreso inicializada...');
class Ingreso extends Dato{
    //DEFINO VARIABLES ESTÁTICAS A LA CLASE
    static contadorIngresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.contadorIngresos;
    }

    //GETTERS
    get id(){
        return this._id;
    }
}