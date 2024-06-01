// Admin.js


// Función para mostrar un modal
function showModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Función para ocultar el modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Función para enviar el formulario de modificar IVA al controlador
function submitModifyVATForm() {
    var newVAT = document.getElementById("newVAT").value;

    fetch("http://localhost:8080/configuracion/iva?nuevoIVA=" + newVAT, {
        method: "PUT"
    })
    .then(response => {
        if (response.ok) {
            closeModal("modifyVATModal");
            alert("¡El valor del IVA se ha modificado correctamente!");
        } else {
            alert("¡Ha ocurrido un error al modificar el valor del IVA!");
        }
    })
    .catch(error => {
        console.error("Error al modificar el valor del IVA:", error);
        alert("¡Ha ocurrido un error al modificar el valor del IVA!");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const generateReportForm = document.getElementById("generateReportForm");
    const reportArea = document.getElementById("reportArea");
    const generatePeriodReportBtn = document.getElementById("generatePeriodReportBtn");
    const searchInvoiceBtn = document.getElementById("searchInvoiceBtn");
    const searchClientBtn = document.getElementById("searchClientBtn");

    // Gestión de reportes
    generateReportForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const reportType = document.getElementById("reportType").value;
        const invoiceNumber = document.getElementById("invoiceNumber").value;
        const clientSearch = document.getElementById("clientSearch").value;
        reportArea.innerHTML = "";

        if (reportType) {
            generateReport(`http://localhost:8080/reporte/ventas?tipo=${reportType}`);
        } else if (invoiceNumber) {
            generateReport(`http://localhost:8080/reporte/factura/${invoiceNumber}`);
        } else if (clientSearch) {
            generateReport(`http://localhost:8080/reporte/facturas?clienteId=${clientSearch}`);
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
        }
    });

    searchClientBtn.addEventListener("click", function () {
        const clientSearch = document.getElementById("clientSearch").value;
        if (clientSearch) {
            generateReport(`http://localhost:8080/reporte/facturas?clienteId=${clientSearch}`);
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
            reportArea.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Error al generar el reporte:", error));
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const getAllUsersBtn = document.getElementById("getAllUsersBtn");
    const createUserForm = document.getElementById("createUserForm");
    const editUserForm = document.getElementById("editUserForm");
    const deleteUserForm = document.getElementById("deleteUserForm");
    const usersArea = document.getElementById("usersArea");

    getAllUsersBtn.addEventListener("click", function () {
        fetch("http://localhost:8080/usuarios")
            .then(response => response.json())
            .then(data => {
                usersArea.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error("Error al obtener usuarios:", error));
    });

    createUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const nombreUsuario = document.getElementById("createUserName").value;
        const apellidoUsuario = document.getElementById("createUserSurname").value;
        const correo = document.getElementById("createUserEmail").value;
        const contrasena = document.getElementById("createUserPassword").value;
        const idTipoUsuario = parseInt(document.getElementById("createUserType").value);

        fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreUsuario, apellidoUsuario, correo, contrasena, tipoUsuario: { idTipoUsuario } })
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuario creado con éxito!");
            createUserForm.reset();
            usersArea.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Error al crear usuario:", error));
    });

    editUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const id = document.getElementById("editUserId").value;
        const nombreUsuario = document.getElementById("editUserName").value;
        const apellidoUsuario = document.getElementById("editUserSurname").value;
        const correo = document.getElementById("editUserEmail").value;
        const contrasena = document.getElementById("editUserPassword").value;
        const idTipoUsuario = parseInt(document.getElementById("editUserType").value);

        fetch(`http://localhost:8080/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreUsuario, apellidoUsuario, correo, contrasena, tipoUsuario: { idTipoUsuario } })
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuario editado con éxito!");
            editUserForm.reset();
            usersArea.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Error al editar usuario:", error));
    });

    deleteUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const id = document.getElementById("deleteUserId").value;

        fetch(`http://localhost:8080/usuarios/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                alert("Usuario eliminado con éxito!");
                deleteUserForm.reset();
            } else {
                alert("Error al eliminar usuario.");
            }
        })
        .catch(error => console.error("Error al eliminar usuario:", error));
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const getAllMenuItemsBtn = document.getElementById("getAllMenuItemsBtn");
    const createMenuItemForm = document.getElementById("createMenuItemForm");
    const editMenuItemForm = document.getElementById("editMenuItemForm");
    const deleteMenuItemForm = document.getElementById("deleteMenuItemForm");
    const menuItemsArea = document.getElementById("menuItemsArea");

    // Obtener todos los ítems del menú
    getAllMenuItemsBtn.addEventListener("click", function () {
        fetch("http://localhost:8080/menu")
            .then(response => response.json())
            .then(data => {
                menuItemsArea.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error("Error al obtener ítems del menú:", error));
    });

    // Crear un nuevo ítem de menú
    createMenuItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const nombreItem = document.getElementById("createItemName").value;
        const descripcion = document.getElementById("createItemDescription").value;
        const precio = document.getElementById("createItemPrice").value;
        const idCategoria = parseInt(document.getElementById("createItemCategory").value);

        fetch("http://localhost:8080/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreItem, descripcion, precio, categoria: { idCategoria } })
        })
        .then(response => response.json())
        .then(data => {
            alert("Ítem de menú creado con éxito!");
            createMenuItemForm.reset();
            menuItemsArea.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Error al crear ítem de menú:", error));
    });

    // Editar un ítem de menú existente
    editMenuItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const id = document.getElementById("editItemId").value;
        const nombreItem = document.getElementById("editItemName").value;
        const descripcion = document.getElementById("editItemDescription").value;
        const precio = document.getElementById("editItemPrice").value;
        const idCategoria = parseInt(document.getElementById("editItemCategory").value);

        fetch(`http://localhost:8080/menu/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombreItem, descripcion, precio, categoria: { idCategoria } })
        })
        .then(response => response.json())
        .then(data => {
            alert("Ítem de menú editado con éxito!");
            editMenuItemForm.reset();
            menuItemsArea.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Error al editar ítem de menú:", error));
    });

    // Eliminar un ítem de menú
    deleteMenuItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const id = document.getElementById("deleteItemId").value;

        fetch(`http://localhost:8080/menu/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                alert("Ítem de menú eliminado con éxito!");
                deleteMenuItemForm.reset();
                menuItemsArea.innerHTML = "";
            } else {
                alert("Error al eliminar ítem de menú.");
            }
        })
        .catch(error => console.error("Error al eliminar ítem de menú:", error));
    });

    // Agregar event listeners a los botones del menú
    document.getElementById("manageMenuBtn").addEventListener("click", () => showModal("manageMenuModal"));

    // Cerrar el modal al hacer clic en el botón de cierre
    document.querySelectorAll(".close").forEach(function (element) {
        element.addEventListener("click", function () {
            closeModal(element.parentElement.parentElement.id);
        });
    });

    // Cerrar el modal haciendo clic fuera de él
    window.onclick = function (event) {
        var modals = document.querySelectorAll(".modal");
        modals.forEach(function (modal) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    };

    // Función para mostrar un modal
    function showModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    }

    // Función para ocultar el modal
    function closeModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = "none";
    }
});



// Función para mostrar una sección específica y ocultar las demás
function showSection(sectionId) {
    // Ocultar todas las secciones
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    // Mostrar la sección específica
    var section = document.getElementById(sectionId);
    section.style.display = "block";
}

// Funciones para mostrar las secciones correspondientes a los botones del menú lateral
document.getElementById("modifyVATBtn").addEventListener("click", function() {
    showSection("modifyVATSection");
});

document.getElementById("generateReportBtn").addEventListener("click", function() {
    showSection("generateReportSection");
});

document.getElementById("manageUsersBtn").addEventListener("click", function() {
    showSection("manageUsersSection");
});

document.getElementById("manageMenuBtn").addEventListener("click", function() {
    showSection("manageMenuSection");
});

