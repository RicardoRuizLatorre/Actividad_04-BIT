var listaDeDatos = [];

var cargarDatos = function (){
    datos = JSON.parse(localStorage.getItem('listaDeDatos'));
    if (listaDeDatos == null){
        listaDeDatos = [];

    }
}


var borrarListaDeDatos = function(){
    datos=[];
    localStorage.removeItem('listaDeDatos');
}

var mostrarListaDeDatos = function (){

    
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

var Guardar = function(){
    var cedula = document.getElementById('idCedula').value;
    var nombre = document.getElementById('idNombre').value;
    var apellido = document.getElementById('idApellido').value;
    var fechaNacimiento = document.getElementById('idFechaNacimiento').value;
    var genMasculino = document.querySelector('#idGeneroMasculino');
    var genFemenino = document.querySelector('#idGeneroFemenino');
    console.log("genMasculino"+genMasculino);
    console.log("genFemenino"+genFemenino);
    var genero = validarCheckedGenero(genMasculino,genMasculino);

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

}


var validarCedula = function (persona, cedula){

    var posicion = listaDeDatos.findIndex((intem) => intem.cedula == cedula)

    if (posicion == -1 ){
        listaDeDatos.push(persona);
        localStorage.setItem('listaDeDatos', JSON.stringify(persona))
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

var validarCheckedGenero = function (genMasculino, genFemenino){
    if (genMasculino.checked){
        console.log("Entro a masculino");
        return 'Masculino';
    }

    if (genFemenino.checked){
        console.log("Entro a Femenino");
        return 'Femenino';
    }
}

