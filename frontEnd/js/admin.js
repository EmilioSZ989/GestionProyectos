// Admin.js

// Función para mostrar el modal correspondiente al hacer clic en "Modificar IVA"
function showModifyVATModal() {
    var modifyVATModal = document.getElementById("modifyVATModal");
    modifyVATModal.style.display = "block";
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




// Función para ocultar el modal al hacer clic en el botón de cierre
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Función para mostrar el modal correspondiente al hacer clic en "Generar Reporte de Ventas"
function showGenerateReportModal() {
    var generateReportModal = document.getElementById("generateReportModal");
    generateReportModal.style.display = "block";
}
document.addEventListener("DOMContentLoaded", function () {
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

        // Resetear el área del reporte
        reportArea.innerHTML = "";

        if (reportType === "diario" || reportType === "mensual") {
            generateReport(`http://localhost:8080/reporte/ventas?tipo=${reportType}`);
        } else if (invoiceNumber !== "") {
            generateReport(`http://localhost:8080/reporte/factura/${invoiceNumber}`);
        } else if (clientSearch !== "") {
            generateReport(`http://localhost:8080/reporte/facturas?clienteId=${clientSearch}`);
        }
    });

    generatePeriodReportBtn.addEventListener("click", function () {
        const reportType = document.getElementById("reportType").value;
        generateReport(`http://localhost:8080/reporte/ventas?tipo=${reportType}`);
    });

    searchInvoiceBtn.addEventListener("click", function () {
        const invoiceNumber = document.getElementById("invoiceNumber").value;
        if (invoiceNumber !== "") {
            generateReport(`http://localhost:8080/reporte/factura/${invoiceNumber}`);
        }
    });

    searchClientBtn.addEventListener("click", function () {
        const clientSearch = document.getElementById("clientSearch").value;
        if (clientSearch !== "") {
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
            // Mostrar el reporte en el área designada
            reportArea.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Error al generar el reporte:", error));
    }
});

// Función para mostrar el modal correspondiente al hacer clic en "Gestionar Usuarios"
function showManageUsersModal() {
    var manageUsersModal = document.getElementById("manageUsersModal");
    manageUsersModal.style.display = "block";
}

// Función para mostrar el modal correspondiente al hacer clic en "Gestionar Menú"
function showManageMenuModal() {
    var manageMenuModal = document.getElementById("manageMenuModal");
    manageMenuModal.style.display = "block";
}

// Función para mostrar el modal correspondiente al hacer clic en "Gestionar Mesas y Pedidos"
function showManageTablesModal() {
    var manageTablesModal = document.getElementById("manageTablesModal");
    manageTablesModal.style.display = "block";
}

// Función para cerrar sesión
function logout() {
    // Aquí iría el código para cerrar sesión
}

// Agregar event listeners a los botones del menú
document.getElementById("modifyVATBtn").addEventListener("click", showModifyVATModal);
document.getElementById("generateReportBtn").addEventListener("click", showGenerateReportModal);
document.getElementById("manageUsersBtn").addEventListener("click", showManageUsersModal);
document.getElementById("manageMenuBtn").addEventListener("click", showManageMenuModal);
document.getElementById("manageTablesBtn").addEventListener("click", showManageTablesModal);
document.getElementById("logoutBtn").addEventListener("click", logout);

// Agregar event listeners a los botones de cierre de los modals
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
