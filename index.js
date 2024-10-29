
var listaDeDatos = [];

var cargarDatos = function (){
    /*getStorage de que archivo se quieren sacar los datos  */
    /* JSON.parse(localStorage.getItem convierte  texto array */
    console.log('Entra a funcion carga datos')
    listaDeDatos = JSON.parse(localStorage.getItem("listaDeDatosLS")); 
    if (listaDeDatos == null){
        listaDeDatos = [];
        console.log('Sin datos');
    }
    mostrarListaDeDatos();
}

var borrarListaDeDatos = function(){
    datos=[]; /*rescribe la variable en blanco */
    localStorage.removeItem('listaDeDatos'); /* porra del local storage */
}

var mostrarListaDeDatos = function (){
    console.log('Entra a la funcion mostrar lista');
    for (let index = 0; index < listaDeDatos.length; index++) {
        const element = listaDeDatos[index];
        console.log('Cedula: '+element.cedula+'|| Nombre: '+element.nombre+ '|| Apellido: '+element.apellido+ '|| Fecha de Nacimiento: ' +element.fechaNacimiento+ '|| Genero: '+element.genero)
    }
}

var borrarPorCedula = function (){
    var cedulaAEliminar = document.getElementById('buscarcedula').value;
    console.log(cedulaAEliminar);
    var pos = listaDeDatos.findIndex((intem) => intem.cedula == cedulaAEliminar);

    if(pos == -1){
        Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: "Cedula no existe"
          });

    }else{
        listaDeDatos.splice(pos,1);
        //Actualiza la lista
        localStorage.setItem('listaDeDatos', JSON.stringify(listaDeDatos)) 
    }

}

/*Funcion para guardar la persona*/
var Guardar = function(){
    var cedula = document.getElementById('idCedula').value;
    var nombre = document.getElementById('idNombre').value;
    var apellido = document.getElementById('idApellido').value;
    var fechaNacimiento = document.getElementById('idFechaNacimiento').value;
    var genMasculino = document.querySelector('#idGeneroMasculino');
    var genFemenino = document.querySelector('#idGeneroFemenino');

    var genero = validarCheckedGenero(genMasculino,genFemenino);

    var persona = {
        cedula:cedula,
        nombre:nombre,
        apellido:apellido,
        fechadeNacimiento:fechaNacimiento,
        genero:genero
    }

    console.log("El usuario ingresa los siguientes datos:");
    console.log("Cedula: "+persona.cedula+' // Nombre:'+ persona.nombre+ " // Apellido: "+ persona.apellido );
    console.log("Fecha de naciniento: "+ persona.fechadeNacimiento+' // Genero:'+ persona.genero);

    validarCedula(persona, cedula);
    console.log(listaDeDatos);
    cargarDatos();

}


var validarCedula = function (persona, cedula){

    var posicion = listaDeDatos.findIndex((intem) => intem.cedula == cedula)

    if (posicion == -1 ){
        listaDeDatos.push(persona);
        localStorage.setItem('listaDeDatosLS', JSON.stringify(listaDeDatos)) /* Guarda con persistencia el persona en la lista de datos  JSON.stringify(persona) vpnvierte array en cadena de texto*/
        console.log("Usuario guardado con exito")
        
        Swal.fire({
            icon: "success",
            title: "Usuario guardado",
            text: "Se guardo su cedula correctamente"
          });

    }else{
        console.log("***Error: !El numero de cedula ya existe!***")
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La cedula ya existe"
          });
    }
}

/*Valida que opcion de radio genero selecciona el paciente */
var validarCheckedGenero = function (genMasculino, genFemenino){
    if (genMasculino.checked){
        console.log("***Selecciono Masculino***");
        return 'Masculino';
    }else if (genFemenino.checked){
        console.log("***Selecciono Femenino***");
        return 'Femenino';
    }else{
        console.log("***Sin seleccionar***");
    }
}

var BuscarCedula = function() { 
    var cedulaBuscar=0;
    var cedulaBuscar= document.getElementById('idCedulaBuscar').value;
    var posicion = listaDeDatos.findIndex((intem) => intem.cedula == cedulaBuscar);
    console.log('Posicion ='+ posicion+' Cedula= '+cedulaBuscar);

   if(posicion == -1){
        console.log("***Cedula no encontrada***")
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La cedula no encontrada"
          });   
    }else {
        Swal.fire({
           // icon: "success",
            title: `Datos de la cedula ${listaDeDatos[posicion].cedula}`,
            text: `${listaDeDatos[posicion].nombre}  ${listaDeDatos[posicion].apellido} nacio en ${listaDeDatos[posicion].fechadeNacimiento}\n
             de genero ${listaDeDatos[posicion].genero}`
        });
    }
 
  
}
/*Funcion para buscar y borrar por cedula*/
var buscaryBorrarporCedula = function(){
    console.log('Entra a funcion buscar y borrar');
    var cedulaAEliminar = document.getElementById('buscarcedula').value;
    var pos = listaDeDatos.findIndex((item) => item.cedula == cedulaAEliminar)

    if (pos == -1){
        console.log('Cedula no existe')
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La cedula no encontrada"
          });
    }else {
        /*borrado del array*/
        listaDeDatos.splice(pos,1);
        /**Sincroniza el local storage con el nuevo cambio */
        localStorage.setItem('listaDeDatos', JSON.stringify(listaDeDatos));
        console.log('Usuario borrado')
        Swal.fire({
            icon: "success",
            title: "Usuario borrado",
            text: "Se se elimino cedula"
        });

    }
}
cargarDatos();

