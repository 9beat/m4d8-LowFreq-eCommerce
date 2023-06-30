const API = `https://striveschool-api.herokuapp.com/api/product/`;
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjFmZDMzYjE1MjAwMTQ3NjE3OTgiLCJpYXQiOjE2ODgwMzk5MzksImV4cCI6MTY4OTI0OTUzOX0.1KEwcSOl6q-wmg95NYA8R--g0X3fU3VA-LWoqb4U5wQ`;

function changeHeading(title) {
  const productTitle = document.getElementById("product-title");
  productTitle.innerHTML = title;
}


async function fetchProduct() {
  const qsParams = new URLSearchParams(window.location.search);
  const userId = qsParams.get("id");
  console.log(userId);
  if (userId) {
    try {

      setTimeout(() => {
        document.querySelector(".spinner-container").classList.add("d-none");
        productCard(data);
      }, 2000); 

      const response = await fetch(`${API}${userId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const prod = await response.json();

  

      let productDetail = document.getElementById("product-detail");
      productDetail.innerHTML = `
        <div class="card container">
          <div class="card-img-top">
            <img src="${prod.imageUrl}" alt="${prod.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Image+not+found'">
          </div>
          <p class="text-body mt-5 mb-0">${prod.description}</p>

          <div class="card-info">
            <p class="fs-1 text-center leading-5">${prod.brand} fixed price:</p>
          </div>
          <div class="card-footer flex flex-column">
            <h4 class="text-title text-emerald-500">
              $ ${prod.price},00* 
            </h4>
            <h5 class="text-secondary">
              (*included fees)
            </h5>
            <div class="flex flex-row g-2 items-center my-5">
              <div class="card-button text-center p-4 rounded mx-3 ">
                <i class="fa-brands fa-google-pay fa-lg fs-1"></i>
              </div>
              <div class="card-button text-center p-4 rounded mx-3 ">
                <i class="fa-brands fa-apple-pay fa-lg fs-1"></i>
              </div>
              <div class="card-button text-center p-4 rounded mx-3 ">
                <i class="fa-brands fa-amazon-pay fa-lg fs-1"></i>
              </div>
            </div>
          </div>
        </div>`;

        changeHeading(prod.name);

    } catch (error) {
      console.log("Error fetching product detail: ", error);
    }
  }
}

fetchProduct();

function showCaseBtn() {
  window.location.href = "index.html";
}

function goToBackOffice() {
  window.location.href = "backoffice.html?new-product";
}

function showDetail(elem) {
  window.location.href = `product-detail.html?id=${elem}`;
}

const spinner = document.querySelector(".spinner-container");
setTimeout(() => {
  spinner.classList.add("d-none");
}, 1000);




