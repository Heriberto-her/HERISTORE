document.addEventListener('DOMContentLoaded', () => {
  const carritoContenido = document.getElementById('carrito-contenido');
  const carritoTotal = document.getElementById('carrito-total');
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  const finalizarCompraBtn = document.getElementById('finalizar-compra');
  const formularioCompra = document.getElementById('formulario-compra');
  const datosCompra = document.getElementById('datos-compra');
  const resumenPedido = document.getElementById('resumen-pedido');
  const detallePedido = document.getElementById('detalle-pedido');
  const cerrarResumen = document.getElementById('cerrar-resumen');
  const cancelarForm = document.getElementById('cancelar-form');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function renderizarCarrito() {
    carritoContenido.innerHTML = '';
    if (carrito.length === 0) {
      carritoContenido.innerHTML = '<p>Tu carrito está vacío.</p>';
      carritoTotal.textContent = '0.00';
      return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
      total += producto.precio * producto.cantidad;

      const div = document.createElement('div');
      div.classList.add('producto-carrito');
      div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
        <label for="cantidad-${index}">Cantidad:</label>
        <input type="number" id="cantidad-${index}" min="1" value="${producto.cantidad}" />
        <button data-index="${index}" class="btn-eliminar">Eliminar</button>
      `;

      carritoContenido.appendChild(div);
    });

    carritoTotal.textContent = total.toFixed(2);

    carritoContenido.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.id.split('-')[1]);
        let nuevaCantidad = parseInt(e.target.value);
        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
          nuevaCantidad = 1;
          e.target.value = 1;
        }
        carrito[idx].cantidad = nuevaCantidad;
        guardarCarrito();
        renderizarCarrito();
      });
    });

    carritoContenido.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        carrito.splice(idx, 1);
        guardarCarrito();
        renderizarCarrito();
      });
    });
  }

  vaciarCarritoBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      carrito = [];
      guardarCarrito();
      renderizarCarrito();
    }
  });

  finalizarCompraBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    formularioCompra.style.display = 'block';
    finalizarCompraBtn.style.display = 'none';
    vaciarCarritoBtn.style.display = 'none';
  });

  cancelarForm.addEventListener('click', () => {
    formularioCompra.style.display = 'none';
    finalizarCompraBtn.style.display = 'inline-block';
    vaciarCarritoBtn.style.display = 'inline-block';
  });

  datosCompra.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = datosCompra.nombre.value.trim();
    const telefono = datosCompra.telefono.value.trim();
    const direccion = datosCompra.direccion.value.trim();

    if (!nombre || !telefono || !direccion) {
      alert('Por favor llena todos los campos correctamente.');
      return;
    }

    let textoPedido = `<p><strong>Nombre:</strong> ${nombre}</p>`;
    textoPedido += `<p><strong>Teléfono:</strong> ${telefono}</p>`;
    textoPedido += `<p><strong>Dirección:</strong> ${direccion}</p>`;
    textoPedido += '<h3>Productos:</h3><ul>';

    let total = 0;
    carrito.forEach(item => {
      textoPedido += `<li>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</li>`;
      total += item.precio * item.cantidad;
    });
    textoPedido += `</ul><p><strong>Total a pagar:</strong> $${total.toFixed(2)}</p>`;

    detallePedido.innerHTML = textoPedido;
    // Después de crear textoPedido...
let mensajeWhatsApp = `*Pedido Heri Store Net*%0A`;
mensajeWhatsApp += `*Nombre:* ${nombre}%0A`;
mensajeWhatsApp += `*Teléfono:* ${telefono}%0A`;
mensajeWhatsApp += `*Dirección:* ${direccion}%0A`;
mensajeWhatsApp += `*Productos:*%0A`;

carrito.forEach(item => {
  mensajeWhatsApp += `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}%0A`;
});
mensajeWhatsApp += `*Total:* $${total.toFixed(2)}%0A`;

let numeroWhatsApp = '9617164210';
let enlace = `https://wa.me/52${numeroWhatsApp}?text=${mensajeWhatsApp}`;

// Abre WhatsApp con el mensaje listo
window.open(enlace, '_blank');



    resumenPedido.style.display = 'block';
    formularioCompra.style.display = 'none';
  });

  cerrarResumen.addEventListener('click', () => {
    resumenPedido.style.display = 'none';
    finalizarCompraBtn.style.display = 'inline-block';
    vaciarCarritoBtn.style.display = 'inline-block';

    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  });

  renderizarCarrito();
});
