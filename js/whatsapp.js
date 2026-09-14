// ==========================================
// FORMULARIO DE CONTACTO
// EMAILJS + WHATSAPP
// ==========================================

const contactForm = document.querySelector('#contact-form');


if (contactForm) {

    const emailJs = window.emailjs;
    let emailJsAvailable = false;

    if (emailJs) {

        try {

            emailJs.init({
                publicKey: "2ysG7LAA45RpGKd52"
            });

            emailJsAvailable = true;

        } catch (error) {

            console.error('No se pudo inicializar EmailJS:', error);

        }

    }

    // Número de WhatsApp
    const whatsappNumber = '51993496970';


    // ==========================================
    // CAMPOS DEL FORMULARIO
    // ==========================================

    const fields = {
        nombre: contactForm.elements.nombre,
        correo: contactForm.elements.correo,
        telefono: contactForm.elements.telefono
    };

    const submitButton = contactForm.querySelector('button[type="submit"]');
    let isSubmitting = false;


    // ==========================================
    // MENSAJES DE VALIDACIÓN
    // ==========================================

    const messages = {
        required: 'Este campo es obligatorio.',
        email: 'Ingresa un correo electrónico válido.',
        phone: 'Ingresa un número de teléfono válido.'
    };


    const showNotification = (type, title, description) => {

        const existingNotification = document.querySelector('#contact-notification');

        if (existingNotification) {
            existingNotification.remove();
        }

        const isError = type === 'error';
        const notification = document.createElement('div');
        const content = document.createElement('div');
        const icon = document.createElement('span');
        const text = document.createElement('div');
        const heading = document.createElement('strong');
        const message = document.createElement('p');
        const closeButton = document.createElement('button');

        notification.id = 'contact-notification';
        notification.setAttribute('role', isError ? 'alert' : 'status');
        notification.setAttribute('aria-live', isError ? 'assertive' : 'polite');
        notification.style.cssText = [
            'position:fixed', 'top:20px', 'right:20px', 'z-index:1100',
            'width:min(420px, calc(100vw - 40px))', 'padding:16px 18px',
            'border-radius:14px', `border-left:4px solid ${isError ? '#B91C1C' : '#D89C18'}`,
            'background:#FFFFFF', 'color:#071C3F',
            'box-shadow:0 18px 45px rgba(7,28,63,.18)',
            'font-family:Inter, Arial, sans-serif'
        ].join(';');

        content.style.cssText = 'display:flex;align-items:flex-start;gap:12px';
        icon.textContent = isError ? '!' : '✓';
        icon.setAttribute('aria-hidden', 'true');
        icon.style.cssText = [
            'display:flex', 'flex:0 0 auto', 'align-items:center',
            'justify-content:center', 'width:28px', 'height:28px',
            'border-radius:50%', `background:${isError ? '#B91C1C' : '#071C3F'}`,
            'color:#FFFFFF', 'font-weight:700'
        ].join(';');

        text.style.cssText = 'flex:1;padding-top:1px';
        heading.textContent = title;
        heading.style.cssText = 'display:block;margin-bottom:4px;font-family:Poppins, Arial, sans-serif;font-size:1rem';
        message.textContent = description;
        message.style.cssText = 'margin:0;color:#374151;font-size:.92rem;line-height:1.5';

        closeButton.type = 'button';
        closeButton.textContent = '×';
        closeButton.setAttribute('aria-label', 'Cerrar notificación');
        closeButton.style.cssText = 'border:0;background:transparent;color:#071C3F;font-size:1.5rem;line-height:1;cursor:pointer;padding:0 0 0 6px';

        const dismissNotification = () => notification.remove();
        const dismissTimer = window.setTimeout(dismissNotification, 7000);

        closeButton.addEventListener('click', () => {
            window.clearTimeout(dismissTimer);
            dismissNotification();
        });

        text.append(heading, message);
        content.append(icon, text, closeButton);
        notification.append(content);
        document.body.append(notification);
    };

    const showWhatsAppModal = (whatsappUrl) => {

        const existingModal = document.querySelector('#whatsapp-modal');

        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');

        modal.id = 'whatsapp-modal';

        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'whatsapp-modal-title');

        modal.style.cssText = [
            'position:fixed',
            'inset:0',
            'z-index:1200',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'padding:20px',
            'background:rgba(7,28,63,.55)'
        ].join(';');


        const panel = document.createElement('div');

        panel.style.cssText = [
            'width:min(100%,420px)',
            'padding:30px 24px',
            'border-radius:20px',
            'background:#FFFFFF',
            'color:#071C3F',
            'box-shadow:0 20px 60px rgba(7,28,63,.25)',
            'text-align:center',
            'font-family:Inter,Arial,sans-serif'
        ].join(';');


        const icon = document.createElement('div');

        icon.textContent = '✓';

        icon.setAttribute('aria-hidden', 'true');

        icon.style.cssText = [
            'width:58px',
            'height:58px',
            'margin:0 auto 18px',
            'display:grid',
            'place-items:center',
            'border-radius:50%',
            'background:#071C3F',
            'color:#D89C18',
            'font-size:26px',
            'font-weight:700'
        ].join(';');


        const title = document.createElement('h2');

        title.id = 'whatsapp-modal-title';

        title.textContent = '¿Deseas continuar por WhatsApp?';

        title.style.cssText = [
            'margin:0 0 10px',
            'font-family:Poppins,Arial,sans-serif',
            'font-size:1.35rem'
        ].join(';');


        const description = document.createElement('p');

        description.textContent =
            'Tu solicitud fue recibida correctamente. También puedes enviarnos tu consulta directamente por WhatsApp.';

        description.style.cssText = [
            'margin:0 0 24px',
            'color:#64748B',
            'line-height:1.6',
            'font-size:.95rem'
        ].join(';');


        const actions = document.createElement('div');

        actions.style.cssText = [
            'display:flex',
            'gap:10px',
            'justify-content:center',
            'flex-wrap:wrap'
        ].join(';');


        const whatsappButton = document.createElement('a');

        whatsappButton.href = whatsappUrl;

        whatsappButton.target = '_blank';

        whatsappButton.rel = 'noopener noreferrer';

        whatsappButton.textContent = 'Abrir WhatsApp';

        whatsappButton.style.cssText = [
            'display:inline-flex',
            'align-items:center',
            'justify-content:center',
            'padding:12px 20px',
            'border-radius:10px',
            'background:#25D366',
            'color:#FFFFFF',
            'font-weight:700',
            'text-decoration:none',
            'cursor:pointer'
        ].join(';');


        const closeButton = document.createElement('button');

        closeButton.type = 'button';

        closeButton.textContent = 'Cerrar';

        closeButton.style.cssText = [
            'padding:12px 20px',
            'border:1px solid #E5E7EB',
            'border-radius:10px',
            'background:#FFFFFF',
            'color:#071C3F',
            'font-weight:600',
            'cursor:pointer'
        ].join(';');


        closeButton.addEventListener('click', () => {
            modal.remove();
        });


        whatsappButton.addEventListener('click', () => {
            modal.remove();
        });


        actions.append(
            whatsappButton,
            closeButton
        );


        panel.append(
            icon,
            title,
            description,
            actions
        );


        modal.append(panel);

        document.body.append(modal);


        closeButton.focus();
    };
        


    // ==========================================
    // MOSTRAR ERROR
    // ==========================================

    const showError = (field, message) => {

        const inputGroup = field.closest('.input-group');

        let error = inputGroup.querySelector('.field-error');


        if (!error) {

            error = document.createElement('p');

            error.className = 'field-error';

            error.id = `${field.name}-error`;

            error.setAttribute('role', 'alert');

            inputGroup.append(error);

            field.setAttribute('aria-describedby', error.id);
        }


        error.textContent = message;

        field.setAttribute('aria-invalid', 'true');

        field.classList.add('input-error');
    };


    // ==========================================
    // LIMPIAR ERROR
    // ==========================================

    const clearError = (field) => {

        const error = field
            .closest('.input-group')
            .querySelector('.field-error');


        if (error) {
            error.remove();
        }


        field.removeAttribute('aria-invalid');

        field.removeAttribute('aria-describedby');

        field.classList.remove('input-error');
    };


    // ==========================================
    // VALIDAR CAMPO
    // ==========================================

    const validateField = (field) => {

        const value = field.value;

        let errorMessage = '';


        // Nombre y correo obligatorios
        if (
            (field.name === 'nombre' || field.name === 'correo') &&
            !value.trim()
        ) {

            errorMessage = messages.required;

        }

        // Validación del correo
        else if (
            field.name === 'correo' &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {

            errorMessage = messages.email;

        }

        // Validación del teléfono
        else if (
            field.name === 'telefono' &&
            value &&
            !/^(?:\d{9}|51\d{9})$/.test(value)
        ) {

            errorMessage = messages.phone;

        }


        if (errorMessage) {

            showError(field, errorMessage);

            return false;
        }


        clearError(field);

        return true;
    };


    // ==========================================
    // VALIDACIÓN MIENTRAS ESCRIBE
    // ==========================================

    Object.values(fields).forEach((field) => {

        field.addEventListener('input', () => {

            validateField(field);

        });

    });


    // ==========================================
    // ENVÍO DEL FORMULARIO
    // ==========================================

    contactForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        if (isSubmitting) {
            return;
        }


        // ------------------------------------------
        // VALIDAR CAMPOS
        // ------------------------------------------

        const isValid = Object.values(fields)
            .map((field) => validateField(field))
            .every(Boolean);


        if (!isValid) {
            return;
        }

        isSubmitting = true;
        contactForm.setAttribute('aria-busy', 'true');

        if (submitButton) {
            submitButton.disabled = true;
        }


        // ------------------------------------------
        // OBTENER VALORES
        // ------------------------------------------

        const getFieldValue = (name) => {

            return contactForm.elements[name].value.trim();

        };


        const selectedService = getFieldValue('servicio');


        const service =
            selectedService === 'Selecciona un servicio'
                ? 'No seleccionado'
                : selectedService;


        const company = getFieldValue('empresa');

        const message = getFieldValue('mensaje');


        // Se abre durante la interacción del usuario para evitar el bloqueo
        // del navegador tras la operación asíncrona de EmailJS.



        // ==========================================
        // 1. ENVIAR CORREO CON EMAILJS
        // ==========================================

        let emailSent = false;

        if (emailJsAvailable) {

        try {

            await emailJs.sendForm(
                "service_sww6ykw",
                "template_wffy1v3",
                contactForm
            );

            emailSent = true;

            console.log('Correo enviado correctamente.');

        }

        catch (error) {

            console.error(
                'Error al enviar el correo:',
                error
            );


        }

        } else {

        }


       


        // ==========================================
        // 2. CREAR MENSAJE DE WHATSAPP
        // ==========================================

        const whatsappMessage = [

            'Nueva consulta desde la página web',

            '',

            `Nombre: ${getFieldValue('nombre')}`,

            `Correo: ${getFieldValue('correo')}`,

            `Teléfono: ${
                getFieldValue('telefono') || 'No indicado'
            }`,

            `Servicio: ${
                service || 'No seleccionado'
            }`,

            ...(company
                ? [`Empresa: ${company}`]
                : []),

            '',

            'Mensaje:',

            message || 'No especificado.'

        ].join('\n');


        // ==========================================
        // 3. CREAR URL DE WHATSAPP
        // ==========================================

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


             if (emailSent) {

            showNotification(
                'success',
                '¡Solicitud enviada correctamente!',
                'Gracias por contactarnos. Nos pondremos en contacto contigo a la brevedad.'
            );

        } else {

            showNotification(
                'error',
                'No se pudo enviar el correo',
                'Tu consulta no se perdió. Puedes continuar directamente por WhatsApp.'
            );

        }

        showWhatsAppModal(whatsappUrl);


        // ==========================================
        // 5. LIMPIAR FORMULARIO
        // ==========================================

        contactForm.reset();


        contactForm.removeAttribute('aria-busy');

        if (submitButton) {
            submitButton.disabled = false;
        }

        isSubmitting = false;

    });

}
