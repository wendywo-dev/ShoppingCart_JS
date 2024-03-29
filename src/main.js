const shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      const { id, name, price, desc, img } = x;
      const search = basket.find((x) => x.id === id) || [];
      return `<div id="product-id-${id}" class="item">
      <img width="220" src=${img} jpg" alt="" />
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>
          <div class="buttons">
            <i onclick ="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id="${id}" class="quantity">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join(""));
};

generateShop();

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
  //   console.log(basket);
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
  //   console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

const calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
