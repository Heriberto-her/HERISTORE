document.addEventListener('DOMContentLoaded', () => {
  const btnAgregar = document.querySelectorAll('.btn-agregar');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  btnAgregar.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const nombre = button.dataset.nombre;
      const precio = parseFloat(button.dataset.precio);
      const cantidadInput = document.getElementById(`cantidad-${id}`);
      let cantidad = 1;
      if (cantidadInput) cantidad = parseInt(cantidadInput.value) || 1;

      const productoEnCarrito = carrito.find(item => item.id === id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
      } else {
        carrito.push({ id, nombre, precio, cantidad });
      }

      guardarCarrito();
      alert(`${nombre} agregado al carrito (cantidad: ${cantidad})`);
    });
  });
});