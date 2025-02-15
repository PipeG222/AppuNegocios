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

    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
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

    }

    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        const images = container.querySelectorAll('.sequence-image');
        let currentIndex = 0;

        function showNextImage() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }

        // Mostrar la primera imagen inicialmente
        images[currentIndex].classList.add('active');

        // Cambiar la imagen cada 3 segundos
        setInterval(showNextImage, 800);
    });

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
});





