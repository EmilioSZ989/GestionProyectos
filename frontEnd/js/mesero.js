

// Aquí debes agregar el resto de los event listeners para los demás formularios
document.addEventListener("DOMContentLoaded", function() {
    const manageTablesBtn = document.getElementById("manageTablesBtn");
    const takeOrderBtn = document.getElementById("takeOrderBtn");
    const calculateTipBtn = document.getElementById("calculateTipBtn");
    const processPaymentBtn = document.getElementById("processPaymentBtn");
    const registerClientInfoBtn = document.getElementById("registerClientInfoBtn");
    const generateInvoiceBtn = document.getElementById("generateInvoiceBtn");

    const manageTablesSection = document.getElementById("manageTablesSection");
    const takeOrderSection = document.getElementById("takeOrderSection");
    const calculateTipSection = document.getElementById("calculateTipSection");
    const processPaymentSection = document.getElementById("processPaymentSection");
    const registerClientInfoSection = document.getElementById("registerClientInfoSection");
    const generateInvoiceSection = document.getElementById("generateInvoiceSection");

    function hideAllSections() {
        manageTablesSection.classList.add("hidden");
        takeOrderSection.classList.add("hidden");
        calculateTipSection.classList.add("hidden");
        processPaymentSection.classList.add("hidden");
        registerClientInfoSection.classList.add("hidden");
        generateInvoiceSection.classList.add("hidden");
    }

    manageTablesBtn.addEventListener("click", function() {
        hideAllSections();
        manageTablesSection.classList.remove("hidden");
    });

    takeOrderBtn.addEventListener("click", function() {
        hideAllSections();
        takeOrderSection.classList.remove("hidden");
    });

    calculateTipBtn.addEventListener("click", function() {
        hideAllSections();
        calculateTipSection.classList.remove("hidden");
    });

    processPaymentBtn.addEventListener("click", function() {
        hideAllSections();
        processPaymentSection.classList.remove("hidden");
    });

    registerClientInfoBtn.addEventListener("click", function() {
        hideAllSections();
        registerClientInfoSection.classList.remove("hidden");
    });

    generateInvoiceBtn.addEventListener("click", function() {
        hideAllSections();
        generateInvoiceSection.classList.remove("hidden");
    });

    document.getElementById("createTableForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const tableName = document.getElementById("createTableName").value;
        console.log("Crear Mesa:", tableName);
    });

    document.getElementById("editTableForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const tableId = document.getElementById("editTableId").value;
        const tableName = document.getElementById("editTableName").value;
        console.log("Editar Mesa:", tableId, tableName);
    });

    document.getElementById("deleteTableForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const tableId = document.getElementById("deleteTableId").value;
        console.log("Eliminar Mesa:", tableId);
    });

    // Aquí debes agregar el resto de los event listeners para los demás formularios
});



document.addEventListener("DOMContentLoaded", function() {
    const getAllTablesBtn = document.getElementById("getAllTablesBtn");
    const createTableForm = document.getElementById("createTableForm");
    const editTableForm = document.getElementById("editTableForm");
    const deleteTableForm = document.getElementById("deleteTableForm");
    const tablesArea = document.getElementById("tablesArea");

    // Función para obtener todas las mesas
    function getAllTables() {
        fetch('http://localhost:8080/mesas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudieron obtener las mesas');
                }
                return response.json();
            })
            .then(data => {
                // Limpiar el área de las mesas antes de mostrar los nuevos datos
                tablesArea.innerHTML = "";
                data.forEach(mesa => {
                    const mesaElement = document.createElement("div");
                    mesaElement.textContent = `ID: ${mesa.idMesa}, Estado: ${mesa.estadoMesa.estadoMesa}`;
                    tablesArea.appendChild(mesaElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener las mesas:', error);
            });
    }

    // Función para crear una nueva mesa
    function createTable(tableData) {
        fetch('http://localhost:8080/mesas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estadoMesa: tableData })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo crear la mesa');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar la mesa creada en la interfaz
            tablesArea.innerHTML = ""; // Limpiar área
            const mesaElement = document.createElement("div");
            mesaElement.textContent = `ID: ${data.idMesa}, Estado: ${data.estadoMesa.estadoMesa}`;
            tablesArea.appendChild(mesaElement);
            console.log('Mesa creada:', data);
        })
        .catch(error => {
            console.error('Error al crear la mesa:', error);
        });
    }

    // Función para editar una mesa existente
    function editTable(tableId, tableData) {
        fetch(`http://localhost:8080/mesas/${tableId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estadoMesa: tableData })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo editar la mesa');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar la mesa editada en la interfaz
            tablesArea.innerHTML = ""; // Limpiar área
            const mesaElement = document.createElement("div");
            mesaElement.textContent = `ID: ${data.idMesa}, Estado: ${data.estadoMesa.estadoMesa}`;
            tablesArea.appendChild(mesaElement);
            console.log('Mesa editada:', data);
        })
        .catch(error => {
            console.error('Error al editar la mesa:', error);
        });
    }

    // Función para eliminar una mesa existente
    function deleteTable(tableId) {
        fetch(`http://localhost:8080/mesas/${tableId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar la mesa');
            }
            // Confirmación de la eliminación en la interfaz
            tablesArea.innerHTML = `Mesa con ID ${tableId} eliminada.`;
            console.log('Mesa eliminada');
        })
        .catch(error => {
            console.error('Error al eliminar la mesa:', error);
        });
    }

    // Event listener para obtener todas las mesas
    getAllTablesBtn.addEventListener("click", function() {
        getAllTables();
    });

    // Event listener para crear una nueva mesa
    createTableForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const estadoMesa = { idEstadoMesa: parseInt(document.getElementById("createTableEstado").value) };
        createTable(estadoMesa);
    });

    // Event listener para editar una mesa existente
    editTableForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const tableId = document.getElementById("editTableId").value;
        const estadoMesa = { idEstadoMesa: parseInt(document.getElementById("editTableEstado").value) };
        editTable(tableId, estadoMesa);
    });

    // Event listener para eliminar una mesa existente
    deleteTableForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const tableId = document.getElementById("deleteTableId").value;
        deleteTable(tableId);
    });
});


