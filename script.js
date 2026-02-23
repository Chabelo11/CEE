//Buscamos desde js al elemento con el id llamado 'mensaje_bienvenida'
const etiquetaSaludo = document.getElementById("mensaje_bienvenida");
// Solo ejecutamos el saludo si el elemento existe (solo en index.html)
if (etiquetaSaludo) {
  const ahora = new Date();
  const horaActual = ahora.getHours();
  let textoSaludo;
  if (horaActual < 12) {
    textoSaludo = "¡Buenos Dias...! Listo para sus compras del dias";
  } else if (horaActual < 19) {
    textoSaludo = "Buenas Tardes...! Revisa nuestras ofertas";
  } else {
    textoSaludo = "¡Buenas noches! Descansa Comprando ";
  }
  etiquetaSaludo.textContent = textoSaludo;
}

//Parte de chabelo
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

function mostrarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const totalElemento = document.getElementById("total");

  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio} MXN</td>
        `;
    lista.appendChild(fila);
    total += producto.precio;
  });

  totalElemento.textContent = "Total: $" + total + " MXN";
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

// =============================================
// REGISTRO - Validaciones del formulario
// =============================================

(function () {
  const form = document.getElementById("registroForm");
  const terminos = document.getElementById("terminos");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toast");

  if (!form) return;

  document
    .getElementById("fecha")
    .setAttribute("max", new Date().toISOString().split("T")[0]);

  terminos.addEventListener("change", () => {
    submitBtn.disabled = !terminos.checked;
  });

  function validateField(input, fieldId) {
    const fieldEl = document.getElementById(fieldId);
    if (!input.value.trim() || !input.checkValidity()) {
      fieldEl.classList.add("has-error");
      return false;
    }
    fieldEl.classList.remove("has-error");
    return true;
  }

  const fields = [
    { id: "nombre", fieldId: "field-nombre" },
    { id: "email", fieldId: "field-email" },
    { id: "password", fieldId: "field-password" },
    { id: "fecha", fieldId: "field-fecha" },
    { id: "telefono", fieldId: "field-telefono" },
  ];

  fields.forEach(({ id, fieldId }) => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => validateField(input, fieldId));
    input.addEventListener("input", () => {
      if (document.getElementById(fieldId).classList.contains("has-error")) {
        validateField(input, fieldId);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    fields.forEach(({ id, fieldId }) => {
      if (!validateField(document.getElementById(id), fieldId)) valid = false;
    });

    if (!terminos.checked) {
      valid = false;
      const cf = terminos.parentElement;
      cf.style.outline = "2px solid #e05555";
      cf.style.borderRadius = "4px";
      setTimeout(() => {
        cf.style.outline = "";
      }, 1500);
    }

    if (!valid) return;

    submitBtn.textContent = "Enviando…";
    submitBtn.disabled = true;

    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
      form.reset();
      submitBtn.textContent = "Registrarse";
      submitBtn.disabled = true;
      fields.forEach(({ fieldId }) => {
        document.getElementById(fieldId).classList.remove("has-error");
      });
    }, 900);
  });
})();
