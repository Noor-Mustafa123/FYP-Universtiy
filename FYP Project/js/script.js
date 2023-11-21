document.addEventListener("DOMContentLoaded", function () {
  // DOM ITEMS
  const featuredSection = document.querySelectorAll(".featured");
  const addToCartBtns = document.querySelectorAll(".featured-store-link")

  const ADCSection = document.querySelector(".pointer") // Modified this line



  // OBJECT TO SAVE ITEMS 
  const shopObj = {}


  // FUNCTIONS
  addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("add to cart button is working")
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
    //key is hte name of the property which has the value {property: value}
    for (let id in shopObj) {
      let item = shopObj[id];

      // Add the HTML for each column in the row
      let html = `
      
                <div class=" col-10 mx-auto col-md-2 my-3">
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
  // the add to cart funcitonality for modals has been added here 

  zoomBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      //get the items 
      const img = btn.previousElementSibling.src;
      const name = btn.parentElement.nextElementSibling.textContent.trim();
      const price = btn.parentElement.nextElementSibling.nextElementSibling.lastElementChild.textContent.trim();

      //addinig add to cart functionality in the adc modal
      btns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          const itemInfo = {
            img: img,
            name: name,
            price: price,
            quantity: 1
          };
          console.log("modal adc working ");

          //It then checks if the product already exists in the shopObj (which represents the shopping cart). 
          //If it does, it increments the quantity of that product by 1. If it doesn’t, it adds the itemInfo object to the shopObj.

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

  const slider = document.querySelector(".jlk");
  //The bug on line 287 occurred because of how the Document Object Model (DOM) works. When a webpage loads, the DOM can only access elements from the currently open page in the browser. If you try to access an element from any other page using JavaScript, it will return null. 
  //The issue arose because an event listener was being attached to this null element. 
  //As a result, it wasn’t returning the expected value and caused a bug. To fix this, i used an if else condition

  // ERROR:indicates that you're trying to call the addEventListener method on an object that is null
  // this slider object is null
  if (slider) {
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
        }// if value is less then the price the display other wise dont 
        else {
          item.style.display = "none";
        }
      })

    })
  }
  else {
    console.log("boho error")
  }





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
        else {
          item.style.display = "none";
        }
      })
    })
  });




  // JSON FOR THE SINGLE PRODUCT PAGE 



  const productObj = [
    {
      "name": "Luxury Couch",
      "price": {
        "old": 2000,
        "new": 1500
      },
      "category": "livingroom",
      "color": "black",
      "image": "img/img-products/product-7.png",
      "description": "Premium luxury couch for your living room. Elegant design and comfortable seating.",
      "reviews": {
        "rating": 4.5,
        "count": 15
      },
      "additionalInformation": "Dimensions: 80\" x 40\" x 30\"\nMaterial: High-quality fabric\nAssembly required: Yes"
    },
    {
      "name": "Kitchen Table",
      "price": {
        "old": 600,
        "new": 499
      },
      "category": "kitchen",
      "color": "yellow",
      "image": "img/img-products/product-8.png",
      "description": "Stylish kitchen table for family gatherings and meals.",
      "reviews": {
        "rating": 4.2,
        "count": 10
      },
      "additionalInformation": "Dimensions: 48\" x 30\" x 28\"\nMaterial: Solid wood\nAssembly required: No"
    },
    {

      "name": "Cupboard",
      "price": {
        "old": 300,
        "new": 250
      },
      "category": "kitchen",
      "color": "yellow",
      "image": "img/img-products/product-9.png",
      "description": "Spacious cupboard for your kitchen storage needs.",
      "reviews": {
        "rating": 4.0,
        "count": 8
      },
      "additionalInformation": "Dimensions: 36\" x 24\" x 72\"\nMaterial: Particle board\nAssembly required: Yes"
    },
    {
      "name": "Queen Sized Bed",
      "price": {
        "old": 2500,
        "new": 2000
      },
      "category": "bedroom",
      "color": "red",
      "image": "img/img-products/product-3.png",
      "description": "Luxurious queen-sized bed for a comfortable night's sleep.",
      "reviews": {
        "rating": 4.8,
        "count": 20
      },
      "additionalInformation": "Dimensions: 60\" x 80\" x 36\"\nMaterial: Solid wood\nAssembly required: Yes"
    },
    {
      "name": "Designer Table",
      "price": {
        "old": 500,
        "new": 480
      },
      "category": "livingroom",
      "color": "white",
      "image": "img/img-products/product-10.png",
      "description": "Elegant designer table to enhance your living room decor.",
      "reviews": {
        "rating": 4.7,
        "count": 18
      },
      "additionalInformation": "Dimensions: 36\" x 36\" x 18\"\nMaterial: MDF and metal\nAssembly required: No"
    },
    {
      "name": "Patio Table",
      "price": {
        "old": 800,
        "new": 600
      },
      "category": "patio",
      "color": "white",
      "image": "img/img-products/product-11.png",
      "description": "Sturdy patio table for outdoor gatherings and relaxation.",
      "reviews": {
        "rating": 4.6,
        "count": 25
      },
      "additionalInformation": "Dimensions: 48\" x 28\" x 24\"\nMaterial: Weather-resistant wood\nAssembly required: Yes"
    },
    {
      "name": "Shelf",
      "price": {
        "old": 400,
        "new": 350
      },
      "category": "bedroom",
      "color": "white",
      "image": "img/img-products/product-12.png",
      "description": "Versatile shelf for organizing your bedroom essentials.",
      "reviews": {
        "rating": 4.3,
        "count": 12
      },
      "additionalInformation": "Dimensions: 24\" x 12\" x 60\"\nMaterial: Particle board\nAssembly required: Yes"
    },
    {
      "name": "Chair",
      "price": {
        "old": 200,
        "new": 150
      },
      "category": "patio",
      "color": "black",
      "image": "img/img-products/product-1.png",
      "description": "Comfortable chair for your patio relaxation.",
      "reviews": {
        "rating": 4.4,
        "count": 22
      },
      "additionalInformation": "Dimensions: 24\" x 24\" x 36\"\nMaterial: Plastic and metal\nAssembly required: No"
    },
    {
      "name": "Marble Sink",
      "price": {
        "old": 800,
        "new": 750
      },
      "category": "bathroom",
      "color": "white",
      "image": "img/img-products/product-13.png",
      "description": "Elegant marble sink for your bathroom upgrade.",
      "reviews": {
        "rating": 4.9,
        "count": 30
      },
      "additionalInformation": "Dimensions: 36\" x 22\" x 8\"\nMaterial: Marble\nAssembly required: No"
    },
    {
      "name": "Small Sofa",
      "price": {
        "old": 200,
        "new": 175
      },
      "category": "livingroom",
      "color": "yellow",
      "image": "img/img-products/product-14.png",
      "description": "Cozy small sofa perfect for compact living spaces.",
      "reviews": {
        "rating": 4.2,
        "count": 15
      },
      "additionalInformation": "Dimensions: 60\" x 32\" x 30\"\nMaterial: Fabric\nAssembly required: No"
    },
    {
      "name": "Wooden Table",
      "price": {
        "old": 100,
        "new": 75
      },
      "category": "patio",
      "color": "yellow",
      "image": "img/img-products/product-15.png",
      "description": "Durable wooden table for your patio setup.",
      "reviews": {
        "rating": 4.5,
        "count": 18
      },
      "additionalInformation": "Dimensions: 36\" x 24\" x 18\"\nMaterial: Solid wood\nAssembly required: Yes"
    },
    {
      "name": "Couch",
      "price": {
        "old": 1000,
        "new": 800
      },
      "category": "livingroom",
      "color": "white",
      "image": "img/img-products/product-6.png",
      "description": "Classic couch for a stylish and comfortable living room.",
      "reviews": {
        "rating": 4.6,
        "count": 20
      },
      "additionalInformation": "Dimensions: 72\" x 36\" x 30\"\nMaterial: Linen fabric\nAssembly required: No"
    },
    {
      "name": "Large Couch",
      "price": {
        "old": 1200,
        "new": 1000
      },
      "category": "livingroom",
      "color": "yellow",
      "image": "img/img-products/product-5.png",
      "description": "Spacious couch for large living rooms. Ultimate comfort for the whole family.",
      "reviews": {
        "rating": 4.7,
        "count": 25
      },
      "additionalInformation": "Dimensions: 90\" x 40\" x 36\"\nMaterial: Leather\nAssembly required: Yes"
    },
    {
      "name": "Side Table",
      "price": {
        "old": 500,
        "new": 300
      },
      "category": "bedroom",
      "color": "blue",
      "image": "img/img-products/product-4.png",
      "description": "Compact side table for your bedroom essentials.",
      "reviews": {
        "rating": 4.0,
        "count": 10
      },
      "additionalInformation": "Dimensions: 18\" x 18\" x 24\"\nMaterial: Wood\nAssembly required: No"
    },
    {
      "name": "Sofa",
      "price": {
        "old": 400,
        "new": 250
      },
      "category": "bedroom",
      "color": "blue",
      "image": "img/img-products/product-2.png",
      "description": "Modern sofa for your bedroom with a touch of elegance.",
      "reviews": {
        "rating": 4.3,
        "count": 15
      },
      "additionalInformation": "Dimensions: 60\" x 32\" x 30\"\nMaterial: Velvet\nAssembly required: No"
    }
  ]



  // target those elements in which to change the data 
  const mainImage = document.getElementById("main-image");
  const productName = document.querySelector(".name-product");
  const productPrice = document.querySelector(".price-product");
  const productDescription = document.querySelector(".description-product"); // ALL OF THESE ARE GLOBAL VARIABLES
  const reviewCount = document.querySelector(".ratings span.text-capitalize");
  const imagesMany = document.querySelectorAll(".single-product-photo");
  const infoLink = document.querySelectorAll(".product-info-link");
  const block = document.querySelector(".block");

  // taget btns
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  // console.log(mainImage);
  // console.log(productName);// this 
  // console.log(productPrice);//this 
  // console.log(productDescription);//this 
  // console.log(reviewCount);

  // currentIndex
  let currentProductIndex = 0;

  // Event listeners
  // nextBtn
  nextBtn.addEventListener("click", function (e) {
    currentProductIndex++;
    if (currentProductIndex >= productObj.length) {
      currentProductIndex = 0;
    }
    const currentObj = productObj[currentProductIndex];
    //setting the values
    mainImage.src = currentObj.image;
    productName.textContent = currentObj.name; // textContent keeps the formating of the text while innerText does not 
    productPrice.textContent = `Price:$${currentObj.price.old}-$${currentObj.price.new}`;
    productDescription.textContent = currentObj.description;
    reviewCount.textContent = `Customer reviews: ${currentObj.reviews.count}`;
    //adding the images
    imagesMany.forEach(function (image) {
      image.lastElementChild.src = currentObj.image;
    });

    // adding the tab swapping functionality 

    let currentId = 'description';

    infoLink.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        currentId = e.currentTarget.id; // Update the currentId variable

        if (currentId === 'description') {
          block.textContent = productObj[currentProductIndex].description;
        } else if (currentId === 'additional') {
          block.textContent = productObj[currentProductIndex].additionalInformation;
        } else if (currentId === 'reviews') {
          block.textContent = productObj[currentProductIndex].reviews.rating;
        }

        // Hide all blocks except the current one
        block.classList.add('active');
        // document.querySelectorAll('.block').forEach(function(otherBlock) {
        //   if (otherBlock !== block) {
        //     otherBlock.textContent = '';
        //     otherBlock.classList.remove('active');
        //   }
        // });
      });
    });
  })

  //prevBtn
  prevBtn.addEventListener("click", function (e) {
    currentProductIndex--;
    if (currentProductIndex < 0) {
      currentProductIndex = productObj.length - 1;
    }

    const currentProduct = productObj[currentProductIndex];
    mainImage.src = currentProduct.image;
    productName.textContent = currentProduct.name;
    productPrice.textContent = `Price: $${currentProduct.price.new}`;
    productDescription.textContent = currentProduct.description;
    reviewCount.textContent = `Customer reviews: ${currentProduct.reviews.count}`;

    //adding the images

    imagesMany.forEach(function (image) {
      image.lastElementChild.src = currentProduct.image;
    });

    // adding the tab swapping functionality 

    let currentId = 'description';

    infoLink.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        currentId = e.currentTarget.id; // Update the currentId variable

        if (currentId === 'description') {
          block.textContent = productObj[currentProductIndex].description;
        } else if (currentId === 'additional') {
          block.textContent = productObj[currentProductIndex].additionalInformation;
        } else if (currentId === 'reviews') {
          block.textContent = productObj[currentProductIndex].reviews.rating;
        }

        // Hide all blocks except the current one
        block.classList.add('active');
        //because there are no blocks except the one block and every other data is filtered throught the if else conditions
        //we directly add the active class to the current value of the block filtered by the above condition 

        //  document.querySelectorAll('.block').forEach(function(otherBlock) {
        //    if (otherBlock !== block) {
        //      otherBlock.textContent = '';
        //      otherBlock.classList.remove('active');
        //      console.log(otherBlock);
        //    }
        //  });
      });
    });

  });




  //adding the quantity counter (maybe Before? the above functionality)
  // EVENTLISTNERS TO THE QUANTITY BTNS

  const plusBtn = document.querySelector(".quantityplus")



  plusBtn.addEventListener("click", function () {
    const middleSpan = this.previousElementSibling;
    if (middleSpan) {
      let currentValue = parseInt(middleSpan.innerText);
      currentValue += 1;
      middleSpan.innerText = currentValue;
    }
  });



  const minusBtn = document.querySelector(".quantityminus");

  minusBtn.addEventListener("click", function () {

    const middleSpan = this.nextElementSibling;
    let currentValue = parseInt(middleSpan.innerText);
    if (currentValue > 0) {
      currentValue -= 1;
      middleSpan.innerText = currentValue;
    }
  });




  //adding adc functionality to the add to cart button in the single product page 
  // GIVE EACH MODAL DIFFERENT NAME AND PICTURE
  // !! Dont add dashes in classes like single-page-adc because browser considers it as a bootstrap class and not as a simple class
  const singlePageAdc = document.querySelector('.singlepageadc');
  
  singlePageAdc.addEventListener("click", function (e) {
    e.preventDefault();
    //get the items 
    const img = mainImage.src;
    const name = productName.textContent;
    const price = productPrice.textContent;
   //IMPORTANT //. This is because you want to get the current quantity value at the time the singlePageAdc button is clicked, not at the time the page loads.
   const quantityValue = parseInt(plusBtn.previousElementSibling.innerText);
   console.log(quantityValue);
 

    //creating the object to store inside the json
    const itemInfo = {
      img: img,
      name: name,
      price: price,
      quantity: quantityValue
    };
    console.log("modal adc working ");

    //It then checks if the product already exists in the shopObj (which represents the shopping cart). 
    //If it does, it increments the quantity of that product by 1. If it doesn’t, it adds the itemInfo object to the shopObj.

    const id = itemInfo.name;
    if (shopObj[id]) {
      shopObj[id].quantity += 1;
    } else {
      shopObj[id] = itemInfo;
    }
    updateCart(shopObj);

  });

  
}); // the end of dom content loaded dont write below it 









