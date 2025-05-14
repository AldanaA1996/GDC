document.addEventListener('DOMContentLoaded', function() {
    // Función para actualizar la tabla
    function actualizarTabla(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return response.json();
            })
            .then(data => {
                // Vaciar el contenido actual de la tabla
                document.querySelector('#tabla-dep tbody').innerHTML = '';
                
                // llenar la tabla con los nuevos datos
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.idmateriales}</td>
                        <td>${row.nombre}</td>
                        <td>${row.cantidad}</td>
                    `;
                    document.querySelector('#tabla-dep tbody').appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error en el pedido:', error);
            });
    }

    // Eventos de clic en los enlaces
    document.querySelectorAll('.lista-dep a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace
            const url = this.getAttribute('href'); // Obtener URL del enlace
            actualizarTabla(url); // Actualizar tabla con los datos de la URL
        });
    });
});