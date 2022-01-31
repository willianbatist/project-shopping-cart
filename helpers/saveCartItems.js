// localStorage.setItem('Chave que vc quer criar', aqui os valores);
const saveCartItems = (valoresDaChave) => {
  localStorage.setItem('cartItems', valoresDaChave);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
