const s = ( p ) => {
  let miImagen;
  let transparencia = 0;
  let velocidad = 2;
  let cargada = false;

  // Variables para guardar la escala final calculada
  let imagenW, imagenH;

  p.preload = () => {
    // IMPORTANTE: Asegúrate de que la ruta sea correcta
    miImagen = p.loadImage('img/altalana_isotipo.png', () => {
      cargada = true;
      // Una vez cargada, calculamos la escala inicial
      calcularEscalaUniforme(); 
    });
  };

  p.setup = () => {
    // Obtenemos el contenedor
    let container = document.getElementById('sketch-container');
    let w = container.offsetWidth;
    let h = container.offsetHeight;
    
    // El canvas siempre es del tamaño completo del contenedor
    let canvas = p.createCanvas(w, h);
    
    // Si la imagen ya cargó (por si acaso preload fue muy rápido), calculamos
    if (cargada) calcularEscalaUniforme();
    
    p.imageMode(p.CENTER);
  };

  p.draw = () => {
    // Limpiamos todo y dejamos el fondo transparente
    p.clear();
    p.background(255, 0); 

    if (cargada) {
      // 1. Lógica de desvanecimiento
      transparencia += velocidad;
      if (transparencia >= 255 || transparencia <= 0) {
        velocidad *= -1;
      }
      p.tint(255, transparencia);
      
      // 2. Dibujamos la imagen centrada con el tamaño calculado
      // imagenW e imagenH ya tienen la proporción correcta
      p.image(miImagen, p.width / 2, p.height / 2, imagenW, imagenH);
    }
  };

  // --- LA FUNCIÓN CLAVE ---
  // Calcula el tamaño máximo de la imagen sin deformarla
  function calcularEscalaUniforme() {
    if (!cargada || !miImagen) return;

    // 1. Obtener proporciones
    let proporcionImagen = miImagen.width / miImagen.height;
    let proporcionCanvas = p.width / p.height;

    // El margen que queremos dejar (0.9 = 90% del tamaño del contenedor)
    let factorContenedor = 0.9; 

    // 2. Lógica de ajuste uniforme
    // Comparamos proporciones para ver cuál es el "cuello de botella"
    if (proporcionCanvas > proporcionImagen) {
      // El canvas es más ancho que la imagen -> Ajustamos por ALTURA
      imagenH = p.height * factorContenedor;
      imagenW = imagenH * proporcionImagen; // Calculamos el ancho proporcional
    } else {
      // El canvas es más alto/estrecho que la imagen -> Ajustamos por ANCHO
      imagenW = p.width * factorContenedor;
      imagenH = imagenW / proporcionImagen; // Calculamos la altura proporcional
    }
  }

  // Ajustar si el usuario cambia el tamaño de la ventana
  p.windowResized = () => {
    let container = document.getElementById('sketch-container');
    // Reajustar canvas
    p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    // Recalcular la escala para el nuevo tamaño
    calcularEscalaUniforme();
  };
};

// Encender sketch
new p5(s, 'sketch-container');