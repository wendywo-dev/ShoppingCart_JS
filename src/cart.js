const label = document.getElementById("label");
const shopCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shopCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};
        let { img, name, price } = search;
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="class-item-price"> $ ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
            <i onclick ="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id="${id}" class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${search.price * item}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shopCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="Homebutton">Back to home</button>
      </a>
      `;
  }
};

generateCartItems();

const increment = (id) => {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();

  update(selectedItem.id);
};

const decrement = (id) => {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

const removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

const clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
};

const totalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((x) => {
        const { item, id } = x;
        const search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

totalAmount();
