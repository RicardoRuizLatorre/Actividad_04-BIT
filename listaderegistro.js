var listaDeDatos = [];


var cargarDatos = function (){
    console.log('Entra a funcion carga datos')
    listaDeDatos = JSON.parse(localStorage.getItem("listaDeDatosLS")); 
    if (listaDeDatos == null){
        listaDeDatos = [];
        console.log('Sin datos');
    }


    var misDatos = document.getElementById('idLista');
    misDatos.innerHTML='' ;
    for (let a = 0; a < listaDeDatos.length; a++) {
        misDatos.innerHTML = misDatos.innerHTML + ` <tr>
                        <th>${a+1}</th>
                        <td>${listaDeDatos[a].nombre}</td>
                        <td>${listaDeDatos[a].apellido}</td>
                        <td>${listaDeDatos[a].cedula}</td>
                        <td>${listaDeDatos[a].fechadeNacimiento}</td>
                        <td>${listaDeDatos[a].genero}</td>
                        <td><div class="btn btn-danger" onclick="borrarPorCedula(${listaDeDatos[a].cedula})">Delete</div></td>
                      </tr>` 
       
    }
   
}

var borrarListaDeDatos = function(){
    datos=[]; /*rescribe la variable en blanco */
    localStorage.removeItem('listaDeDatosLS'); /* porra del local storage */
}

var borrarPorCedula = function (cedulaAEliminar){

    console.log('Cedula a eliminar'+cedulaAEliminar);
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
        localStorage.setItem('listaDeDatosLS', JSON.stringify(listaDeDatos)) 
        console.log('Usuario borrado')
        Swal.fire({
            icon: "success",
            title: "Usuario borrado",
            text: "Se se elimino cedula"
        });
    }

    cargarDatos();

}

cargarDatos();

