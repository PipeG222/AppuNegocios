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

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
});

// Funcion de pago de Wompi
// async function pagar(monto) {

//     const costo = monto * 100;
//     const response = await fetch('https://34053pzrhb.execute-api.us-east-1.amazonaws.com/produccion/WOMPI/generate-signature', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             currency: 'COP',
//             amountInCents: costo,
//             reference: 'REF123'
//         })
//     });

//     const data = await response.json();
//     const signature = data.signature;

//     WompiWidget.init({
//         currency: 'COP',
//         amountInCents: monto * 100,
//         reference: 'REF123',
//         signature: signature
//     }, function (response) {
//         if (response.success) {
//             console.log('Pago exitoso', response);
//             window.location.href = `planes/confirmacion/index.html?transactionId=${response.transactionId}`;
//         } else {
//             console.error('Error en el pago', response);
//         }
//     });
// }
// async function pagar(monto) {
//     try {
//         // Llamar a la Lambda 1 para obtener el signature
//         const costo = monto * 100;
//         const response = await fetch('https://34053pzrhb.execute-api.us-east-1.amazonaws.com/produccion/WOMPI/generate-signature', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 reference: 'REF123',
//                 amountInCents: costo,
//                 currency: 'COP',
//             })
//         });

//         const data = await response.json();
//         const signatureFirma = data.signature;
//         console.log('Signature:', signatureFirma);

//         // Configurar el widget personalizado
//         const checkout = new WidgetCheckout({
//             currency: 'COP',
//             amountInCents: costo,
//             reference: '3b4393bafed398ba2',
//             publicKey: 'pub_test_AvVRqBQmU5yG9Dotd6K4BX8sf5jOYzD7', // Cambia a tu clave pública en producción
//             signature: { integrity: signatureFirma },
//             // redirectUrl: 'https://tu-sitio.com/confirmacion', // Opcional
//         });

//         console.log('Widget configurado:', checkout);

//         // Abrir el widget de Wompi
//         checkout.open(function (response) {
//             console.log('Respuesta del widget:', response);
//             if (response.success) {
//                 console.log('Pago exitoso', response);
//                 window.location.href = `planes/confirmacion/index.html?transactionId=${response.transactionId}`;
//             } else {
//                 console.error('Error en el pago', response);
//             }
//         });
//     } catch (error) {
//         console.error('Error al procesar el pago:', error);
//     }
// }


function generarReferencia() {
    const timestamp = Date.now(); // Marca de tiempo en milisegundos
    const random = Math.floor(Math.random() * 1000000); // Número aleatorio
    return `REF-${timestamp}-${random}`;
}

async function generarFirma(reference, amount) {
    const costo = amount * 100; // Convertir a centavos

    try {
        const response = await fetch('https://34053pzrhb.execute-api.us-east-1.amazonaws.com/produccion/WOMPI/generate-signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reference: reference,
                amountInCents: costo,
                currency: 'COP',
            })
        });

        const data = await response.json();
        return data.signature || null;
    } catch (error) {
        console.error("Error al obtener la firma:", error);
        return null;
    }
}

async function cargarWidget(amount) {
    const reference = generarReferencia();
    const signature = await generarFirma(reference, amount);
    if (!signature) {
        alert("Error al generar la firma.");
        return;
    }

    // Remover cualquier script anterior de Wompi
    const oldScript = document.getElementById("wompi-widget");
    if (oldScript) {
        oldScript.remove();
    }

    // Crear un nuevo script con los parámetros dinámicos
    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.setAttribute("data-render", "button");
    script.setAttribute("data-public-key", "pub_test_AvVRqBQmU5yG9Dotd6K4BX8sf5jOYzD7");
    script.setAttribute("data-currency", "COP");
    script.setAttribute("data-amount-in-cents", amount * 100);
    script.setAttribute("data-reference", reference);
    script.setAttribute("data-signature-integrity", signature);
    script.id = "wompi-widget";

    // Insertar el script en el formulario
    document.getElementById("payment-form").appendChild(script);
}

function pagar(monto) {
    cargarWidget(monto);
};



