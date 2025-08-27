/* ===================================
   ENCOMIENDAS USA-SV - JAVASCRIPT
   ================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // NAVEGACIÓN MÓVIL
    // ===================================

    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');

    // Toggle del menú móvil
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');

        // Cambiar icono entre hamburguesa y X
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Cerrar menú móvil al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // ===================================
    // VALIDACIÓN DEL FORMULARIO
    // ===================================

    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const formFields = ['nombre', 'email', 'telefono', 'tipo-envio', 'mensaje'];

    // Solo ejecutar validación si el formulario existe
    if (!contactForm) {
        console.log('Formulario de contacto no encontrado - funcionalidad deshabilitada');
    }

    // Función para mostrar errores
    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        const field = document.getElementById(fieldId);

        if (errorElement && field) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.style.borderColor = '#e74c3c';
            field.setAttribute('aria-invalid', 'true');
        }
    }

    // Función para limpiar errores
    function clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + '-error');
        const field = document.getElementById(fieldId);

        if (errorElement && field) {
            errorElement.style.display = 'none';
            field.style.borderColor = '#ddd';
            field.removeAttribute('aria-invalid');
        }
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar teléfono
    function isValidPhone(phone) {
        // Acepta números con o sin formato internacional
        const phoneRegex = /^[\+]?[1-9][\d]{7,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 8;
    }

    // Función para validar nombre
    function isValidName(name) {
        // Al menos 2 caracteres, solo letras, espacios y algunos caracteres especiales
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }

    // Validación individual de campos
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) {
            console.warn(`Campo ${fieldId} no encontrado`);
            return false;
        }

        const value = field.value.trim();

        switch(fieldId) {
            case 'nombre':
                if (!value) {
                    showError(fieldId, 'Por favor, ingresa tu nombre completo.');
                    return false;
                } else if (!isValidName(value)) {
                    showError(fieldId, 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras.');
                    return false;
                }
                break;

            case 'email':
                if (!value) {
                    showError(fieldId, 'Por favor, ingresa tu correo electrónico.');
                    return false;
                } else if (!isValidEmail(value)) {
                    showError(fieldId, 'Por favor, ingresa un correo electrónico válido.');
                    return false;
                }
                break;

            case 'telefono':
                if (!value) {
                    showError(fieldId, 'Por favor, ingresa tu número de teléfono.');
                    return false;
                } else if (!isValidPhone(value)) {
                    showError(fieldId, 'Por favor, ingresa un número de teléfono válido (mínimo 8 dígitos).');
                    return false;
                }
                break;

            case 'tipo-envio':
                if (!value) {
                    showError(fieldId, 'Por favor, selecciona el tipo de envío.');
                    return false;
                }
                break;

            case 'mensaje':
                if (!value) {
                    showError(fieldId, 'Por favor, ingresa tu mensaje.');
                    return false;
                } else if (value.length < 10) {
                    showError(fieldId, 'El mensaje debe tener al menos 10 caracteres.');
                    return false;
                } else if (value.length > 500) {
                    showError(fieldId, 'El mensaje no puede exceder 500 caracteres.');
                    return false;
                }
                break;
        }

        clearError(fieldId);
        return true;
    }

    // Validación en tiempo real - solo si el formulario existe
    if (contactForm) {
        formFields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            if (field) {
                // Validar al perder el foco
                field.addEventListener('blur', function() {
                    validateField(fieldId);
                });

                // Limpiar errores al escribir
                field.addEventListener('input', function() {
                    clearError(fieldId);
                });
            }
        });
    }

    // Envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Validar todos los campos
            formFields.forEach(function(fieldId) {
                if (!validateField(fieldId)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Mostrar mensaje de éxito
                successMessage.style.display = 'block';
                successMessage.setAttribute('role', 'alert');

                // Limpiar formulario
                contactForm.reset();

                // Scroll al mensaje de éxito
                successMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });

                // Enfocar el mensaje de éxito para lectores de pantalla
                successMessage.focus();

                // Ocultar mensaje después de 8 segundos
                setTimeout(function() {
                    successMessage.style.display = 'none';
                    successMessage.removeAttribute('role');
                }, 8000);

                // Aquí se integraría con un backend para enviar realmente el formulario
                console.log('Formulario enviado exitosamente');

                // Ejemplo de datos que se enviarían:
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                console.log('Datos del formulario:', data);

            } else {
                // Scroll al primer error
                const firstError = document.querySelector('.form-error[style*="block"]');
                if (firstError) {
                    const fieldWithError = firstError.parentElement.querySelector('input, select, textarea');
                    if (fieldWithError) {
                        fieldWithError.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        fieldWithError.focus();
                    }
                }
            }
        });
    }

    // ===================================
    // EFECTOS DE SCROLL
    // ===================================

    // Cambiar header al hacer scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Efecto de transparencia en el header
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }

        // Ocultar/mostrar header en scroll (opcional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Efecto parallax suave en el hero - optimizado
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // ===================================
    // ANIMACIONES AL HACER SCROLL
    // ===================================

    // Configuración del Intersection Observer con fallback
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    // Dejar de observar el elemento una vez animado
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos para animaciones - solo los que existen
        const elementsToAnimate = document.querySelectorAll(
            '.service-card, .mission, .vision'
        );

        elementsToAnimate.forEach(function(el) {
            observer.observe(el);
        });

        // Agregar formulario de contacto solo si existe
        const contactFormElement = document.querySelector('.contact-form');
        if (contactFormElement) {
            observer.observe(contactFormElement);
        }
    } else {
        // Fallback para navegadores sin soporte
        console.log('IntersectionObserver no soportado - animaciones deshabilitadas');
        const elementsToAnimate = document.querySelectorAll(
            '.service-card, .mission, .vision, .contact-form'
        );
        elementsToAnimate.forEach(function(el) {
            el.classList.add('fade-in-up');
        });
    }

    // ===================================
    // SMOOTH SCROLL PARA NAVEGACIÓN
    // ===================================

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // MEJORAS DE ACCESIBILIDAD
    // ===================================

    // Navegación por teclado mejorada
    document.addEventListener('keydown', function(e) {
        // Cerrar menú móvil con Escape
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
            mobileMenuToggle.focus();
        }
    });

    // Mejorar el foco en elementos interactivos
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(function(element) {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #FF6600';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // ===================================
    // FUNCIONES UTILITARIAS
    // ===================================

    // Función para detectar si el usuario prefiere movimiento reducido
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Deshabilitar animaciones si el usuario prefiere movimiento reducido
    if (prefersReducedMotion()) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Función para manejar errores de carga de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Error al cargar imagen:', this.src);
        });
    });

    // ===================================
    // INTEGRACIÓN CON REDES SOCIALES
    // ===================================

    // Función para abrir WhatsApp con mensaje predefinido
    function openWhatsApp(phoneNumber, message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }

    // Agregar funcionalidad a los enlaces de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // El comportamiento por defecto ya funciona, pero podemos agregar tracking
            console.log('WhatsApp link clicked');

            // Aquí se podría agregar Google Analytics o tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'Social',
                    event_label: 'WhatsApp'
                });
            }
        });
    });

    // Tracking para otros enlaces de redes sociales
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label') || 'Unknown';
            console.log(`${platform} link clicked`);

            // Tracking de redes sociales
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'Social',
                    event_label: platform
                });
            }
        });
    });

    // ===================================
    // PERFORMANCE Y OPTIMIZACIÓN
    // ===================================

    // Lazy loading para elementos que no son críticos
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Cargar contenido lazy aquí
                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(function(element) {
            lazyObserver.observe(element);
        });
    }

    // Debounce para eventos de scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Aplicar debounce a eventos de scroll costosos
    const debouncedScrollHandler = debounce(function() {
        // Aquí van las funciones de scroll que no necesitan ejecutarse en cada frame
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedScrollHandler);

    // ===================================
    // INICIALIZACIÓN FINAL
    // ===================================

    console.log('Encomiendas USA-SV - JavaScript cargado correctamente');

    // Mostrar mensaje de bienvenida en consola (opcional)
    console.log('%c¡Bienvenido a Encomiendas USA-SV!', 'color: #FF6600; font-size: 16px; font-weight: bold;');
    console.log('%cTu carga, nuestro compromiso infinito.', 'color: #003366; font-size: 14px;');
});

// ===================================
// FUNCIONES GLOBALES (si son necesarias)
// ===================================

// Función global para abrir WhatsApp (puede ser llamada desde HTML)
window.openWhatsAppChat = function(phoneNumber, customMessage) {
    const defaultMessage = '¡Hola! Me interesa conocer más sobre sus servicios de encomiendas.';
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
};

// Función para mostrar/ocultar elementos (utilidad)
window.toggleElement = function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
};