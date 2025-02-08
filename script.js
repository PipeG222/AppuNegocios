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

});


// Funcion para contenido de acuerdo al tamaño de la pantalla
document.addEventListener("DOMContentLoaded", function () {
    function ajustarCarrusel() {
        const anchoPantalla = window.innerWidth;
        const carrusel = document.getElementById("carouselExampleIndicators");
        const contenidoEscritorio = `
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="planes">
                        <div class="plan" alt="Slide 1">
                            <div class="icono"><img src="Img/Planes/pyme.png" alt="" height="80" style="padding: 10px;"></div>
                            <h2>PYME</h2>
                            <p class="precio">$30.000/mes</p>
                            <ul>
                                <li>Sistema POS básico</li>
                                <li>Appu Reservas</li>
                                <li>Gestión de inventarios</li>
                                <li>Módulo de proveedores</li>
                                <li>Fiado a clientes</li>
                                <li>Contabilidad</li>
                                <li>Inteligencia Artificial Pyme</li>
                            </ul>
                            <button>Empezar Ahora</button>
                        </div>
                        <div class="plan recomendado" alt="Slide 2">
                            <span class="etiqueta">⭐ Recomendado</span>
                            <div class="icono"><img src="Img/Planes/plus.png" alt="" height="80" style="padding: 10px;"></div>
                            <h2>PLUS</h2>
                            <p class="precio">$70.000/mes</p>
                            <ul>
                                <li>Sistema POS</li>
                                <li>Appu Reservas</li>
                                <li>Facturación electrónica</li>
                                <li>Gestión de inventarios</li>
                                <li>Módulo de proveedores</li>
                                <li>Fiado a clientes</li>
                                <li>Contabilidad</li>
                                <li>Inteligencia Artificial Plus</li>
                            </ul>
                            <button>Ver Todos</button>
                        </div>

                        <div class="plan" alt="Slide 3">
                            <div class="icono"><img src="Img/Planes/pro.png" alt="" height="80" style="padding: 10px;"></div>
                            <h2>PRO</h2>
                            <p class="precio">$209.000/mes</p>
                            <ul>
                                <li>Sistema POS</li>
                                <li>Appu Reservas</li>
                                <li>Facturación electrónica</li>
                                <li>Análisis de inventarios</li>
                                <li>Gestión de inventarios</li>
                                <li>Gestión gastos de día</li>
                                <li>Módulo de proveedores</li>
                                <li>Fiado a clientes</li>
                                <li>Contabilidad Pro (SIIGO)</li>
                                <li>Inteligencia Artificial Plus</li>
                                <li>Soporte Técnico</li>
                            </ul>
                            <button>Ver Todos</button>
                        </div>
                    </div>
                    
                </div>
                <div class="carousel-item">
                    <div class="planes">
                        <div class="plan" alt="Slide 3">
                            <div class="icono"><img src="Img/Planes/pro.png" alt="" height="80" style="padding: 10px;"></div>
                            <h2>PRO</h2>
                            <p class="precio">$209.000/mes</p>
                            <ul>
                                <li>Sistema POS</li>
                                <li>Appu Reservas</li>
                                <li>Facturación electrónica</li>
                                <li>Análisis de inventarios</li>
                                <li>Gestión de inventarios</li>
                                <li>Gestión gastos de día</li>
                                <li>Módulo de proveedores</li>
                                <li>Fiado a clientes</li>
                                <li>Contabilidad Pro (SIIGO)</li>
                                <li>Inteligencia Artificial Plus</li>
                                <li>Soporte Técnico</li>
                            </ul>
                            <button>Ver Todos</button>
                        </div>
                        <div class="plan" alt="Slide 4">
                            <div class="icono"><img src="Img/Planes/pro+.png" alt="" height="80" style="padding: 10px;"></div>
                            <h2>PRO+</h2>
                            <p class="precio">$289.000/mes</p>
                            <ul>
                                <li>Sistema POS</li>
                                <li>Appu Reservas</li>
                                <li>Facturación electrónica</li>
                                <li>Análisis de inventarios</li>
                                <li>Gestión de inventarios</li>
                                <li>Gestión gastos de día</li>
                                <li>Módulo de proveedores</li>
                                <li>Fiado a clientes</li>
                                <li>Opción selección de cajero</li>
                                <li>Contabilidad Pro (SIIGO)</li>
                                <li>Marketing y Visibilidad</li>
                                <li>Proyección con IA avanzada</li>
                                <li>Personalización y API</li>
                                <li>Soporte Técnico</li>
                            </ul>
                            <button>Ver Todos</button>
                        </div>

                        <div class="plan" alt="Slide 5">
                            <div class="icono">📤</div>
                            <h2>Appu Droguerias</h2>
                            <p class="precio">$80.000/mes</p>
                            <ul>
                                <li>Sistema POS</li>
                                <li>Appu Reservas</li>
                                <li>Facturacion electrónica</li>
                                <li>Gestión de inventarios</li>
                                <li>Contabilidad</li>
                                <li>Módulo de proveedores</li>
                                <li>Fiado a clientes</li>
                                <li>Inteligencia Artificial Plus</li>
                            </ul>
                            <button>Ver Todos</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: #8EC343; border-radius: 15px; padding: 10px;"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: #8EC343; border-radius: 15px; padding: 10px;"></span>
                <span class="visually-hidden">Next</span>
            </button>`;

        const contenidoMovil = `
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="plan" alt="Slide 1">
                        <div class="icono"><img src="Img/Planes/pyme.png" alt="" height="80" style="padding: 10px;"></div>
                        <h2>PYME</h2>
                        <p class="precio">$30.000/mes</p>
                        <ul>
                            <li>Sistema POS básico</li>
                            <li>Appu Reservas</li>
                            <li>Gestión de inventarios</li>
                            <li>Módulo de proveedores</li>
                            <li>Fiado a clientes</li>
                            <li>Contabilidad</li>
                            <li>Inteligencia Artificial Pyme</li>
                        </ul>
                        <button>Empezar Ahora</button>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="plan recomendado" alt="Slide 2">
                        <span class="etiqueta">⭐ Recomendado</span>
                        <div class="icono"><img src="Img/Planes/plus.png" alt="" height="80" style="padding: 10px;"></div>
                        <h2>PLUS</h2>
                        <p class="precio">$70.000/mes</p>
                        <ul>
                            <li>Sistema POS</li>
                            <li>Appu Reservas</li>
                            <li>Facturación electrónica</li>
                            <li>Gestión de inventarios</li>
                            <li>Módulo de proveedores</li>
                            <li>Fiado a clientes</li>
                            <li>Contabilidad</li>
                            <li>Inteligencia Artificial Plus</li>
                        </ul>
                        <button>Ver Todos</button>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="plan" alt="Slide 3">
                        <div class="icono"><img src="Img/Planes/pro.png" alt="" height="80" style="padding: 10px;"></div>
                        <h2>PRO</h2>
                        <p class="precio">$209.000/mes</p>
                        <ul>
                            <li>Sistema POS</li>
                            <li>Appu Reservas</li>
                            <li>Facturación electrónica</li>
                            <li>Análisis de inventarios</li>
                            <li>Gestión de inventarios</li>
                            <li>Gestión gastos de día</li>
                            <li>Módulo de proveedores</li>
                            <li>Fiado a clientes</li>
                            <li>Contabilidad Pro (SIIGO)</li>
                            <li>Inteligencia Artificial Plus</li>
                            <li>Soporte Técnico</li>
                        </ul>
                        <button>Ver Todos</button>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="plan" alt="Slide 4">
                        <div class="icono"><img src="Img/Planes/pro+.png" alt="" height="80" style="padding: 10px;"></div>
                        <h2>PRO+</h2>
                        <p class="precio">$289.000/mes</p>
                        <ul>
                            <li>Sistema POS</li>
                            <li>Appu Reservas</li>
                            <li>Facturación electrónica</li>
                            <li>Análisis de inventarios</li>
                            <li>Gestión de inventarios</li>
                            <li>Gestión gastos de día</li>
                            <li>Módulo de proveedores</li>
                            <li>Fiado a clientes</li>
                            <li>Opción selección de cajero</li>
                            <li>Contabilidad Pro (SIIGO)</li>
                            <li>Marketing y Visibilidad</li>
                            <li>Proyección con IA avanzada</li>
                            <li>Personalización y API</li>
                            <li>Soporte Técnico</li>
                        </ul>
                        <button>Ver Todos</button>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="plan" alt="Slide 5">
                        <div class="icono">📤</div>
                        <h2>Appu Droguerias</h2>
                        <p class="precio">$80.000/mes</p>
                        <ul>
                            <li>Sistema POS</li>
                            <li>Appu Reservas</li>
                            <li>Facturacion electrónica</li>
                            <li>Gestión de inventarios</li>
                            <li>Contabilidad</li>
                            <li>Módulo de proveedores</li>
                            <li>Fiado a clientes</li>
                            <li>Inteligencia Artificial Plus</li>
                        </ul>
                        <button>Ver Todos</button>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: #8EC343; border-radius: 15px; padding: 10px;"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: #8EC343; border-radius: 15px; padding: 10px;"></span>
                <span class="visually-hidden">Next</span>
            </button>`;

        // Cambiar contenido según el tamaño de la pantalla
        if (anchoPantalla > 768) {
            carrusel.innerHTML = contenidoEscritorio;
        } else {
            carrusel.innerHTML = contenidoMovil;
        }
    }

    // Ejecutar la función cuando cargue la página
    ajustarCarrusel();

    // Volver a ajustar cuando la pantalla cambie de tamaño
    window.addEventListener("resize", ajustarCarrusel);
});

