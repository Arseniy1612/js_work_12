const productsData = {
    electronics: [
      { name: "Смартфон", price: 10000 },
      { name: "Ноутбук", price: 25000 }
    ],
    books: [
      { name: "JavaScript для початківців", price: 500 },
      { name: "Алгоритми та структури даних", price: 800 }
    ]
  };

  const categories = document.getElementById("categories");
  const productsDiv = document.getElementById("products");
  const orderForm = document.getElementById("orderForm");
  const orderResult = document.getElementById("orderResult");

  let selectedProduct = null;
  categories.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
      const category = e.target.dataset.category;
      productsDiv.innerHTML = "";
      productsData[category].forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `<b>${p.name}</b> - ${p.price} грн 
          <button class="buyBtn">Придбати</button>`;
        productsDiv.appendChild(div);

        div.querySelector(".buyBtn").addEventListener("click", () => {
          selectedProduct = p;
          orderForm.style.display = "block";
          orderResult.innerHTML = "";
        });
      });
    }
  });
  document.getElementById("checkoutForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const city = document.getElementById("city").value;
    const warehouse = document.getElementById("warehouse").value.trim();
    const payment = document.querySelector("input[name='payment']:checked")?.value;
    const quantity = document.getElementById("quantity").value;
    const comment = document.getElementById("comment").value;

    if (!name || !city || !warehouse || !payment || quantity < 1) {
      alert("Будь ласка, заповніть усі поля правильно!");
      return;
    }

    orderForm.style.display = "none";

    orderResult.innerHTML = `
      <h3>Ваше замовлення підтверджено!</h3>
      <p><b>Товар:</b> ${selectedProduct.name}</p>
      <p><b>Ціна за одиницю:</b> ${selectedProduct.price} грн</p>
      <p><b>Кількість:</b> ${quantity}</p>
      <p><b>Сума:</b> ${selectedProduct.price * quantity} грн</p>
      <h4>Дані покупця:</h4>
      <p><b>ПІБ:</b> ${name}</p>
      <p><b>Місто:</b> ${city}</p>
      <p><b>Склад Нової пошти:</b> ${warehouse}</p>
      <p><b>Оплата:</b> ${payment}</p>
      <p><b>Коментар:</b> ${comment}</p>
    `;
  });