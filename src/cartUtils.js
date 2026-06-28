const CART_KEY = "cart";

export function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item._id === product._id);
  if (existing) { existing.qty += 1; }
  else { cart.push({ ...product, qty: 1 }); }
  saveCart(cart);
  return cart;
}

export function updateQty(productId, newQty) {
  let cart = getCart();
  if (newQty <= 0) {
    cart = cart.filter((item) => item._id !== productId);
  } else {
    const item = cart.find((item) => item._id === productId);
    if (item) item.qty = newQty;
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item._id !== productId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  return [];
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}