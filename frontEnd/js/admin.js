// Función para mostrar un modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Función para ocultar el modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Validación de formularios
function validateForm(inputs) {
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert(`El campo ${input.name} no puede estar vacío.`);
            return false;
        }
    }
    return true;
}

// Función para enviar el formulario de modificar IVA al controlador
function submitModifyVATForm() {
    const newVAT = document.getElementById("newVAT").value;
    if (!newVAT) {
        alert("El campo de nuevo IVA no puede estar vacío.");
        return;
    }

    fetch("http://localhost:8080/configuracion/iva?nuevoIVA=" + newVAT, {
        method: "PUT"
    })
    .then(response => {
        if (response.ok) {
            closeModal("modifyVATModal");
            alert("¡El valor del IVA se ha modificado correctamente!");
        } else {
            throw new Error('Error al modificar el valor del IVA');
        }
    })
    .catch(error => {
        console.error("Error al modificar el valor del IVA:", error);
        alert("¡Ha ocurrido un error al modificar el valor del IVA!");
    });
}

// Función para obtener todos los usuarios y poblar los selects correspondientes
function getAllUsers() {
    fetch('http://localhost:8080/usuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron obtener los usuarios');
            }
            return response.json();
        })
        .then(data => {
            // Poblar los elementos select con los usuarios obtenidos
            const userSelects = document.querySelectorAll('.userSelect'); // Utiliza la clase 'userSelect'
            userSelects.forEach(select => {
                select.innerHTML = ''; // Limpiar el contenido existente del select
                data.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.idUsuario;
                    option.textContent = `${user.nombreUsuario} ${user.apellidoUsuario}`;
                    select.appendChild(option);
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });
}

// Función para obtener todos los clientes
function getAllClients() {
    fetch('http://localhost:8080/clientes')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron obtener los clientes');
            }
            return response.json();
        })
        .then(data => {
            // Poblar el elemento select con los clientes obtenidos
            const clientSelect = document.getElementById('clientSearch');
            clientSelect.innerHTML = '';
            data.forEach(client => {
                const option = document.createElement('option');
                option.value = client.idCliente;
                option.textContent = `${client.nombreCliente} ${client.apellidoCliente}`;
                clientSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
        });
}

// Función para mostrar una sección específica y ocultar las demás
function showSection(sectionId) {
    const sections = document.getElementsByTagName("section");
    for (let section of sections) {
        section.style.display = "none";
    }
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = "block";
    }
}

// Función para obtener todos los ítems del menú
function getAllMenuItems() {
    fetch('http://localhost:8080/menu')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron obtener los ítems del menú');
            }
            return response.json();
        })
        .then(data => {
            // Limpiar el área de ítems del menú antes de agregar nuevos ítems
            menuItemsArea.innerHTML = '';
            // Crear la tabla
            const table = document.createElement('table');
            table.classList.add('menu-table');

            // Crear el encabezado de la tabla
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['ID', 'Nombre', 'Descripción', 'Precio', 'Categoría'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Crear el cuerpo de la tabla
            const tbody = document.createElement('tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                const itemData = [item.idItem, item.nombreItem, item.descripcion, item.precio, item.categoria.nombreCategoria];
                itemData.forEach(text => {
                    const td = document.createElement('td');
                    td.textContent = text;
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            // Agregar la tabla al área de ítems del menú
            menuItemsArea.appendChild(table);

            // Poblar los selects de ID de ítem con los ítems obtenidos
            const itemSelects = document.querySelectorAll('.itemSelect');
            itemSelects.forEach(select => {
                select.innerHTML = '';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.idItem;
                    option.textContent = `${item.nombreItem}`;
                    select.appendChild(option);
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los ítems del menú:', error);
        });
}


// Función para formatear datos como una tabla HTML
function formatDataAsTable(data) {
    if (!Array.isArray(data)) {
        data = [data];
    }

    const table = document.createElement('table');
    table.classList.add('data-table');

    // Crear encabezado de la tabla
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            if (typeof value === 'object') {
                // Si el valor es un objeto, intenta obtener un atributo específico
                if (value.hasOwnProperty('idPedido')) {
                    td.textContent = value.idPedido;
                } else if (value.hasOwnProperty('tipo')) {
                    td.textContent = value.tipo;
                } else if (value.hasOwnProperty('nombreCliente')) {
                    td.textContent = value.nombreCliente;
                } else {
                    td.textContent = JSON.stringify(value); // Mostrar como cadena JSON si no se puede resolver
                }
            } else {
                // Si no es un objeto, simplemente mostrar el valor
                td.textContent = value;
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table.outerHTML;
}



document.addEventListener("DOMContentLoaded", function () {
    

    // Vincular evento de cierre de sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Vincular eventos de la barra lateral
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetSectionId = this.getAttribute("data-section");
            showSection(targetSectionId);
        });
    });

    // Gestión de reportes
    const generateReportForm = document.getElementById("generateReportForm");
    const reportArea = document.getElementById("reportArea");
    const generatePeriodReportBtn = document.getElementById("generatePeriodReportBtn");
    const searchInvoiceBtn = document.getElementById("searchInvoiceBtn");
    const searchClientBtn = document.getElementById("searchClientBtn");

    generateReportForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const reportType = document.getElementById("reportType").value;
        const invoiceNumber = document.getElementById("invoiceNumber").value;
        const clientSearch = document.getElementById("clientSearch").value;
        reportArea.innerHTML = "";

        let endpoint = '';
        if (reportType) {
            endpoint = `http://localhost:8080/reporte/ventas?tipo=${reportType}`;
        } else if (invoiceNumber) {
            endpoint = `http://localhost:8080/reporte/factura/${invoiceNumber}`;
        } else if (clientSearch) {
            endpoint = `http://localhost:8080/reporte/facturas?clienteId=${clientSearch}`;
        }

        if (endpoint) {
            generateReport(endpoint);
        } else {
            alert("Por favor, seleccione un tipo de reporte, ingrese un número de factura o seleccione un cliente.");
        }
    });

    generatePeriodReportBtn.addEventListener("click", function () {
        const reportType = document.getElementById("reportType").value;
        generateReport(`http://localhost:8080/reporte/ventas?tipo=${reportType}`);
    });

    searchInvoiceBtn.addEventListener("click", function () {
        const invoiceNumber = document.getElementById("invoiceNumber").value;
        if (invoiceNumber) {
            generateReport(`http://localhost:8080/reporte/factura/${invoiceNumber}`);
        } else {
            alert("Por favor, ingrese un número de factura.");
        }
    });

    searchClientBtn.addEventListener("click", function () {
        const clientSearch = document.getElementById("clientSearch").value;
        if (clientSearch) {
            generateReport(`http://localhost:8080/reporte/facturas?clienteId=${clientSearch}`);
        } else {
            alert("Por favor, seleccione un cliente.");
        }
    });

    function generateReport(endpoint) {
        fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            reportArea.innerHTML = formatDataAsTable(data);
        })
        .catch(error => console.error("Error al generar el reporte:", error));
    }

    // Gestión de usuarios
    const getAllUsersBtn = document.getElementById("getAllUsersBtn");
    const usersArea = document.getElementById("usersArea");

    getAllUsersBtn.addEventListener("click", function () {
        fetch("http://localhost:8080/usuarios")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener usuarios');
                }
                return response.json();
            })
            .then(data => {
                // Limpiar el área de usuarios antes de agregar nuevos usuarios
                usersArea.innerHTML = '';
                // Crear la tabla
                const table = document.createElement('table');
                table.classList.add('user-table');
    
                // Crear el encabezado de la tabla
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headers = ['ID', 'Nombre', 'Apellido', 'Correo', 'Tipo de Usuario'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);
    
                // Crear el cuerpo de la tabla
                const tbody = document.createElement('tbody');
                data.forEach(user => {
                    const row = document.createElement('tr');
                    const userData = [user.idUsuario, user.nombreUsuario, user.apellidoUsuario, user.correo, user.tipoUsuario.tipoUsuario];
                    userData.forEach(text => {
                        const td = document.createElement('td');
                        td.textContent = text;
                        row.appendChild(td);
                    });
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);
    
                // Agregar la tabla al área de usuarios
                usersArea.appendChild(table);
            })
            .catch(error => console.error("Error al obtener usuarios:", error));
    });
    

    const createUserForm = document.getElementById("createUserForm");
    createUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = [
            document.getElementById("createUserName"),
            document.getElementById("createUserSurname"),
            document.getElementById("createUserEmail"),
            document.getElementById("createUserPassword"),
            document.getElementById("createUserType")
        ];
        if (!validateForm(inputs)) return;

        const [nombreUsuario, apellidoUsuario, correo, contrasena, tipoUsuario] = inputs.map(input => input.value);

        fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreUsuario, apellidoUsuario, correo, contrasena, tipoUsuario: { idTipoUsuario: parseInt(tipoUsuario) } })
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuario creado con éxito!");
            createUserForm.reset();
            usersArea.innerHTML = formatDataAsTable([data]);
        })
        .catch(error => console.error("Error al crear usuario:", error));
    });

    const editUserForm = document.getElementById("editUserForm");
    editUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = [
            document.getElementById("editUserId"),
            document.getElementById("editUserName"),
            document.getElementById("editUserSurname"),
            document.getElementById("editUserEmail"),
            document.getElementById("editUserPassword"),
            document.getElementById("editUserType")
        ];
        if (!validateForm(inputs)) return;

        const [idUsuario, nombreUsuario, apellidoUsuario, correo, contrasena, tipoUsuario] = inputs.map(input => input.value);

        fetch("http://localhost:8080/usuarios/" + idUsuario, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreUsuario, apellidoUsuario, correo, contrasena, tipoUsuario: { idTipoUsuario: parseInt(tipoUsuario) } })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al modificar usuario');
            }
            return response.json();
        })
        .then(data => {
            alert("Usuario modificado con éxito!");
            editUserForm.reset();
            usersArea.innerHTML = formatDataAsTable([data]);
        })
        .catch(error => console.error("Error al modificar usuario:", error));
    });

    const deleteUserForm = document.getElementById("deleteUserForm");
    deleteUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userId = document.getElementById("deleteUserId").value;
        if (!userId.trim()) {
            alert("El campo ID de usuario no puede estar vacío.");
            return;
        }

        fetch("http://localhost:8080/usuarios/" + userId, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar usuario');
            }
            alert("Usuario eliminado con éxito!");
            deleteUserForm.reset();
            usersArea.innerHTML = "";
        })
        .catch(error => console.error("Error al eliminar usuario:", error));
    });

    
    // Gestión del menú
    const getAllMenuItemsBtn = document.getElementById("getAllMenuItemsBtn");
    const menuItemsArea = document.getElementById("menuItemsArea");

    getAllMenuItemsBtn.addEventListener("click", function () {
        fetch("http://localhost:8080/menu")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener ítems del menú');
                }
                return response.json();
            })
            .then(data => {
                menuItemsArea.innerHTML = '';
                const table = document.createElement('table');
                table.classList.add('menu-table');

                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headers = ['ID', 'Nombre', 'Descripción', 'Precio', 'Categoría'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                const tbody = document.createElement('tbody');
                data.forEach(item => {
                    const row = document.createElement('tr');
                    const itemData = [item.idItem, item.nombreItem, item.descripcion, item.precio, item.categoria.nombreCategoria];
                    itemData.forEach(text => {
                        const td = document.createElement('td');
                        td.textContent = text;
                        row.appendChild(td);
                    });
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);

                menuItemsArea.appendChild(table);
            })
            .catch(error => console.error("Error al obtener ítems del menú:", error));
    });

    const createMenuItemForm = document.getElementById("createMenuItemForm");
    createMenuItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = [
            document.getElementById("createItemName"),
            document.getElementById("createItemDescription"),
            document.getElementById("createItemPrice"),
            document.getElementById("createItemCategory")
        ];
        if (!validateForm(inputs)) return;

        const [nombreItem, descripcion, precio, idCategoria] = inputs.map(input => input.value);

        fetch("http://localhost:8080/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreItem, descripcion, precio, categoria: { idCategoria: parseInt(idCategoria) } })
        })
        .then(response => response.json())
        .then(data => {
            alert("Ítem de menú creado con éxito!");
            createMenuItemForm.reset();
            getAllMenuItems(); // Actualizar la lista de ítems
        })
        .catch(error => console.error("Error al crear ítem de menú:", error));
    });

    const editMenuItemForm = document.getElementById("editMenuItemForm");
    editMenuItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = [
            document.getElementById("editItemId"),
            document.getElementById("editItemName"),
            document.getElementById("editItemDescription"),
            document.getElementById("editItemPrice"),
            document.getElementById("editItemCategory")
        ];
        if (!validateForm(inputs)) return;

        const [idItem, nombreItem, descripcion, precio, idCategoria] = inputs.map(input => input.value);

        fetch("http://localhost:8080/menu/" + idItem, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreItem, descripcion, precio, categoria: { idCategoria: parseInt(idCategoria) } })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al modificar ítem de menú');
            }
            return response.json();
        })
        .then(data => {
            alert("Ítem de menú modificado con éxito!");
            editMenuItemForm.reset();
            getAllMenuItems(); // Actualizar la lista de ítems
        })
        .catch(error => console.error("Error al modificar ítem de menú:", error));
    });

    const deleteMenuItemForm = document.getElementById("deleteMenuItemForm");
    deleteMenuItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const idItem = document.getElementById("deleteItemId").value;
        if (!idItem.trim()) {
            alert("El campo ID del ítem no puede estar vacío.");
            return;
        }

        fetch("http://localhost:8080/menu/" + idItem, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar ítem de menú');
            }
            alert("Ítem de menú eliminado con éxito!");
            deleteMenuItemForm.reset();
            getAllMenuItems(); // Actualizar la lista de ítems
        })
        .catch(error => console.error("Error al eliminar ítem de menú:", error));
    });

    function getAllMenuItems() {
        fetch("http://localhost:8080/menu")
            .then(response => response.json())
            .then(data => {
                const editItemSelect = document.getElementById("editItemId");
                const deleteItemSelect = document.getElementById("deleteItemId");
                editItemSelect.innerHTML = '';
                deleteItemSelect.innerHTML = '';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.idItemMenu;
                    option.textContent = `${item.nombreItem} (ID: ${item.idItemMenu})`;
                    editItemSelect.appendChild(option);
                    deleteItemSelect.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => console.error("Error al obtener ítems del menú:", error));
    }

    // Llamar a las funciones para cargar datos al iniciar
    getAllClients();
    getAllUsers();
    getAllMenuItems();
});
