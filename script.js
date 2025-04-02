document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                entry.target.classList.remove('disappear');
            } else {
                entry.target.classList.remove('appear');
                entry.target.classList.add('disappear');
            }
        });
    });

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.slideInRight').forEach(element => {
        observer.observe(element);
    });

    document.getElementById("formularioRegistro").addEventListener("submit", async (event) => {
        event.preventDefault();

        const datos = {
            nombre: document.getElementById("nombre2").value,
            email: document.getElementById("email2").value,
            telefono: document.getElementById("telefono2").value,
        };

        console.log("Datos a enviar:", datos);
        const response = await fetch("https://34053pzrhb.execute-api.us-east-1.amazonaws.com/produccion/registro", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: { "Content-Type": "application/json" }
        });

        console.log("Respuesta del servidor:", response);
        alert("¡Gracias por registrarte! Pronto nos pondremos en contacto contigo.");
        document.getElementById("nombre2").value = "";
        document.getElementById("email2").value = "";
        document.getElementById("telefono2").value = "";
    });

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            console.log('Hamburger clicked'); // Para debugging
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    // Función para mostrar y ocultar el chat de WhatsApp
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

    // Manejo del menú select
    const menuSelect = document.getElementById('menuSelect');
    if (menuSelect) {
        menuSelect.addEventListener('change', function () {
            const selectedValue = this.value;
            if (selectedValue.startsWith('http')) {
                window.open(selectedValue, '_blank');
            } else {
                window.location.href = selectedValue;
            }
        });
    }

    // Manejo del select de ciudad
    const ciudadSelect = document.getElementById('ciduadSelect');
    if (ciudadSelect) {
        ciudadSelect.addEventListener('change', function () {
            const selectedCity = this.value;
            // Aquí puedes agregar la lógica para manejar el cambio de ciudad
            console.log('Ciudad seleccionada:', selectedCity);
        });
    }
});

// Funcion de pago de Wompi
async function pagar(monto) {

    const costo = monto * 100; // Convertir a centavos
    const reference = generarReferencia(); // Generar referencia a partir de la marca de tiempo y un número aleatorio con la función generarReferencia
    console.log('Referencia:', reference); // Imprimir referencia en consola

    // Llamar a la API de Wompi para generar la firma
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


    let checkout = new WidgetCheckout({
        currency: 'COP',
        amountInCents: costo,
        reference: reference,
        publicKey: 'pub_prod_QoWdrRWpXVDd9GMwZrqKAtyy56Er45YU',
        signature: { integrity: signature },
    })

    // 
    checkout.open(function (result) {
        let transaction = result.transaction;
        // console.log("Transaction ID: ", transaction.id);
        // console.log("Transaction object: ", transaction);

        if (transaction.status === 'APPROVED') {
            alert("¡Pago exitoso!");
            window.location.href = "/planes/checkout/index.html";
        }
    });

}

function generarReferencia() {
    const timestamp = Date.now(); // Marca de tiempo en milisegundos
    const random = Math.floor(Math.random() * 1000000); // Número aleatorio
    return `REF-${timestamp}-${random}`;
}

// Slider de Aliados
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slideTrack = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');

    // Clonar slides si hay menos de 4
    if (slides.length < 4) {
        const slidesToAdd = 4 - slides.length;
        for (let i = 0; i < slidesToAdd; i++) {
            const clonedSlide = slides[i % slides.length].cloneNode(true);
            slideTrack.appendChild(clonedSlide);
        }
    }

    const originalSlidesCount = slideTrack.children.length;
    const totalGroups = Math.ceil(originalSlidesCount / 4);

    // Función para ir a un grupo específico de slides
    function goToGroup(groupIndex) {
        const slideWidth = slider.offsetWidth / 4;
        const offset = -(groupIndex * 4) * slideWidth;
        slideTrack.style.transform = `translateX(${offset}px)`;

        // Actualizar estado de los dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === groupIndex);
        });

        // Actualizar estado de los botones
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

    nextButton.addEventListener('click', () => {
        if (currentGroup < totalGroups - 1) {
            currentGroup++;
            goToGroup(currentGroup);
        }
    });

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentGroup = index;
            goToGroup(currentGroup);
        });
    });

    // Inicializar el slider
    goToGroup(0);
});


