function userCenter() {
  // order history
  let CartData = window.sessionStorage.getItem("tempCartData");
  CartData = JSON.parse(CartData);

  let cartDataArr = window.sessionStorage.getItem("cartDataArr") || [];

  if (typeof cartDataArr !== "object") {
    cartDataArr = JSON.parse(cartDataArr);
  }

  CartData.forEach((item) => {
    cartDataArr.unshift({ ...item });
  });

  window.sessionStorage.setItem("cartDataArr", JSON.stringify(cartDataArr));

  let OrderHistory = document.querySelector(".Order-history");
  cartDataArr.forEach((item) => {
    let list = document.createElement("div");
    list.classList.add("list");

    let img = document.createElement("img");
    img.src = `${item.img}`;

    let name = document.createElement("div");
    name.classList.add("name");
    name.innerText = `Name : ${item.name}`;

    let num = document.createElement("div");
    num.classList.add("num");
    num.innerText = `Number : ${item.quantity}`;

    let price = document.createElement("div");
    price.classList.add("price");
    price.innerText = `Price : $${item.price}`;

    list.appendChild(img);
    list.appendChild(name);
    list.appendChild(num);
    list.appendChild(price);

    OrderHistory.appendChild(list);
  });

  // change password
  let modifyPassword = document.querySelector(".modify-password");
  let dialog = document.querySelector(".dialog");

  modifyPassword.onclick = function () {
    dialog.style.display = "block";
  };

  let dialogBtn = document.querySelector(".dialog-btn");
  dialogBtn.onclick = function () {
    dialog.style.display = "none";
  };

  let close = document.querySelector(".close");
  close.onclick = function () {
    let input = document.querySelector(".dialog input");
    input.value = "";
    dialog.style.display = "none";
  };
}

userCenter();
