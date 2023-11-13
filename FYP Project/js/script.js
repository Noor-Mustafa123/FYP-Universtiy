document.addEventListener("DOMContentLoaded", function () {
  // DOM ITEMS
  const featuredSection = document.querySelectorAll(".featured");
  const addToCartBtns = document.querySelectorAll(".featured-store-link")
  const ADCSection = document.querySelector(".pointer") // Modified this line


  // OBJECT TO SAVE ITEMS 
  const shopObj = {};

  // FUNCTIONS
  addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      //is used to prevent the page from navigating to the URL specified in the href attribute of
      const item = e.target.parentElement.parentElement;
      const itemInfo = {
        img: item.querySelector(".img-fluid").src,
        name: item.querySelector(".texas").textContent.trim(),
        // the trim remove the extra spaces in the name 
        price: item.querySelector(".span-text").textContent,
        quantity: 1 // 
      }
      // DUPLICATE
      // if duplicate increase the quantity
      const id = itemInfo.name;
      if (shopObj[id]) {
        shopObj[id].quantity += 1;
      } else {
        shopObj[id] = itemInfo;
        //adding the itemInfo to the object and making he name the key value pair
      }
      updateCart(shopObj);
    });
  });

  // ATTACHING EVENT LISTNERS TO QUANTITY BUTTONS


  // UPDATE CART FUNCTION
  function updateCart(shopObj) {
    // Clear the cart first
    // while (condition) {
    // code to be executed as long as the condition is true }
    // When updateCart is called, the while loop clears the cart, and then the for loop adds each item in shopObj back into the cart.
    // This includes both the first and second items you clicked on.
    while (ADCSection.firstChild) {
      ADCSection.removeChild(ADCSection.firstChild);
    }

    // Iterate over each item in the shopObj
    // This is a for...in loop, which is used to iterate over the properties of an object. it executes code for each property of an object
    for (let id in shopObj) {
      let item = shopObj[id];

      // Add the HTML for each column in the row
      let html = `
                <div class="col-10 mx-auto col-md-2 my-3">
                    <img src="${item.img}" alt="" class="img-fluid">
                </div>
                <div class="col-10 mx-auto col-md-4">
                    <p class="text-uppercase">${item.name}</p>
                </div>
                <div class="col-10 mx-auto col-md-2">
                    <p class="text-uppercase">${item.price}</p>
                </div>
                <div class="col-10 mx-auto col-md-2">
                <div class="d-flex justify-content-center align-items-center">
                <span class="btn btn-black mx-1 quantity-minus" data-id="${id}">-</span>
                <span class="btn btn-black mx-1 quantity">${item.quantity}</span>
                <span class="btn btn-black mx-1 quantity-plus" data-id="${id}">+</span>
              </div>
                </div>
                <div class="col-10 mx-auto col-md-2 subTotal">
                    <p class="text-uppercase">$${parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity}</p> 
                </div>`;
      //  In this line, item.price.replace(/[^\d.-]/g, '') removes any characters from the item.price string that are not digits, a dot (.), or a hyphen (-). The resulting string is then parsed as a float and multiplied by item.quantity.
      // Append the HTML to the cart section

      // the event listner is attached on the first click the nit works to update quantity ?

      // how does the items price multiply because it is lower in lexadecical order ?

      ADCSection.innerHTML += html;
    }

    // Total functionality
    // Calculate the total price of all items in the cart
    let totalPrice = 0;
    for (let id in shopObj) {
      let item = shopObj[id];
      totalPrice += parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity; //the parse float Converts the string back to a number
      //So, [^\d.] means "match any character that is not a digit or a period."
    }

    // Calculate the tax
    const tax = 0.12 * totalPrice;

    // Calculate the shipping cost
    const shipping = 10;

    // Calculate the order total
    const orderTotal = totalPrice + tax + shipping;

    // Update the cart total section
    const cartTotalSection = document.querySelector(".cart-total");
    cartTotalSection.innerHTML = `
        <div class="col-6">
          SUBTOTAL
        </div>
        <div class="col-6">
          $${totalPrice.toFixed(2)} 
        </div>
        <div class="col-6">
          TAX
        </div>
        <div class="col-6">
          $${tax.toFixed(2)}
        </div>
        <div class="col-6">
          SHIPPING
        </div>
        <div class="col-6">
          $${shipping.toFixed(2)}
        </div>
        <div class="col-6 my-2">
          ORDER TOTAL
        </div>
        <div class="col-6 text-danger my-2">
          $${orderTotal.toFixed(2)}
        </div>`;
    // Rounds off  to 2 decimal places the 'toFixed(2)';

    // adding event listner to plus button 
    ADCSection.querySelectorAll(".quantity-plus").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const id = btn.dataset.id; // it is coming from the code above in the update cart this gets the name 
        const jsonInfo = shopObj[id]; // this gets the whole object the whole json of the item
        jsonInfo.quantity += 1;
        updateCart(shopObj); //why is this being used because still htese evnt listners are inside the scope of this funciton 
      });
    })
    ADCSection.querySelectorAll(".quantity-minus").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const id = btn.dataset.id; // it is coming from the code above in the update cart this gets the name 
        const jsonInfo = shopObj[id]; // this gets the whole object
        if (jsonInfo.quantity >= 1) {
          jsonInfo.quantity -= 1;
          updateCart(shopObj); //why is this being used because still htese evnt listners are inside the scope of this funciton???
          // ANSWER : (RECURSION) User clicks a quantity button (plus or minus).
          // The event listener updates the shopObj.
          // The updateCart function is called with the updated shopObj.
          // updateCart clears the cart's HTML, generates the updated HTML for the cart, and recalculates the totals based on the modified shopObj.
        }
      });
    })
  }



  // NEXT PART


  // attaching event listners to the categories by name
  const categoryBtns = document.querySelectorAll(".category");




  // FUNCTIONS
  categoryBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const catClass = btn.classList[3];

      // HIDE ALL PRODUCTS
      document.querySelectorAll(".product").forEach(function (item) {
        item.style.display = "none";

        // DISPLAY ONLY MATCHING ITEMS
        document.querySelectorAll("." + catClass).forEach(function (item) {
          item.style.display = "block";
        })
      })
    })
  })



  // GIVE EACH MODAL DIFFERENT NAME AND PICTURE
  const zoomBtns = document.querySelectorAll(".featured-search-icon");
  const btns = document.querySelectorAll('.modal-adc');


  // Move the event listeners for "Add to Cart" buttons outside of the "Zoom" button click event


  zoomBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      //get the items 
      const img = btn.previousElementSibling.src;
      const name = btn.parentElement.nextElementSibling.textContent.trim();
      const price = btn.parentElement.nextElementSibling.nextElementSibling.lastElementChild.textContent.trim();


      btns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          const itemInfo = {
            img: img,
            name: name,
            price: price,
            quantity: 1
          };


          const id = itemInfo.name;
          if (shopObj[id]) {
            shopObj[id].quantity += 1;
          } else {
            shopObj[id] = itemInfo;
          }
          updateCart(shopObj);
        });
      });

      // EVENTLISTNERS TO THE QUANTITY BTNS
      document.querySelectorAll(".plus").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          const middleSpan = btn.previousElementSibling;
          if (middleSpan) {
            let currentValue = parseInt(middleSpan.innerText);
            currentValue += 1;
            middleSpan.innerText = currentValue;
          }
        });
      });


      document.querySelectorAll(".minus").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          const middleSpan = btn.nextElementSibling;
          let currentValue = parseInt(middleSpan.innerText);
          if (currentValue > 0) {
            currentValue -= 1;
            middleSpan.innerText = currentValue;
          }
        });
      });



      //  UPDATE THE DATA IN THE MODAL
      document.getElementById("modal-product-image").src = img; // Fix variable name
      document.getElementById("modal-product-name").innerText = name; // Fix variable name
      document.getElementById("modal-product-price").innerText = price; // Fix variable name


      $("#productModal").modal("show");
      //$("#productModal"): This uses the jQuery selector to select the HTML element with the ID "productModal".
      // In this case, it's selecting the Bootstrap modal.
      //.modal("show"): This is a jQuery method to trigger the "show" behavior on the selected modal. It instructs the modal to become visible.
      // The Bootstrap modal has different states, and "show" is one of them, indicating that the modal should be displayed.
    })
  })



  //add filter functionality by price 

  //-- I need to add a slider functionality
  //get the element with the slider 
  const slider = document.querySelector(".form-control-range");

  slider.addEventListener("input", function () {
    const currentValue = slider.value;
    slider.previousElementSibling.innerText = `Price: $0 - $${currentValue}`;

    //--I need to categorize the items according to price 
    //in need to get the value slider and match it with the price of items 
    document.querySelectorAll(".product").forEach(function (item) {
      //get the price of each item through querySelector
      const price = parseInt(item.querySelector(".text-center span:last-child").textContent.slice(1));//slicing the string to remove the $ sign
      if (currentValue >= price) {
        item.style.display = "block";
        console.log(price);
      }// if value is less then the price the display other wise dont 
      else {
        item.style.display = "none";
      }
    })

  })




  // add filter functionality by name 
  const inputSection = document.querySelector(".form-control");
  inputSection.addEventListener("input", function (e) {
    const inputValue = inputSection.value.toLowerCase();// Convert to lowercase for case-insensitive comparison

    //loop through the items to get the items names 
    const products = document.querySelectorAll(".product")
    products.forEach(function (item) {
      const itemName = item.querySelector(".featured-container").nextElementSibling.innerText.toLowerCase();
      // use if else to match
      if (itemName.includes(inputValue)) {
        item.style.display = "block";
      }
      else {
        item.style.display = "none";
      }
    })
  })




  const colorBtns = document.querySelectorAll(".products-color-link");

  colorBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const clickedColor = e.currentTarget.querySelector('.products-color').nextSibling.textContent.trim();
      // the nextSibling gets the next element wether its an element or just text 
      // Hide all products
      document.querySelectorAll(".product").forEach(function (item) {
        item.style.display = "none";
      });
      // show only the matching products 
      document.querySelectorAll(".product").forEach(function (item) {
        // .contains it is used with DOM elements
        // .includes it is used to search inside an array 
        if (item.classList.contains(clickedColor)) {
          item.style.display = "block";
        }
        else{
          item.style.display = "none";
        }
      })

    });
  });

  //nothing is being console logged


});

