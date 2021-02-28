/**
 * En esta seccion definimos los arregos que manejarán los ingresos y egresos
 * de nuestra aplicación.
 * Al estar definidas fuera de cualquier función podrán ser accedidas desde cualquier 
 * función dentro de la aplicación.
 */

 //Defino un arreglo con varios elementos, los elementos serán los objetos Ingreso
 const ingresos = [
     new Ingreso('Sueldo', 85000.00),
     new Ingreso('Auto', 185000.00),
     new Ingreso('Otro Ingreso',49000)
 ];

 const egresos = [
     new Egreso('Servicio de Electrico', 3500.00),
     new Egreso('Agua', 2300.00),
     new Egreso('Telefonía móvil', 4500.00)
 ];

 //INICIALIZADOR DE FUNCIONES
 //Defino la función flecha que iniciará al cargar la página
 let cargarApp = () => {
     cargarCabecero();
     cargarIngresos();
     cargarEgresos()
 }; 
 //Defino una función que calcule el total de ingresos para mostrar en el cabecero
 //Para iterar elementos del arreglo como siempre utilizo for-of
 let totalIngresos = () => {
     let totalIngreso = 0;
     for(let ingreso of ingresos){
         totalIngreso += ingreso.valor;
     }
     return totalIngreso;
 };

 let totalEgresos = () => {
     let totalEgreso = 0
     for( egreso of egresos){
         totalEgreso += egreso.valor;
     }
     return totalEgreso;
 };

 //Defino la función cargarCabecero que será la encargada de actualizar los elementos html
 //Dentro de esta función defino los elementos que se irán sustituyendo
 let cargarCabecero = () => {
     let presupuesto = totalIngresos() - totalEgresos();
     let porcentajeEgreso = totalEgresos()/totalIngresos();

     document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
     document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
     document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
     document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
 };


 //Defino una función de internacionalización de monedas
const formatoMoneda = (valor)=>{
return valor.toLocaleString('es-AR',{style:'currency',currency:'ARS',minimumFractionDigits:2})
};

//Defino el formato de porcentaje
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-AR',{style:'percent',minimumFractionDigits:2})
};
//Defino la función cargar ingresos, recorreremos cada uno de los elementos con formato HTML del arreglo
const cargarIngresos = () =>{
    let ingresosHTML = '';
    for( let ingreso of ingresos){
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

//Defino la función para crear ingresos en HTML, quien recibe el objeto tipo ingreso
const crearIngresosHTML = (ingreso) =>{
    let ingresoHTML = `
      <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
          <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
          <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
              <ion-icon name="close-circle-outline"
              onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
          </div>
        </div>
      </div>
    `;
    return ingresoHTML;
};
//Defino el método de eliminar ingreso, utilizando una función flecha, findIndex con argumento de flecha simplificada y splice
const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1); // el indice a eliminar está dado por indiceEliminar y se indica 1 elemento a eliminar
    //RECARGO EL CABECERO Y LOS INGRESOS
    cargarCabecero();
    cargarIngresos();
};


//Defino la funcion para crear los egresos en HTML, idem al anterior
const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

//Defino la funcion que crea el elemento HTML de egresos
const crearEgresosHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return egresoHTML;
};

//Defino el método de eliminar egreso, utilizando una función flecha, findIndex con argumento de flecha simplificada y splice
const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1); // el indice a eliminar está dado por indiceEliminar y se indica 1 elemento a eliminar
    //RECARGO EL CABECERO Y LOS INGRESOS
    cargarCabecero();
    cargarEgresos();
};

//Defino la función para agregar dato
let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
           egresos.push( new Egreso(descripcion.value, +valor.value));
           cargarCabecero();
           cargarEgresos();
        }
    }
}