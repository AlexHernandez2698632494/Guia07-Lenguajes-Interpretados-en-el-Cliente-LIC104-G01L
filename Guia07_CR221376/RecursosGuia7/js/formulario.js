//Accediendo a los elementos html const 
inputNombre = document.getElementById("idTxtNombre");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputApellido = document.getElementById("idTxtApellido");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonActualizarPaciente=document.getElementById("idBtnActualizar");//editar los pacientes
const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");
const notificacion = document.getElementById("idNotificacion"); // Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");
//Componente modal
const idModal = document.getElementById("idModal");
//Arreglo global de pacientes
let arrayPaciente = [];
/*Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione el boton limpian del formulario = */
const limpiarForm = () => {
    inputNombre.value = ""; inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = inputNombrePais.value
    inputNombre.focus();
};

//Funcion para validar el ingreso del paciente
const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked ==
        true
        ? "Hombre" : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;
    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" && pais != 0 &&
        direccion != "") {
        //Agregando informacion al arreglo paciente 
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Se ha registrado un nuevo paciente"; //Llamando al componente de Bootstrap
        toast.show();
        //Limpiando formulario
        limpiarForm();
    } else {
        //Asignando un mensaje a nuestra notificacion mensaje.innerHTML = "Faltan campos por completar"; //Llamando al componente de Bootstrap
        toast.show();
    }
};
//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element,indice) => {
        $fila += `<tr> <td scope="row" class="text-center fw-bold">${contador}</td>
<td>${element[0]}</td>
<td>${element[1]}</td>
<td>${element[2]}</td>
<td>${element[3]}</td>
<td>${element[4]}</td>
<td>${element[5]}</td>
<td>
                <button type="button" class="btn btn-primary" data-id="${indice}" onclick="editarPaciente(${indice})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-danger" data-id="${indice}" onclick="eliminarPaciente(${indice})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
<table class="table table-striped table-hover table-bordered">
<tr>
<th scope="col" class="text-center" style="width:5%">#</th>
<th scope="col" class="text-center" style="width: 15%">Nombre</th> 
<th scope="col" class="text-center" style="width: 15%">Apellido</th>
<th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th> 
<th scope="col" class="text-center" style="width:10%">Sexo</th>
<th scope="col" class="text-center" style="width:10%">Pais</th> 
<th scope="col" class="text-center" style="width: 25%">Dirección</th>
<th scope="col" class="text-center" style="width: 10%">Opciones</th>
</tr>
${imprimirFilas()}
</table>
</div>`;
    document.getElementById("idTablaPacientes").innerHTML = $table;
};
// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;
    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificacion 
        mensaje.innerHTML = "Pais agregado correctamente"; //Liamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar"; //Llamando al componente de Bootstrap
        toast.show();
    }
};
// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};
buttonAgregarPaciente.onclick = () => {
    addPaciente();
};
buttonMostrarPaciente.onclick = () => { imprimirPacientes(); };
buttonAgregarPais.onclick = () => { addPais(); };
// Se agrega el focus en el campo nombre pais del modal 
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});
//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();
//editar pacientes y eliminar
const editarPaciente = (indice) => {
    const paciente = arrayPaciente[indice];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
        inputRdFemenino.checked = false;
    } else {
        inputRdMasculino.checked = false;
        inputRdFemenino.checked = true;
    }
    cmbPais.value = paciente[4];
    inputDireccion.value = paciente[5];
    arrayPaciente.splice(indice, 1);
    imprimirPacientes();
};

// Función para eliminar un paciente
const eliminarPaciente = (indice) => {
    const paciente = arrayPaciente[indice];
    // Aquí puedes agregar código para enviar una confirmación al usuario, por ejemplo, usando window.confirm
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar a ${paciente[0]} ${paciente[1]}?`);
    if (confirmacion) {
        arrayPaciente.splice(indice, 1);
        imprimirPacientes();
    }
};

let indiceEditando = undefined;

// Función para añadir o editar un paciente
const updatePaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked ? "Hombre" : inputRdFemenino.checked ? "Mujer" : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (nombre != "" && apellido != "" && fechaNacimiento != "" && sexo != "" && pais != 0 && direccion != "") {
        // Si se está editando un paciente existente
        if (indiceEditando !== undefined) {
            arrayPaciente[indiceEditando] = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];
            // Limpiamos el índice de edición
            indiceEditando = undefined;
        } else {
            // Si no se está editando, agregamos un nuevo paciente al array
            arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);
        }

        // Restauramos el formulario y mostramos la notificación
        limpiarForm();
        mensaje.innerHTML = "Se han actualizado los datos del paciente existente";
        toast.show();
        // Actualizamos la tabla de pacientes
        imprimirPacientes();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

