const res = await fetch('http://localhost:5000/products');
const products = await res.json();
const container = document.getElementById('productList');
products.forEach(p => {
  const el = document.createElement('div');
  el.innerHTML = `<h3>${p.title}</h3><p>${p.description}</p><b>₹${p.price}</b><br><button onclick="addToCart('${p._id}')">Add</button><hr>`;
  container.appendChild(el);
});
window.addToCart = async function(id) {
  const token = 'USER_TOKEN';
  await fetch('http://localhost:5000/cart/add', {
    method: 'POST',
    headers: {'Content-Type':'application/json','Authorization':'Bearer '+token},
    body: JSON.stringify({ product: id, qty: 1 })
  });
  alert('Added to cart');
}
