const API = `https://striveschool-api.herokuapp.com/api/product/`;
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjFmZDMzYjE1MjAwMTQ3NjE3OTgiLCJpYXQiOjE2ODgwMzk5MzksImV4cCI6MTY4OTI0OTUzOX0.1KEwcSOl6q-wmg95NYA8R--g0X3fU3VA-LWoqb4U5wQ`;

const form = document.getElementById("user-form");
const newProductId = document.getElementById("product-id");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("img-url");
const priceInput = document.getElementById("price");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isValid = handleFormValidation();
  if (!isValid) return false;

  // checktxt()
  const product = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
  };

  try {
    if (newProductId.value === "") {
      const res = await fetch(API, {
        method: "POST",
        body: JSON.stringify(product),
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
          "Content-type": "application/json; charset=UTF-8",
        }),
      });
      window.location.href = "backoffice.html?status=create-product";
    } else {
      const res = await fetch(`${API}${newProductId.value}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
          "Content-type": "application/json; charset=UTF-8",
        }),
      });
      if (res.ok) {
        window.location.href = "backoffice.html?status=edit-product";
      } else {
        alert("Error editing product");
      }
    }
  } catch (error) {
    console.log(error);
  }
  checktxt();
});

async function getTOKEN() {
  try {
    const res = await fetch(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await res.json();
    createProductsTable(data);
  } catch (error) {
    console.log("Error getting TOKEN:", error);
  }
}

getTOKEN();

function createProductsTable(product) {

  const tableProd = document.getElementById("table-body");

  tableProd.innerHTML = "";

  product.forEach((element) => {
    const cellId = element._id
    const cellName = element.name
    const cellDescription = element.description
        .length > 30
        ? element.description.substring(0, 100) + "..."
        : element.description;
    const cellBrand = element.brand
    const cellImageUrl = element.imageUrl
    const cellPrice = element.price

    const row = `
      <tr class="opacity-1 hover:bg-transparent overflow-x-scroll">
        <td class="p-12 px-4 h-4 font-normal hover:bg-inherit text-gray-900">
            <img
              onclick="showDetail('${element._id}')"
              class="h-20 w-min-auto rounded-full object-cover object-center  cursor-pointer"
              src="${cellImageUrl}"
              alt=""
            />

      </td>
      <td class="px-6 p-2 text-center border-l-2 text-blue-500">${cellName}</td>
      <td class="px-6 p-2 text-center border-l-2 border-r-2 text-gray-500">${cellBrand}</td>
      <td class="h-8 text-center p-2 border-r-2 w-2/5 break-all line-clamp-8 text-sky-500">${cellDescription}</td>
      <td class="px-6 p-2 border-r-2 text-center text-emerald-500">$ ${cellPrice}</td>
        <td class="col p-5 flex justify-center items-center">
          <button
            class="btn btn-danger btn-xs"
            onclick="deleteProduct('${element._id}')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7
                2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182
                15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802
                12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"
                fill="hsl(0, 100%, 40%)">
              </path>
            </svg>
          </button>
          <button
            class="btn btn-dark btn-xs text-primary"
            onclick="getProductData('${element._id}')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M9.24264 18.9964H21V20.9964H3V16.7538L12.8995 6.85431L17.1421 11.0969L9.24264
                18.9964ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777
                6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"
                fill="hsl(200, 100%, 50%)">
              </path>
            </svg>
          </button>
        </td>
      </tr>
        `;
    tableProd.insertAdjacentHTML("beforeend", row);
  });
}

async function deleteProduct(productDeleteId) {
  if (confirm("Product delete. Are you sure?")) {
    try {
      await fetch(`${API}${productDeleteId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-type": "application/json; charset=UTF-8",
        },
        method: "DELETE",
      });
      window.location.href = "backoffice.html?status=delete-ok";
    } catch (error) {
      console.log("Error deleting product: ", error);
    }
  }
}

function changeHeading(title) {
  const pageTitle = document.getElementById(`page-title`);
  const newTitle = title ? `EDIT PRODUCT` : `CREATE PRODUCT`;
  pageTitle.textContent = newTitle;
  history.pushState(null, newTitle, `?action=${newTitle}`);
}

function showCaseBtn() {
  window.location.href = "index.html";
}

async function getProductData(idProdotto) {
  try {
    const res = await fetch(`${API}${idProdotto}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const product = await res.json();
      newProductId.value = product._id;
      nameInput.value = product.name;
      descriptionInput.value = product.description;
      brandInput.value = product.brand;
      imageUrlInput.value = product.imageUrl;
      priceInput.value = product.price;
  } catch (error) {
    console.log("Error fetching products: ", error);
  }

  // dynamic title
  changeHeading(idProdotto);
}

function validateForm() {
  const errors = {};

  const nameValue = document.getElementById("name").value;
  const descriptionValue = document.getElementById("description").value;
  const brandValue = document.getElementById("brand").value;
  const imageUrlValue = document.getElementById("img-url").value;
  const priceValue = document.getElementById("price").value;

  if (!nameValue) {
    errors.name = "You must enter the product name";
  } else {
    errors.name = "";
  }

  if (!descriptionValue) {
    errors.description = "You must enter a valid description of your product";
  } else {
    errors.description = "";
  }

  if (!brandValue) {
    errors.brand = "You must enter a valid brand name";
  } else {
    errors.brand = "";
  }

  if (!imageUrlValue) {
    errors.url = "You must enter a valid URL";
  } else {
    errors.url = "";
  }

  if (isNaN(priceValue)) {
    errors.price = "You must enter only numbers";
  } else if (!priceValue) {
    errors.price = "You must enter a price";
  } else {
    errors.price = "";
  }

  return {
    errors,
    isValid: Object.values(errors).every((value) => value === ""),
  };
}

function handleFormValidation() {
  const validation = validateForm();

  let isValid = true

  if (!validation.isValid) {
    for (const key in validation.errors) {

        const errorAlert = document.getElementById(`${key}-alert`);
        errorAlert.textContent = '';
        errorAlert.textContent = validation.errors[key];
    }
    isValid = false;
  }
  return isValid;
}

function showDetail(elem) {
  window.location.href = `product-detail.html?id=${elem}`;
}
