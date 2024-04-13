export const fetchReviews = async () => {
  const response = await fetch('http://o-complex.com:1337/reviews');
  return await response.json();
}

export const fetchCards = async (page = 1) => {
  const response = await fetch(`http://o-complex.com:1337/products?page=${page}&page_size=6`);
  return await response.json();
}

export const postOrder = async (order: any) => {
  const response = await fetch('http://o-complex.com:1337/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });
  return await response.json();
}