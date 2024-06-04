document.addEventListener('DOMContentLoaded', function() {
    // Otros códigos...
    
    // Event listener para el botón de cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Redireccionar al index.html
        window.location.href = 'index.html'; // Cambia 'index.html' al nombre de tu página de inicio si es diferente
    });
});
document.addEventListener('DOMContentLoaded', function() {
    
    
    const sections = document.querySelectorAll('section');
    
    function hideAllSections() {
        sections.forEach(section => section.classList.add('hidden'));
    }

    // Mostrar las secciones según el botón del menú
    document.getElementById('manageTablesBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('manageTablesSection').classList.remove('hidden');
    });
    
    document.getElementById('takeOrderBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('takeOrderSection').classList.remove('hidden');
        fetchUsersAndClients();
    });
    
    document.getElementById('calculateTipBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('calculateTipSection').classList.remove('hidden');
    });
    
    document.getElementById('processPaymentBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('processPaymentSection').classList.remove('hidden');
    });
    
    document.getElementById('registerClientInfoBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('registerClientInfoSection').classList.remove('hidden');
    });
    
    document.getElementById('generateInvoiceBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('generateInvoiceSection').classList.remove('hidden');
    });

    // Gestionar mesas y pedidos
    document.getElementById('createTableForm').addEventListener('submit', function(event) {
        event.preventDefault();
        createTable();
    });

    document.getElementById('editTableForm').addEventListener('submit', function(event) {
        event.preventDefault();
        editTable();
    });

    document.getElementById('deleteTableForm').addEventListener('submit', function(event) {
        event.preventDefault();
        deleteTable();
    });

    document.getElementById('getAllTablesBtn').addEventListener('click', function() {
        fetchTables();
    });

    function createTable() {
        const estadoMesaId = document.getElementById('createTableEstado').value;
        const bodyData = {
            estadoMesa: {
                idEstadoMesa: estadoMesaId
            }
        };
    
        fetch('http://localhost:8080/mesas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mesa creada:', data);
            fetchTables();
        })
        .catch(error => {
            console.error('Error al crear la mesa:', error);
        });
    }
    
    function editTable() {
        const idMesa = document.getElementById('editTableId').value;
        const estadoMesa = document.getElementById('editTableEstado').value;
        const bodyData = {
            estadoMesa: {
                idEstadoMesa: estadoMesa
            }
        };
    
        fetch(`http://localhost:8080/mesas/${idMesa}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mesa editada:', data);
            fetchTables();
        })
        .catch(error => {
            console.error('Error al editar la mesa:', error);
        });
    }
    

    function deleteTable() {
        const idMesa = document.getElementById('deleteTableId').value;
    
        fetch(`http://localhost:8080/mesas/${idMesa}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Mesa eliminada exitosamente');
                fetchTables(); // Actualiza la lista de mesas después de eliminar una
            } else {
                console.error('Error al eliminar la mesa:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud DELETE:', error);
        });
    }
    
    

    function fetchTables() {
        fetch('http://localhost:8080/mesas')
        .then(response => response.json())
        .then(data => {
            const tablesArea = document.getElementById('tablesArea');
            tablesArea.innerHTML = '';
            data.forEach(mesa => {
                const tableDiv = document.createElement('div');
                tableDiv.textContent = `ID: ${mesa.idMesa} - Estado: ${mesa.estadoMesa.estadoMesa}`;
                tablesArea.appendChild(tableDiv);
            });

            const editTableId = document.getElementById('editTableId');
            const deleteTableId = document.getElementById('deleteTableId');
            editTableId.innerHTML = '';
            deleteTableId.innerHTML = '';

            data.forEach(mesa => {
                const option = document.createElement('option');
                option.value = mesa.id;
                option.textContent = mesa.id;
                editTableId.appendChild(option.cloneNode(true));
                deleteTableId.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => {
            console.error('Error al obtener las mesas:', error);
        });
    }

 // Tomar pedidos
document.getElementById('takeOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    takeOrder();
});

document.getElementById('addItemBtn').addEventListener('click', function() {
    addItem();
});



// Función para agregar ítems al pedido
function addItem() {
    const orderItemsContainer = document.getElementById('orderItemsContainer');
    const itemDiv = document.createElement('div');
    const itemSelect = document.createElement('select');
    const quantityInput = document.createElement('input');
    const deleteButton = document.createElement('button');

    // Aquí deberías cargar dinámicamente las opciones de los ítems del menú
    fetch('http://localhost:8080/menu')
         .then(response => response.json())
         .then(data => {
             data.forEach(itemMenu => {
                 const option = document.createElement('option');
                 option.value = itemMenu.idItemMenu;
                 option.textContent = itemMenu.nombreItem;
                 itemSelect.appendChild(option);
             });
         })
         .catch(error => {
             console.error('Error al cargar los ítems del menú:', error);
         });

    itemSelect.name = 'orderItems';
    quantityInput.type = 'number';
    quantityInput.min = 1;
    quantityInput.value = 1;
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        orderItemsContainer.removeChild(itemDiv);
    });

    itemDiv.appendChild(itemSelect);
    itemDiv.appendChild(quantityInput);
    itemDiv.appendChild(deleteButton);

    orderItemsContainer.appendChild(itemDiv);
}

// Función para tomar el pedido
function takeOrder() {
    const userId = document.getElementById('orderUser').value;
    const clientId = document.getElementById('orderClient').value;
    const propina = document.getElementById('orderTip').value;

    const orderItemsElements = document.getElementsByName('orderItems');
    const items = [];
    for (const item of orderItemsElements) {
        const idItemMenu = item.value;
        if (idItemMenu) {
            const cantidad = parseInt(item.nextElementSibling.value);
            items.push({ cantidad, itemMenu: { idItemMenu } });
        }
    }

    const pedido = {
        subtotal: 0,
        total: 0,
        propina: parseFloat(propina),
        iva: 0,
        usuario: { idUsuario: parseInt(userId) },
        cliente: { idCliente: parseInt(clientId) },
        estadoPedido: { idEstadoPedido: 1 }
    };

    const requestData = { pedido, items };

    fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido creado:', data);
    })
    .catch(error => {
        console.error('Error al crear el pedido:', error);
    });
}

document.getElementById('updateOrderStatusForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateOrderStatus();
});

// Función para cargar los pedidos y añadirlos al select de ID de pedidos
function loadOrderIds() {
    fetch('http://localhost:8080/pedidos')
        .then(response => response.json())
        .then(data => {
            const orderIdSelect = document.getElementById('updateOrderId');
            orderIdSelect.innerHTML = ''; // Limpiar las opciones anteriores
            data.forEach(pedido => {
                const option = document.createElement('option');
                option.value = pedido.idPedido;
                option.textContent = `Pedido ${pedido.idPedido} - ${pedido.cliente.nombreCliente}`;
                orderIdSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los pedidos:', error);
        });
}

// Llamar a la función para cargar los IDs de pedidos cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadOrderIds);

function updateOrderStatus() {
    const idPedido = document.getElementById('updateOrderId').value;
    const idEstadoPedido = document.getElementById('orderStatus').value;

    const requestData = { idEstadoPedido: parseInt(idEstadoPedido) };

    fetch(`http://localhost:8080/pedidos/${idPedido}/estado`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Cambiar a text() para manejar respuestas vacías o no JSON
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('Estado del pedido actualizado:', data);
        } catch (error) {
            console.log('Respuesta no es JSON:', text);
        }
    })
    .catch(error => {
        console.error('Error al actualizar el estado del pedido:', error);
    });
}



document.getElementById('assignOrderToTableForm').addEventListener('submit', function(event) {
    event.preventDefault();
    assignOrderToTable();
});

// Función para cargar los pedidos y añadirlos al select de ID de pedidos
function loadOrderIds() {
    fetch('http://localhost:8080/pedidos')
        .then(response => response.json())
        .then(data => {
            const orderIdSelect = document.getElementById('assignOrderId');
            orderIdSelect.innerHTML = ''; // Limpiar las opciones anteriores
            data.forEach(pedido => {
                const option = document.createElement('option');
                option.value = pedido.idPedido;
                option.textContent = `Pedido ${pedido.idPedido} - ${pedido.cliente.nombreCliente}`;
                orderIdSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los pedidos:', error);
        });
}

// Función para cargar las mesas y añadirlas al select de ID de mesas
function loadTableIds() {
    fetch('http://localhost:8080/mesas')
        .then(response => response.json())
        .then(data => {
            const tableIdSelect = document.getElementById('assignTableId');
            tableIdSelect.innerHTML = ''; // Limpiar las opciones anteriores
            data.forEach(mesa => {
                const option = document.createElement('option');
                option.value = mesa.idMesa;
                option.textContent = `Mesa ${mesa.idMesa} - ${mesa.numeroMesa}`;
                tableIdSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar las mesas:', error);
        });
}

// Llamar a las funciones para cargar los IDs de pedidos y mesas cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    loadOrderIds();
    loadTableIds();
});

function assignOrderToTable() {
    const idPedido = document.getElementById('assignOrderId').value;
    const idMesa = document.getElementById('assignTableId').value;

    fetch(`http://localhost:8080/pedidos/${idPedido}/mesa/${idMesa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Cambiar a text() para manejar respuestas vacías o no JSON
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('Pedido asignado a mesa:', data);
        } catch (error) {
            console.log('Respuesta no es JSON:', text);
        }
    })
    .catch(error => {
        console.error('Error al asignar el pedido a la mesa:', error);
    });
}

    

// Funciones para calcular propina
document.getElementById('calculateTipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTip();
});

function calculateTip() {
    const orderId = document.getElementById('calculateTipOrderId').value;
    const tipPercentage = document.getElementById('tipPercentage').value;

    const bodyData = {
        idPedido: orderId,
        porcentajePropina: tipPercentage
    };

    fetch('http://localhost:8080/pedidos/calcular-propina', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Propina calculada:', data);
        showCalculatedTip(data);
    })
    .catch(error => {
        console.error('Error al calcular la propina:', error);
    });
}

function showCalculatedTip(tipData) {
    const tipArea = document.getElementById('tipArea');
    const tipDiv = document.createElement('div');
    tipDiv.textContent = `Propina Calculada - Pedido ID: ${tipData.idPedido}, Propina: $${tipData.propinaCalculada}`;
    tipArea.appendChild(tipDiv);
}

// Función para obtener los pedidos para el select de propinas
function fetchOrdersForSelect() {
    fetch('http://localhost:8080/pedidos')
    .then(response => response.json())
    .then(data => {
        const tipOrderSelect = document.getElementById('calculateTipOrderId');
        tipOrderSelect.innerHTML = '';
        data.forEach(pedido => {
            const option = document.createElement('option');
            option.value = pedido.idPedido;
            option.textContent = `Pedido #${pedido.idPedido}`;
            tipOrderSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al cargar los pedidos:', error);
    });
}

// Llamar a la función fetchOrdersForSelect() para cargar las opciones de pedidos al mostrar la sección de calcular propina
document.getElementById('calculateTipBtn').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('calculateTipSection').classList.remove('hidden');
    fetchOrdersForSelect();
});



// Funciones para pagos
document.getElementById('processPaymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    processPayment();
});

function processPayment() {
    const invoiceId = document.getElementById('invoiceId').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const paymentType = document.getElementById('paymentType').value;

    const bodyData = {
        idFactura: invoiceId,
        cantidadRecibida: paymentAmount,
        idTipoPago: paymentType
    };

    fetch('http://localhost:8080/pagos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pago procesado:', data);
        showProcessedPayment(data);
    })
    .catch(error => {
        console.error('Error al procesar el pago:', error);
    });
}

function showProcessedPayment(paymentData) {
    const paymentArea = document.getElementById('paymentArea');
    const paymentDiv = document.createElement('div');
    paymentDiv.textContent = `Pago Procesado - Factura ID: ${paymentData.idFactura}, Cantidad Recibida: $${paymentData.cantidadRecibida}, Tipo de Pago: ${paymentData.idTipoPago}`;
    paymentArea.appendChild(paymentDiv);
}

// Función para obtener las facturas para el select de pagos
function fetchInvoicesForSelect() {
    fetch('http://localhost:8080/facturas')
    .then(response => response.json())
    .then(data => {
        const paymentInvoiceSelect = document.getElementById('invoiceId');
        paymentInvoiceSelect.innerHTML = '';
        data.forEach(factura => {
            const option = document.createElement('option');
            option.value = factura.idFactura;
            option.textContent = `Factura #${factura.idFactura}`;
            paymentInvoiceSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al cargar las facturas:', error);
    });
}

// Llamar a la función fetchInvoicesForSelect() para cargar las opciones de facturas al mostrar la sección de procesar pagos
document.getElementById('processPaymentBtn').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('processPaymentSection').classList.remove('hidden');
    fetchInvoicesForSelect();
});


    // Registrar cliente
    document.getElementById('registerClientForm').addEventListener('submit', function(event) {
        event.preventDefault();
        registerClient();
    });

    function registerClient() {
        const nombreCliente = document.getElementById('clientName').value;
        const apellidoCliente = document.getElementById('clientLastName').value;
        const telefonoCliente = document.getElementById('clientPhone').value;
        const direccionCliente = document.getElementById('clientAddress').value;

        fetch('http://localhost:8080/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreCliente, apellidoCliente, telefonoCliente, direccionCliente }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cliente registrado:', data);
            fetchClients();
        })
        .catch(error => {
            console.error('Error al registrar el cliente:', error);
        });
    }

    function fetchClients() {
        fetch('http://localhost:8080/clientes')
        .then(response => response.json())
        .then(data => {
            const clientsArea = document.getElementById('clientsArea');
            clientsArea.innerHTML = '';
            data.forEach(cliente => {
                const clientDiv = document.createElement('div');
                clientDiv.textContent = `Nombre: ${cliente.nombreCliente} - Apellido: ${cliente.apellidoCliente} - Teléfono: ${cliente.telefonoCliente} - Dirección: ${cliente.direccionCliente}`;
                clientsArea.appendChild(clientDiv);
            });
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
        });
    }

    // Generar factura
    document.getElementById('generateInvoiceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        generateInvoice();
    });

    function generateInvoice() {
        const idPedido = document.getElementById('invoiceOrderId').value;
        const idTipoFactura = document.getElementById('invoiceTypeId').value;
        const url = `http://localhost:8080/facturas?idPedido=${idPedido}&idTipoFactura=${idTipoFactura}`;

        fetch(url, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Factura generada:', data);
        })
        .catch(error => {
            console.error('Error al generar la factura:', error);
        });
    }

    // Obtener usuarios y clientes
    function fetchUsersAndClients() {
        fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(users => {
            const orderUserSelect = document.getElementById('orderUser');
            orderUserSelect.innerHTML = '';
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.idUsuario;
                option.textContent = user.nombreUsuario;
                orderUserSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });

        fetch('http://localhost:8080/clientes')
        .then(response => response.json())
        .then(clients => {
            const orderClientSelect = document.getElementById('orderClient');
            orderClientSelect.innerHTML = '';
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.idCliente;
                option.textContent = client.nombreCliente;
                orderClientSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
        });


    }

    document.addEventListener('DOMContentLoaded', function() {
        // Otros códigos...
        fetchTablesForSelect();
        // Otros códigos...
    });
    
    document.getElementById('manageTablesBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('manageTablesSection').classList.remove('hidden');
        fetchTablesForSelect(); // Llama a la función aquí para obtener las mesas al mostrar la sección.
    });
    document.getElementById('takeOrderBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('takeOrderSection').classList.remove('hidden');
        fetchUsersAndClients();
        fetchOrdersForSelect(); // Llama a la función aquí para obtener los pedidos al tomar un nuevo pedido.
        fetchMenuItemsForSelect(); // Llama a la función aquí para obtener los ítems del menú al tomar un nuevo pedido.
    });
    
    document.getElementById('processPaymentBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('processPaymentSection').classList.remove('hidden');
        fetchInvoicesForSelect(); // Llama a la función aquí para obtener las facturas al procesar un pago.
    });
    
    function fetchTablesForSelect() {
        fetch('http://localhost:8080/mesas')
        .then(response => response.json())
        .then(data => {
            const assignTableIdSelect = document.getElementById('assignTableId');
            const editTableIdSelect = document.getElementById('editTableId');
            const deleteTableIdSelect = document.getElementById('deleteTableId');
    
            assignTableIdSelect.innerHTML = '';
            editTableIdSelect.innerHTML = '';
            deleteTableIdSelect.innerHTML = '';
    
            data.forEach(mesa => {
                if (mesa && mesa.estadoMesa) { // Verifica si mesa y mesa.estadoMesa están presentes
                    // Para el formulario de asignar mesa
                    const assignOption = document.createElement('option');
                    assignOption.value = mesa.idMesa;
                    assignOption.textContent = `Mesa ${mesa.idMesa} - ${mesa.estadoMesa.estadoMesa}`;
                    assignTableIdSelect.appendChild(assignOption);
    
                    // Para el formulario de editar mesa
                    const editOption = document.createElement('option');
                    editOption.value = mesa.idMesa;
                    editOption.textContent = mesa.idMesa;
                    editTableIdSelect.appendChild(editOption);
    
                    // Para el formulario de eliminar mesa
                    const deleteOption = document.createElement('option');
                    deleteOption.value = mesa.idMesa;
                    deleteOption.textContent = mesa.idMesa;
                    deleteTableIdSelect.appendChild(deleteOption);
                } else {
                    console.error('El objeto de mesa es nulo o no tiene la propiedad estadoMesa:', mesa);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener las mesas:', error);
        });
    }
    
    
    // Otras funciones aquí...
    
    
    function fetchOrdersForSelect() {
        fetch('http://localhost:8080/pedidos')
        .then(response => response.json())
        .then(data => {
            const updateOrderIdSelect = document.getElementById('updateOrderId');
            const assignOrderIdSelect = document.getElementById('assignOrderId');
            const calculateTipOrderIdSelect = document.getElementById('calculateTipOrderId');
            const invoiceOrderIdSelect = document.getElementById('invoiceOrderId');
    
            updateOrderIdSelect.innerHTML = '';
            assignOrderIdSelect.innerHTML = '';
            calculateTipOrderIdSelect.innerHTML = '';
            invoiceOrderIdSelect.innerHTML = '';
    
            data.forEach(pedido => {
                const option = document.createElement('option');
                option.value = pedido.idPedido;
                option.textContent = `Pedido ${pedido.idPedido}`;
                updateOrderIdSelect.appendChild(option.cloneNode(true));
                assignOrderIdSelect.appendChild(option.cloneNode(true));
                calculateTipOrderIdSelect.appendChild(option.cloneNode(true));
                invoiceOrderIdSelect.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => {
            console.error('Error al obtener los pedidos:', error);
        });
    }
    function fetchInvoicesForSelect() {
        fetch('http://localhost:8080/facturas')
        .then(response => response.json())
        .then(data => {
            const invoiceIdSelect = document.getElementById('invoiceId');
            invoiceIdSelect.innerHTML = '';
            data.forEach(factura => {
                const option = document.createElement('option');
                option.value = factura.idFactura;
                option.textContent = `Factura ${factura.idFactura}`;
                invoiceIdSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener las facturas:', error);
        });
    }
    function fetchMenuItemsForSelect() {
        fetch('http://localhost:8080/menu')
        .then(response => response.json())
        .then(data => {
            const orderItemsContainer = document.getElementById('orderItemsContainer');
            orderItemsContainer.innerHTML = '';
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.idItemMenu;
                option.textContent = `${item.nombreItem} - $${item.precio}`;
                orderItemsContainer.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los ítems de menú:', error);
        });
    }
    document.addEventListener('DOMContentLoaded', function() {
        // Otros códigos...
        fetchTablesForSelect();
        // Otros códigos...
    });
    document.getElementById('takeOrderBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('takeOrderSection').classList.remove('hidden');
        fetchUsersAndClients();
        fetchOrdersForSelect(); // Llama a la función aquí para obtener los pedidos al tomar un nuevo pedido.
        fetchMenuItemsForSelect(); // Llama a la función aquí para obtener los ítems del menú al tomar un nuevo pedido.
    });
    
    document.getElementById('processPaymentBtn').addEventListener('click', function() {
        hideAllSections();
        document.getElementById('processPaymentSection').classList.remove('hidden');
        fetchInvoicesForSelect(); // Llama a la función aquí para obtener las facturas al procesar un pago.
    });
                        
});

