const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`;
const apiKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjFmZDMzYjE1MjAwMTQ3NjE3OTgiLCJpYXQiOjE2ODgwMzk5MzksImV4cCI6MTY4OTI0OTUzOX0.1KEwcSOl6q-wmg95NYA8R--g0X3fU3VA-LWoqb4U5wQ`;

async function getToken() {
  try {
    const response = await fetch(`${apiUrl}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    // 
    setTimeout(() => {
        document.querySelector(".spinner-container").classList.add("d-none");
        productCard(data);
    }, 2000);   
  } catch (error) {
    console.log("Errore nel recupero dei prodotti: ", error);
  }
}

getToken();

function productCard(showcaseProducts) {
  let container = document.getElementById("showcase");
  container.innerHTML = "";

  showcaseProducts.forEach((elem) => {
    let col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
        <div class="card shadow-lg bg-black-100">
          <div class="card-img">
            <img 
              src="${elem.imageUrl}"
              onclick="showDetail('${elem._id}')" 
              class="card-img-top img-wrap p-1 rounded-3" 
              alt="${elem.name}"
            />
            <h2 class="card-title text-center fw-bolder">
            ${elem.name}
            </h2>
          </div>
          <div class="card-body">

            <ul class="list-group bg-transparent list-group">
              <li class="asin d-none">
                ${elem._id}
              </li>
              <li class="d-flex justify-content-center">
                <h3 class="price fw-bolder">
                  $ ${elem.price},00
                </h3>
              </li>
              <li class="p-2 description">
                ${elem.description}
              </li>
            </ul>
          </div>
          <div class="btn-group">
            <button
              onclick="addToCart('${elem._id}')"
              class="btn btn-md btn-outline"
            >
              ADD TO CART
            </button>
            <button
              onclick="showDetail('${elem._id}')"
              class="btn btn-md btn-outline"
            >
              SHOW DETAILS
            </button>
          </div>
        </div>`
    container.appendChild(col);
  });
}

function goToBackOffice() {
  window.location.href = "backoffice.html?create-product";
}

function showDetail(elem) {
  window.location.href = `product-detail.html?id=${elem}`;
}

