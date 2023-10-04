document.getElementById('btnAgregar').addEventListener('click', function() {
    var carnetRegex = /^[A-Z]{2}\d{3}$/;
    var nombreRegex = /^[A-Za-z\s]+$/;
    var duiRegex = /^\d{8}-\d$/;
    var nitRegex = /^\d{4}-\d{6}-\d{3}-\d$/;
    var fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    var correoRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/;

    var carnet = document.getElementById('txtCarnet').value;
    var nombre = document.getElementById('txtNombre').value;
    var dui = document.getElementById('txtDUI').value;
    var nit = document.getElementById('txtNIT').value;
    var fechaNacimiento = document.getElementById('txtFechaNacimiento').value;
    var correo = document.getElementById('txtCorreo').value;
    var edad = document.getElementById('txtEdad').value;

    // Función para validar y mostrar la notificación
    function validarYNotificar(regex, valor, mensaje) {
        if (regex.test(valor)) {
            return true;
        } else {
            alert(mensaje);
            return false;
        }
    }

    // Realizar la validación y mostrar notificaciones
    if (validarYNotificar(carnetRegex, carnet, 'Formato de carnet inválido') &&
        validarYNotificar(nombreRegex, nombre, 'Formato de nombre inválido') &&
        validarYNotificar(duiRegex, dui, 'Formato de DUI inválido') &&
        validarYNotificar(nitRegex, nit, 'Formato de NIT inválido') &&
        validarYNotificar(fechaRegex, fechaNacimiento, 'Formato de fecha de nacimiento inválido') &&
        validarYNotificar(correoRegex, correo, 'Formato de correo inválido')) {

        // Crear una nueva fila de la tabla y llenar los datos
        var tablaEstudiantesBody = document.getElementById('tablaEstudiantesBody');
        var nuevaFila = tablaEstudiantesBody.insertRow();
        nuevaFila.insertCell(0).textContent = carnet;
        nuevaFila.insertCell(1).textContent = nombre;
        nuevaFila.insertCell(2).textContent = dui;
        nuevaFila.insertCell(3).textContent = nit;
        nuevaFila.insertCell(4).textContent = fechaNacimiento;
        nuevaFila.insertCell(5).textContent = correo;
        nuevaFila.insertCell(6).textContent = edad;

        // Notificación de que los datos se han guardado
        alert('Datos guardados correctamente');

        // Limpiar el formulario
        document.getElementById('studentForm').reset();
    } else {
        // Al menos uno de los campos no es válido, mostrar un mensaje de error
        alert('Por favor, ingrese datos válidos en todos los campos.');
    }
});

// Código para el botón de limpiar formulario
document.getElementById('btnLimpiar').addEventListener('click', function() {
    document.getElementById('studentForm').reset();
});
