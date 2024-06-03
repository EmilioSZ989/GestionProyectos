

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


document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const createTableEstado = document.getElementById('createTableEstado');
    const editTableId = document.getElementById('editTableId');
    const deleteTableId = document.getElementById('deleteTableId');
    const orderUser = document.getElementById('orderUser');
    const orderClient = document.getElementById('orderClient');
    const updateOrderId = document.getElementById('updateOrderId');
    const assignOrderId = document.getElementById('assignOrderId');
    const assignTableId = document.getElementById('assignTableId');
    const calculateTipOrderId = document.getElementById('calculateTipOrderId');
    const invoiceId = document.getElementById('invoiceId');
    const invoiceOrderId = document.getElementById('invoiceOrderId');

    // Obtener mesas y llenar los selectores correspondientes
    fetch('http://localhost:8080/mesas')
        .then(response => response.json())
        .then(data => {
            editTableId.innerHTML = '';
            deleteTableId.innerHTML = '';
            assignTableId.innerHTML = '';

            data.forEach(mesa => {
                const option = document.createElement('option');
                option.value = mesa.estadoMesa.estadoMesa;
                option.text = mesa.idMesa; // Cambia 'name' por el campo que corresponda en tu JSON
                editTableId.appendChild(option);

                const optionDelete = option.cloneNode(true);
                deleteTableId.appendChild(optionDelete);

                const optionAssign = option.cloneNode(true);
                assignTableId.appendChild(optionAssign);
            });
        })
        .catch(error => console.error('Error fetching tables:', error));

    // Obtener usuarios y llenar los selectores correspondientes
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => {
            orderUser.innerHTML = '';
            data.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.idUsuario;
                option.text = usuario.nombreUsuario; // Cambia 'name' por el campo que corresponda en tu JSON
                orderUser.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching users:', error));

    // Obtener clientes y llenar los selectores correspondientes
    fetch('http://localhost:8080/clientes')
        .then(response => response.json())
        .then(data => {
            orderClient.innerHTML = '';
            data.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.idCliente;
                option.text = `${cliente.nombreCliente} ${cliente.apellidoCliente}`; // Cambia 'name' por el campo que corresponda en tu JSON
                orderClient.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching clients:', error));

    // Obtener pedidos y llenar los selectores correspondientes
    fetch('http://localhost:8080/pedidos')
        .then(response => response.json())
        .then(data => {
            updateOrderId.innerHTML = '';
            assignOrderId.innerHTML = '';
            calculateTipOrderId.innerHTML = '';
            invoiceOrderId.innerHTML = '';

            data.forEach(pedido => {
                const option = document.createElement('option');
                option.value = pedido.idPedido;
                option.text = pedido.idPedido; // Cambia 'name' por el campo que corresponda en tu JSON
                updateOrderId.appendChild(option);

                const optionAssign = option.cloneNode(true);
                assignOrderId.appendChild(optionAssign);

                const optionCalculate = option.cloneNode(true);
                calculateTipOrderId.appendChild(optionCalculate);

                const optionInvoice = option.cloneNode(true);
                invoiceOrderId.appendChild(optionInvoice);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));

    // Obtener facturas y llenar los selectores correspondientes
    fetch('http://localhost:8080/facturas')
        .then(response => response.json())
        .then(data => {
            invoiceId.innerHTML = '';
            data.forEach(factura => {
                const option = document.createElement('option');
                option.value = factura.idFactura;
                option.text = factura.idFactura; // Cambia 'name' por el campo que corresponda en tu JSON
                invoiceId.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching invoices:', error));
});


document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.getElementById('menuItems');
    const addItemBtn = document.getElementById('addItemBtn');
    const orderItemsTable = document.getElementById('orderItemsTable').querySelector('tbody');
    let orderItems = [];

    // Función para obtener ítems del menú
    function getMenuItems() {
        fetch('http://localhost:8080/menu')
            .then(response => response.json())
            .then(data => {
                menuItems.innerHTML = '';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.idItemMenu;
                    option.text = item.nombreItem; // Cambia 'nombreItem' por el campo que corresponda en tu JSON
                    menuItems.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching menu items:', error));
    }

    // Función para añadir ítem al pedido
    function addItemToOrder() {
        const selectedItem = menuItems.options[menuItems.selectedIndex];
        const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
        const item = {
            id: selectedItem.value,
            name: selectedItem.text,
            quantity: itemQuantity
        };
        orderItems.push(item);
        updateOrderItemsTable();
    }

    // Función para actualizar la tabla de ítems del pedido
    function updateOrderItemsTable() {
        orderItemsTable.innerHTML = '';
        orderItems.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td><button type="button" onclick="removeItemFromOrder(${index})">Eliminar</button></td>
            `;
            orderItemsTable.appendChild(row);
        });
    }

    // Función para remover ítem del pedido
    window.removeItemFromOrder = function(index) {
        orderItems.splice(index, 1);
        updateOrderItemsTable();
    };

    // Obtener ítems del menú al cargar la página
    getMenuItems();

    // Event listener para añadir ítem al pedido
    addItemBtn.addEventListener('click', addItemToOrder);

    // Event listener para enviar el formulario de pedido
    document.getElementById('takeOrderForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const userId = document.getElementById('orderUser').value;
        const clientId = document.getElementById('orderClient').value;
        const propina = parseFloat(document.getElementById('orderTip').value);

        const orderData = {
            userId,
            clientId,
            items: orderItems,
            propina
        };

        fetch('http://localhost:8080/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo crear el pedido');
            }
            return response.json();
        })
        .then(data => {
            console.log('Pedido creado:', data);
            // Limpiar el formulario y la tabla de ítems del pedido
            document.getElementById('takeOrderForm').reset();
            orderItems = [];
            updateOrderItemsTable();
        })
        .catch(error => console.error('Error al crear el pedido:', error));
    });
});
