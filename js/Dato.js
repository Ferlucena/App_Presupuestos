console.log('Dato inicializada...');
class Dato{
    constructor(descripcion, valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }
    //Getters
    get descripcion(){
        return this._descripcion;
    }
    get valor(){
        return this._valor;
    }
    //Setters
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }
    set valor(valor){
        this._valor = valor;
    }
    
}