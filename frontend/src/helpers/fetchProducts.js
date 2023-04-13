const fetchProducts = async (parametro) => {
  // seu código aqui
  try {
    if (parametro) {
      const productUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`;
      const response = await fetch(productUrl);
      const data = await response.json();
      return data;
    }
    throw new Error('You must provide an url');
  } catch (error) {
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}