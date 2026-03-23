var tipoSeleccionado = "";
var nombreSize = "";
var baseSeleccionado = 20000; // 👈 default mini
var precioSeleccionado = 20000;
var ultimoCalculo = "";

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

function calcularPrecio() {
  var precio = baseSeleccionado;

  if (tipoSeleccionado === "compleja") {
    if (nombreSize === "XS") precio = 30000;
    if (nombreSize === "S") precio = 60000;
    if (nombreSize === "M") precio = 90000;
    if (nombreSize === "L") precio = 130000;
  }

  precioSeleccionado = precio;

  document.querySelector("#resultado").innerText =
    "Precio aproximado: " + formatearPrecio(precioSeleccionado);

  ultimoCalculo =
    "¡Hola!\n" +
    "Quiero consultar por una alfombra:\n\n" +
    "Diseño: " + (tipoSeleccionado || "A definir") + "\n" +
    "Tamaño: " + (nombreSize || "XS") + "\n" +
    "Precio estimado: " + formatearPrecio(precioSeleccionado) + "\n\n" +
    "Te cuento sobre la idea: ";
}

function seleccionarTipo(e, tipo) {
  tipoSeleccionado = tipo;

  var tipos = document.querySelectorAll(".tipo");

  for (var i = 0; i < tipos.length; i++) {
    tipos[i].style.borderColor = "#ccc";
    tipos[i].style.backgroundColor = "white";
  }

  e.currentTarget.style.borderColor = "black";
  e.currentTarget.style.backgroundColor = "#f0f0f0";

  calcularPrecio();
}

function seleccionarSize(e, nombre, base) {
  nombreSize = nombre;
  baseSeleccionado = base;

  var cards = document.querySelectorAll(".size");

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.borderColor = "#ccc";
    cards[i].style.backgroundColor = "white";
  }

  e.currentTarget.style.borderColor = "black";
  e.currentTarget.style.backgroundColor = "#f0f0f0";

  calcularPrecio();
}

function enviarWhatsApp() {
  var numero = "5491164497463";

  var mensaje = ultimoCalculo || "Hola! Quiero consultar por una alfombra";

  var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);

  window.open(url, "_blank");
}

