let total = 0;
const price = document.querySelector('.total-price');
const ol = document.querySelector('.cart__items');
const carregando = document.querySelector('.carregando');

const updatePrecos = (prices) => {
  price.innerHTML = prices;
  localStorage.setItem('totalPrice', total);
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  const pegandoPrice = Number(event.target.dataset.precoProduto);
  const savoPreco = localStorage.getItem('totalPrice');
  total = savoPreco - pegandoPrice;
  updatePrecos(total);
  event.target.remove();
  saveCartItems(ol.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  total = Number(localStorage.getItem('totalPrice')) + salePrice;
  updatePrecos(total);
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.dataset.precoProduto = salePrice;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function adicionandoEventoButton(sku) {
  const items = await fetchItem(sku);
  ol.appendChild(createCartItemElement(items));
  saveCartItems(ol.innerHTML);
 }

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', async () => {
    await adicionandoEventoButton(sku);
  });
  section.appendChild(button);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const telaCarregando = () => {
  const textoCarregando = document.createElement('p');
  textoCarregando.className = 'loading';
  telaCarregando.innerText = 'Carregando...';
  carregando.appendChild(textoCarregando);
};
const fimDoCarregando = () => carregando.remove();

const listaDeProdutos = async () => {
  const sectionItem = document.querySelector('.items');
  telaCarregando();
  const { results } = await fetchProducts('computador');
  results.forEach((elementos) => sectionItem.appendChild(createProductItemElement(elementos)));
  fimDoCarregando();
};

function limparCarrinho() {
  const buttonEsvaziar = document.querySelector('.empty-cart');
  buttonEsvaziar.addEventListener('click', () => {
    saveCartItems(ol.innerHTML = '');
    localStorage.setItem('totalPrice', price.innerHTML = 0);
  });
}
limparCarrinho();

window.onload = async () => {
 await listaDeProdutos();
 ol.innerHTML = getSavedCartItems();
 const li = document.querySelectorAll('.cart__item');
 li.forEach((item) => {
  item.addEventListener('click', cartItemClickListener);
});
const savoPreco = localStorage.getItem('totalPrice');
price.innerHTML = savoPreco;
};
