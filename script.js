// Espera a que todo el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Crea un observer que detecta cuando los elementos aparecen o desaparecen en la pantalla
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible en la pantalla, se le añade la clase 'appear' y se le quita 'disappear'
                entry.target.classList.add('appear');
                entry.target.classList.remove('disappear');
            } else {
                // Si el elemento ya no está visible, se le quita 'appear' y se le añade 'disappear'
                entry.target.classList.remove('appear');
                entry.target.classList.add('disappear');
            }
        });
    });

    // Se seleccionan todos los elementos con clase 'fade-in-up' y se observa cada uno
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // También se observan los elementos con clase 'slideInRight'
    document.querySelectorAll('.slideInRight').forEach(element => {
        observer.observe(element);
    });

    // Manejo del envío del formulario de registro
    document.getElementById("formularioRegistro").addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Se recogen los datos del formulario
        const datos = {
            nombre: document.getElementById("nombre2").value,
            email: document.getElementById("email2").value,
            telefono: document.getElementById("telefono2").value,
        };

        console.log("Datos a enviar:", datos);

        // Envío de los datos a una API por POST en formato JSON
        const response = await fetch("https://34053pzrhb.execute-api.us-east-1.amazonaws.com/produccion/registro", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: { "Content-Type": "application/json" }
        });

        console.log("Respuesta del servidor:", response);

        // Alerta de confirmación y limpieza de los campos del formulario
        alert("¡Gracias por registrarte! Pronto nos pondremos en contacto contigo.");
        document.getElementById("nombre2").value = "";
        document.getElementById("email2").value = "";
        document.getElementById("telefono2").value = "";
    });

    // Lógica del botón hamburguesa para el menú móvil
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // Botón para mostrar u ocultar el chat de WhatsApp
    document.getElementById('whatsappButton').addEventListener('click', function () {
        let chatBox = document.getElementById('chatBox'); // Obtener el chat de WhatsApp  

        // Si el chat está abierto, cerrarlo. Si está cerrado, abrirlo.
        if (chatBox.classList.contains('open')) {
            chatBox.classList.remove('open');
            setTimeout(() => {
                chatBox.style.display = 'none';
            }, 300);
        } else {
            chatBox.style.display = 'flex';
            setTimeout(() => {
                chatBox.classList.add('open');
            }, 10);
        }
    });

    // Cambio de selección en un menú select de navegación
    const menuSelect = document.getElementById('menuSelect');
    if (menuSelect) {
        menuSelect.addEventListener('change', function () {
            const selectedValue = this.value;
            if (selectedValue.startsWith('http')) {
                window.open(selectedValue, '_blank'); // Abre enlace externo
            } else {
                window.location.href = selectedValue; // Navega internamente
            }
        });
    }

    // Selección de ciudad en un select
    const ciudadSelect = document.getElementById('ciduadSelect');
    if (ciudadSelect) {
        ciudadSelect.addEventListener('change', function () {
            const selectedCity = this.value;
            // Aquí puedes agregar la lógica para manejar el cambio de ciudad
            console.log('Ciudad seleccionada:', selectedCity);
        });
    }

    // Manejo del menú modal en pantallas grandes
    const menuBtn = document.getElementById('menuBtn');
    const menuModal = document.getElementById('menuModal');
    let modalVisible = false;

    // Abre el modal con posición adecuada dependiendo de la pantalla
    function openModal(clickEvent) {
        clickEvent.stopPropagation();

        if (window.innerWidth >= 992) {
            // Para pantallas medianas, posicionar debajo del botón
            const buttonRect = menuBtn.getBoundingClientRect();
            menuModal.style.top = (buttonRect.bottom + 10) + 'px';
            menuModal.style.left = (buttonRect.left) + 'px';
        }

        menuModal.style.display = 'block';
        setTimeout(() => {
            menuModal.classList.add('active');
        }, 10);
        modalVisible = true;
    }

    // Cierra el modal
    function closeModal() {
        menuModal.classList.remove('active');
        hamburger.classList.remove('active');
        setTimeout(() => {
            menuModal.style.display = 'none';
        }, 300);
        modalVisible = false;
    }

    // Eventos para abrir y cerrar el modal
    if (menuBtn) {
        menuBtn.addEventListener('click', openModal);
    }

    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            if (!modalVisible) {
                openModal(e);
                this.classList.add('active');
            } else {
                closeModal();
            }
        });
    }

    // Cierra el modal si se hace clic fuera de él
    document.addEventListener('click', function (e) {
        if (modalVisible && !menuModal.contains(e.target) &&
            e.target !== menuBtn && e.target !== hamburger &&
            !hamburger.contains(e.target)) {
            closeModal();
        }
    });

    // Cierra el modal al hacer clic en algún enlace dentro de él
    menuModal.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeModal);
    });
});

// Función para iniciar un pago con Wompi
async function pagar(monto) {

    const costo = monto * 100; // Convierte el valor a centavos (Wompi lo requiere así)
    const reference = generarReferencia(); // Genera una referencia única para el pago
    console.log('Referencia:', reference);

    // Solicita una firma de integridad desde una API intermedia
    const response = await fetch('https://34053pzrhb.execute-api.us-east-1.amazonaws.com/produccion/WOMPI/generate-signature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Enviamos los datos necesarios para generar la firma
        body: JSON.stringify({
            currency: 'COP',
            amountInCents: costo,
            reference: reference
        })
    });

    const data = await response.json();
    console.log('Firma:', data);
    const signature = data.signature;
    console.log('Firma:', signature);

    // Configura y abre el widget de pago de Wompi
    let checkout = new WidgetCheckout({
        currency: 'COP',
        amountInCents: costo,
        reference: reference,
        publicKey: 'pub_prod_QoWdrRWpXVDd9GMwZrqKAtyy56Er45YU',
        signature: { integrity: signature },
    })

    // Cuando el usuario termina el pago
    checkout.open(function (result) {
        let transaction = result.transaction;
        // console.log("Transaction ID: ", transaction.id);
        // console.log("Transaction object: ", transaction);

        if (transaction.status === 'APPROVED') {
            alert("¡Pago exitoso!");
            window.location.href = "/planes/checkout/index.html"; // Redirige tras pago exitoso
        }
    });
}

// Función para generar una referencia de pago única
function generarReferencia() {
    const timestamp = Date.now(); // Hora actual
    const random = Math.floor(Math.random() * 1000000); // Número aleatorio
    return `REF-${timestamp}-${random}`; // Formato de referencia: REF-tiempo-random
}
// Control del slider de aliados (patrocinadores, clientes, etc.)
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slideTrack = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');

    // Si hay menos de 4 slides, se clonan para completar al menos 4
    if (slides.length < 4) {
        const slidesToAdd = 4 - slides.length;
        for (let i = 0; i < slidesToAdd; i++) {
            const clonedSlide = slides[i % slides.length].cloneNode(true);
            slideTrack.appendChild(clonedSlide);
        }
    }

    const originalSlidesCount = slideTrack.children.length;
    const totalGroups = Math.ceil(originalSlidesCount / 4); // Cuántos grupos de 4 hay

    // Cambia el grupo visible del slider
    function goToGroup(groupIndex) {
        const slideWidth = slider.offsetWidth / 4;
        const offset = -(groupIndex * 4) * slideWidth;
        slideTrack.style.transform = `translateX(${offset}px)`;

        // Actualiza los puntos/dots de navegación
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === groupIndex);
        });

        // Ajusta la visibilidad de botones según la posición
        prevButton.style.opacity = groupIndex === 0 ? '0.5' : '1';
        prevButton.style.cursor = groupIndex === 0 ? 'default' : 'pointer';
        nextButton.style.opacity = groupIndex === totalGroups - 1 ? '0.5' : '1';
        nextButton.style.cursor = groupIndex === totalGroups - 1 ? 'default' : 'pointer';
    }

    let currentGroup = 0;

    // Event listeners para los botones de navegación
    prevButton.addEventListener('click', () => {
        if (currentGroup > 0) {
            currentGroup--;
            goToGroup(currentGroup);
        }
    });

    // Botón siguiente
    nextButton.addEventListener('click', () => {
        if (currentGroup < totalGroups - 1) {
            currentGroup++;
            goToGroup(currentGroup);
        }
    });

    // Click en los puntos/dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentGroup = index;
            goToGroup(currentGroup);
        });
    });

    // Inicializa el slider en el primer grupo
    goToGroup(0);
});
