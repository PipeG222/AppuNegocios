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
async function pagar(monto) {

    const costo = monto * 100;
    const reference = generarReferencia();
    console.log('Referencia:', reference);

    const response = await fetch('https://34053pzrhb.execute-api.us-east-1.amazonaws.com/produccion/WOMPI/generate-signature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
        publicKey: 'pub_test_AvVRqBQmU5yG9Dotd6K4BX8sf5jOYzD7',
        signature: { integrity: signature }
    })

    // 
    checkout.open(function (result) {
        let transaction = result.transaction;
        console.log("Transaction ID: ", transaction.id);
        console.log("Transaction object: ", transaction);
    });

}


function generarReferencia() {
    const timestamp = Date.now(); // Marca de tiempo en milisegundos
    const random = Math.floor(Math.random() * 1000000); // Número aleatorio
    return `REF-${timestamp}-${random}`;
}


