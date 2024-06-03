document.addEventListener('DOMContentLoaded', function() {
    // Fetch menu items from the backend
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

    // Login modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: username, contrasena: password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        })
        .then(data => {
            console.log('Login successful:', data);
            if (data.tipoUsuario.tipoUsuario === 'Administrador') {
                window.location.href = 'admin.html'; // Redireccionar a la página de administrador
            } else if (data.tipoUsuario.tipoUsuario === 'Mesero') {
                window.location.href = 'mesero.html'; // Redireccionar a la página de mesero
            } else {
                console.error('Unknown user type');
            }
        })
        .catch(error => console.error('Error during login:', error));
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const imgGaleria = document.querySelectorAll('.img-galeria');
    const imgLight = document.querySelector('.img-light');
    const agregarImagen = document.querySelector('.agregar-imagen');
    const closeBtn = document.querySelector('.close');

    imgGaleria.forEach(img => {
        img.addEventListener('click', () => {
            const imgSrc = img.getAttribute('src');
            agregarImagen.src = imgSrc;
            imgLight.classList.add('show');
            agregarImagen.classList.add('showImage');
            // Establecer tamaño inicial máximo para la imagen ampliada
            agregarImagen.style.maxWidth = "80vw";
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
