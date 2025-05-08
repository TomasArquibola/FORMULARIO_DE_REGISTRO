document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const nombreEquipo = document.getElementById('nombreEquipo');
    const escuela = document.getElementById('escuela');
    const emailInput = document.getElementById('email');
    const fotoPerfil = document.getElementById('fotoPerfil');
    const previewFoto = document.getElementById('previewFoto');
    const categorias = document.querySelectorAll('input[name="categoria"]');
    const btnRegistrar = document.getElementById('btnRegistrar');
    const certificadoSeguridad = document.getElementById('certificadoSeguridad');
    const disenoRobot = document.getElementById('disenoRobot');
    const aceptaReglas = document.getElementById('aceptoReglas');
  
    function validarFormulario() {
      // Validaciones básicas
      const nombreValido = nombreEquipo.value.trim() !== '';
      const escuelaValida = escuela.value !== '';
      const emailValido = emailInput.value.trim().endsWith('@escuela.edu.ar');
  
      // Foto de perfil
      const foto = fotoPerfil.files[0];
      const fotoValida = foto && ['image/jpeg', 'image/png'].includes(foto.type) && foto.size <= 2 * 1024 * 1024;
  
      // Categorías
      const categoriasSeleccionadas = Array.from(categorias).filter(c => c.checked);
      const alMenosUnaCategoria = categoriasSeleccionadas.length > 0;
  
      // Certificado requerido si hay sumo o minisumo
      const requiereCertificado = categoriasSeleccionadas.some(c =>
        ['sumo', 'minisumo'].includes(c.value)
      );
      const certificado = certificadoSeguridad.files[0];
      const certificadoValido = !requiereCertificado || (certificado && certificado.size <= 5 * 1024 * 1024);
  
      // Diseño del robot (opcional pero si se sube, debe ser válido)
      const diseno = disenoRobot.files[0];
      const disenoValido = !diseno || diseno.size <= 5 * 1024 * 1024;
  
      // Aceptación de reglas
      const reglasAceptadas = aceptaReglas.checked;
  
      // Habilitar botón si todo es válido
      const todoCorrecto = nombreValido && escuelaValida && emailValido &&
        fotoValida && alMenosUnaCategoria && certificadoValido &&
        disenoValido && reglasAceptadas;
  
      btnRegistrar.disabled = !todoCorrecto;
    }
  
    // Validación en tiempo real
    form.addEventListener('input', validarFormulario);
  
    // Previsualización de imagen
    fotoPerfil.addEventListener('change', () => {
      const file = fotoPerfil.files[0];
      if (file && file.type.startsWith('image/')) {
        previewFoto.src = URL.createObjectURL(file);
        previewFoto.style.display = 'block';
      } else {
        previewFoto.style.display = 'none';
      }
      validarFormulario(); // Revalidar
    });
  
    // Envío del formulario
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setTimeout(() => {
        alert("✅ Equipo registrado en LNR. ¡Buena suerte!");
        const contador = Number(localStorage.getItem('equipos')) || 0;
        localStorage.setItem('equipos', contador + 1);
      }, 1500);
    });
  
    // Validación inicial por si hay datos precargados
    validarFormulario();
  });
  
  // Botón de reset
  function resetearFormulario() {
    document.getElementById('registroForm').reset();
    document.getElementById('previewFoto').style.display = 'none';
    // También resetear el botón por seguridad
    document.getElementById('btnRegistrar').disabled = true;
  }
  
  const toggleBtn = document.getElementById('modoToggle');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const esClaro = document.body.classList.contains('light');
    localStorage.setItem('modoClaro', esClaro);
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    const modoGuardado = localStorage.getItem('modoClaro') === 'true';
    if (modoGuardado) document.body.classList.add('light');
  });
  