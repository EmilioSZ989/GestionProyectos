document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener los elementos del menú desde el backend
    fetch('http://localhost:8080/menu')
        .then(response => response.json())
        .then(data => {
            const menuItemsDiv = document.getElementById('menuItems');
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('menu-item');
                itemDiv.innerHTML = `
                    <h3>${item.nombreItem}</h3>
                    <p>${item.descripcion}</p>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                    <p>Categoría: ${item.categoria.nombreCategoria}</p>
                `;
                menuItemsDiv.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error fetching menu items:', error));

    // Funcionalidad del modal de inicio de sesión
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');

    // Función para abrir el modal al hacer clic en el botón de inicio de sesión
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Función para cerrar el modal al hacer clic en la "x"
    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Función para cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Funcionalidad del formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación básica del formulario
        if (!username || !password) {
            displayError('Por favor, complete todos los campos.');
            return;
        }

        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: username, contrasena: password })
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Credenciales incorrectas. Intente nuevamente.');
                } else {
                    throw new Error('Error en el servidor. Por favor, inténtelo más tarde.');
                }
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data);
            loginModal.style.display = 'none'; // Cierra el modal
            if (data.tipoUsuario.tipoUsuario === 'Administrador') {
                window.location.href = 'admin.html'; // Redireccionar a la página de administrador
            } else if (data.tipoUsuario.tipoUsuario === 'Mesero') {
                window.location.href = 'mesero.html'; // Redireccionar a la página de mesero
            } else {
                displayError('Tipo de usuario desconocido.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            displayError(error.message);
        });
    });

    function displayError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
    }

    // Funcionalidad de la galería de imágenes
    const imgGaleria = document.querySelectorAll('.img-galeria');
    const imgLight = document.querySelector('.img-light');
    const agregarImagen = document.querySelector('.agregar-imagen');

    imgGaleria.forEach(img => {
        img.addEventListener('click', () => {
            const imgSrc = img.getAttribute('src');
            agregarImagen.src = imgSrc;
            imgLight.classList.add('show');
            agregarImagen.classList.add('showImage');
            agregarImagen.style.maxWidth = "80vw"; // Establecer tamaño máximo inicial para la imagen ampliada
            agregarImagen.style.maxHeight = "80vh";
        });
    });

    imgLight.addEventListener('click', (e) => {
        if (e.target !== agregarImagen && e.target !== closeBtn) {
            imgLight.classList.remove('show');
            agregarImagen.classList.remove('showImage');
        }
    });

    closeBtn.addEventListener('click', () => {
        imgLight.classList.remove('show');
        agregarImagen.classList.remove('showImage');
    });
});
