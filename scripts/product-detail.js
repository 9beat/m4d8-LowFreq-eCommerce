const API = `https://striveschool-api.herokuapp.com/api/product/`;
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjFmZDMzYjE1MjAwMTQ3NjE3OTgiLCJpYXQiOjE2ODY5MzE4MDksImV4cCI6MTY4ODE0MTQwOX0.l3WlVjgHSJtjoFMfkg2yCkr1lbCgFWkLYGtfT5S9JCM`;

async function fetchProduct() {
  const qsParams = new URLSearchParams(window.location.search);
  const userId = qsParams.get("id");
  console.log(userId);
  if (userId) {
    try {
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
          <h1 class="text-title mb-5 mx-auto">${prod.name}</h1>
          <div class="card-img-top">
            <img src="${prod.imageUrl}" alt="${prod.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Image+not+found'">
          </div>
          <p class="text-body mt-5 mb-0">${prod.description}</p>

          <div class="card-info">
            <p class="fs-1 text-center leading-5">${prod.brand} start price:</p>
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
    } catch (error) {
      console.log("Error fetching product detail: ", error);
    }
  }
}

fetchProduct();

function goBack() {
  window.location.href = "index.html";
}

const spinner = document.querySelector(".spinner-container");
setTimeout(() => {
  spinner.classList.add("d-none");
}, 1000);






// const API = `https://striveschool-api.herokuapp.com/api/product/`;
// const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjFmZDMzYjE1MjAwMTQ3NjE3OTgiLCJpYXQiOjE2ODY5MzE4MDksImV4cCI6MTY4ODE0MTQwOX0.l3WlVjgHSJtjoFMfkg2yCkr1lbCgFWkLYGtfT5S9JCM`;

// async function fetchProduct() {
//   const qsParams = new URLSearchParams(window.location.search);
//   const userId = qsParams.get("id");
//   console.log(userId);
//   if (userId) {
//     try {
//       const response = await fetch(`${API}${userId}`, {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       });
//       const prod = await response.json();
      
//       setTimeout((productDetail) => {
//         document.querySelector(".spinner-container").classList.add("d-none");
//         productDetail(data);
//       }, 10000);

//       let productDetail = document.getElementById("product-detail");
//       productDetail.innerHTML = `
//         <div class="card container">
//           <h1 class="text-title mb-5 mx-auto">${prod.name}</h1>
//           <div class="card-img-top">
//             <img src="${prod.imageUrl}" alt="${prod.name}" >
//           </div>
//           <p class="text-body mt-5 mb-0">${prod.description}</p>

//           <div class="card-info">
//             <p class="fs-1 text-center leading-5">${prod.brand} start price:</p>
//           </div>
//           <div class="card-footer flex flex-column">
//             <h4 class="text-title text-emerald-500">
//               $ ${prod.price},00* 
//             </h4>
//             <h5 class="text-secondary">
//               (*included fees)
//             </h5>
//             <div class="flex flex-row g-2 items-center my-5">
//               <div class="card-button text-center p-4 rounded mx-3 ">
//                 <i class="fa-brands fa-google-pay fa-lg fs-1"></i>
//               </div>
//               <div class="card-button text-center p-4 rounded mx-3 ">
//                 <i class="fa-brands fa-apple-pay fa-lg fs-1"></i>
//               </div>
//               <div class="card-button text-center p-4 rounded mx-3 ">
//                 <i class="fa-brands fa-amazon-pay fa-lg fs-1"></i>
//               </div>
//             </div>
//           </div>
//         </div>`;
//     } catch (error) {
//       console.log("Error fetching product detail: ", error);
//     }
//   }
// }

// fetchProduct();

// function goBack() {
//   window.location.href = "index.html";
// }

