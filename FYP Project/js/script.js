let loggedInUserEmail2 = sessionStorage.getItem("Email");
document.addEventListener("DOMContentLoaded", function () {
    // DOM ITEMS

    const featuredSection = document.querySelectorAll(".featured");
    const addToCartBtns = document.querySelectorAll(".featured-store-link")

    const ADCSection = document.querySelector(".pointer") // Modified this line

    // The line of code you're asking about is retrieving an item from the browser's local storage and parsing it as JSON to convert it from a string to a JavaScript object. If the item doesn't exist in local storage (i.e., localStorage.getItem('shopObj') returns null), it defaults to an empty array [].
    // OBJECT TO SAVE ITEMS
    const shopObj = JSON.parse(sessionStorage.getItem("shopObj")) || [];
    const adcproductObj = JSON.parse(sessionStorage.getItem("adcObjArray")) || {
        "email": sessionStorage.getItem("Email"),
        "address": sessionStorage.getItem("Address"),
        "items": []
    };
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
                quantity: 1,

            }

            // DUPLICATE

            // if duplicate increase the quantity
            const adcItemInfo = {
                "itemName": item.querySelector(".texas").textContent.trim(),
                "itemQuantity": 1,
                "productId": e.currentTarget.dataset.productId
            }


            // Check if item already exists in the array
            const existantItemForadcObj = adcproductObj.items.find(function (obj) {
                return obj.itemName === adcItemInfo.itemName;
            });
            // for adcitemObj
            if (existantItemForadcObj) {
                existantItemForadcObj.itemQuantity += 1;
            } else {
                adcproductObj.items.push(adcItemInfo);
            }


            const existantItem = shopObj.find(function (obj) {
                return obj.name === itemInfo.name;


            });
            // for shop obj
            if (existantItem) {
                existantItem.quantity += itemInfo.quantity;
            } else {
                shopObj.push(itemInfo);
                //adding the itemInfo to the object and making he name the key value pair
            }
            // this is for sending the data over to the database
            sessionStorage.setItem("adcObjArray", JSON.stringify(adcproductObj));
            // this obj is for displaying the items
            sessionStorage.setItem('shopObj', JSON.stringify(shopObj));
            updateCart(shopObj);
            console.log("adcObjarray added to the session storage")
            console.log("add to cart button is working to the end")
        });
    });

    // ATTACHING EVENT LISTNERS TO QUANTITY BUTTONS

///////////////////////////////////////////////
    // UPDATE CART FUNCTION
    function updateCart(shopObj) {
        if (ADCSection) {
            // Clear the cart first
            // while (condition) {
            // code to be executed as long as the condition is true }
            // When updateCart is called, the while loop clears the cart, and then the for loop adds each item in shopObj back into the cart.
            // This includes both the first and second items you clicked on.

            //   this line is added for testing

            while (ADCSection.firstChild) {
                ADCSection.removeChild(ADCSection.firstChild);
            }
            // Iterate over each item in the shopObj
            // This is a for...in loop, which is used to iterate over the properties of an object. it executes code for each property of an object
            //key is hte name of the property which has the value {property: value}
            // let id in shopObj: This part of the loop is saying, "for each property id in the object shopObj".
            // let item = shopObj[id];: This line is accessing the value of the property id in the object shopObj and assigning it to the variable item.
            for (let id in shopObj) {
                let item = shopObj[id];
                // Add the HTML for each column in the row
                let html = `
      
                <div class=" col-10 mx-auto col-md-2 my-3">
                    <img src="${item.img}" alt="" class="img-fluid">
                </div>
                <div class="col-10 mx-auto col-md-4">
                    <p class="text-uppercase itemName">${item.name}</p>
                </div>
                <div class="col-10 mx-auto col-md-2">
                    <p class="text-uppercase">${item.price}</p>
                </div>
                <div class="col-10 mx-auto col-md-2">
                <div class="d-flex justify-content-center align-items-center">
                <span class="btn btn-black mx-1 quantity-minus" data-id="${id}">-</span>
                <span class="btn btn-black mx-1 quantity itemQuantity">${item.quantity}</span>
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
            ////////////////////////////////////////////////
            // Total functionality
            // Calculate the total price of all items in the cart
            let totalPrice = 0;

            for (let id in shopObj) {
                // HERE IN THIS OBJECT FORIN LOOP IT IS GETTING AN ARRAY AS AN OBJECT SO HERE THE ID IS THE INDEX OF THE OBJECT IN THE ARRAY AND THE
                // ITEM IS THE CURRENT OBJEECT MATCHIGN THE INDEX
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
                    const id = btn.dataset.id;// it is coming from the html being dynamically being added above in the update cart this gets the name

                    const jsonInfo = shopObj[id]; // this gets the whole object the whole json of the item
                    jsonInfo.quantity += 1;
                    // it is replacing the existing value at the location of the key which is shopObj
                    sessionStorage.setItem('shopObj', JSON.stringify(shopObj));
                    updateCart(shopObj); //are calling these function inside its decleration becaue the event listeners are called after the function itself is ran so it is ok

                    //Making functionality to increase quantity in the adcObjArray as well
                    const itemNameInTheCart = ADCSection.querySelector(".itemName").textContent;
                    const itemQuantityInTheCart = ADCSection.querySelector(".itemQuantity").textContent;
                    const existantItem = adcproductObj.items.find(function (item) {
                        return itemNameInTheCart == item.itemName;
                    });
                    existantItem.itemQuantity = itemQuantityInTheCart;
                    sessionStorage.setItem('adcObjArray', JSON.stringify(adcproductObj));
                });
            })
            ADCSection.querySelectorAll(".quantity-minus").forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    const id = btn.dataset.id; // it is coming from the code above in the update cart this gets the name
                    const jsonInfo = shopObj[id]; // this gets the whole object
                    if (jsonInfo.quantity >= 1) {
                        jsonInfo.quantity -= 1;
                        sessionStorage.setItem('shopObj', JSON.stringify(shopObj));
                        updateCart(shopObj); //why is this being used because still htese evnt listners are inside the scope of this funciton???
                        // ANSWER : (RECURSION) User clicks a quantity button (plus or minus).
                        // The event listener updates the shopObj.
                        // The updateCart function is called with the updated shopObj.
                        // updateCart clears the cart's HTML, generates the updated HTML for the cart, and recalculates the totals based on the modified shopObj.
                        //Making functionality to increase quantity in the adcObjArray as well
                        const itemNameInTheCart = ADCSection.querySelector(".itemName").textContent;
                        const itemQuantityInTheCart = ADCSection.querySelector(".itemQuantity").textContent;
                        const existantItem = adcproductObj.items.find(function (item) {
                            return itemNameInTheCart == item.itemName;
                        });
                        existantItem.itemQuantity = itemQuantityInTheCart;
                        sessionStorage.setItem('adcObjArray', JSON.stringify(adcproductObj));
                    }
                });
            })

        }
    }


    // so that the update cart method runs only when the store page is opened
    $(document).ready(function () {
        updateCart(shopObj);
    });
    //
    // $(document).ready(function () {
    //     if (window.location.href.endsWith('orderPage.html')) {
    //         showDataOnOrderPage();
    //         console.log("the show data on orderpage function is running");
    //     }
    // });

    // console.log(userHasLoggedIn);
    // NEXT PART

////////////////////////////////////////////////////////
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
            const parent = btn.parentElement.querySelector(".featured-store-link");
            const priceId = parent.dataset.productId;
            // the item quantity is returning a string so i convert it to parseInt
            const itemQuantity = parseInt($(".modalItemQuantity").text(), 10);


            //addinig add to cart functionality in the adc modal
            btns.forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    const itemInfo = {
                        img: img,
                        name: name,
                        price: price,
                        quantity: itemQuantity
                    };


                    //It then checks if the product already exists in the shopObj (which represents the shopping cart).
                    //If it does, it increments the quantity of that product by 1. If it doesn’t, it adds the itemInfo object to the shopObj.


                    // DUPLICATE
                    // if duplicate increase the quantity
                    const existantItem = shopObj.find(function (obj) {
                        return obj.name === itemInfo.name;
                    });
                    if (existantItem) {
                        existantItem.quantity += 1;
                    } else {
                        shopObj.push(itemInfo);
                        //adding the itemInfo to the object and making he name the key value pair
                    }
                    sessionStorage.setItem('shopObj', JSON.stringify(shopObj));

                    updateCart(shopObj);


                    //     FOR THE PRODUCTOBJ FUNCTIONAITY
                    const adcItemInfo = {
                        "itemName": name,
                        "itemQuantity": itemQuantity,
                        "productId": priceId
                    }


                    // Check if item already exists in the array
                    const existantItemForadcObj = adcproductObj.items.find(function (obj) {
                        return obj.itemName === adcItemInfo.itemName;
                    });
                    // for adcitemObj
                    if (existantItemForadcObj) {
                        existantItemForadcObj.itemQuantity += 1;
                    } else {
                        adcproductObj.items.push(adcItemInfo);
                    }

                    sessionStorage.setItem("adcObjArray", JSON.stringify(adcproductObj));

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


    // EVENTLISTNERS TO THE QUANTITY BTNS
    document.querySelectorAll(".plus").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            const middleSpan = btn.previousElementSibling;
            console.log(middleSpan.textContent);
            console.log(middleSpan);
            if (middleSpan) {
                let currentValue = parseInt(middleSpan.innerText);

                currentValue += 1;
                middleSpan.innerText = currentValue;
            }
            console.log(middleSpan.textContent);
        });
    });
    // FIXME: i moved the event listners outside of the zoom buttons the quantity buttons bug in the modal was happening because the event listeners were being added
    // FIXME: every time a zoom button was clicked as the eventlisters were inside the zoom buttons eventlistenr loop so every time a zoom button was clicked a new event listenr was added which statcked them up causing a double on each modal item quanaity button

    document.querySelectorAll(".minus").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            const middleSpan = btn.nextElementSibling;
            let currentValue = parseInt(middleSpan.innerText);
            console.log(middleSpan.textContent);
            console.log(middleSpan);
            if (currentValue > 0) {
                currentValue -= 1;
                middleSpan.innerText = currentValue;

            }
            console.log(middleSpan.textContent);

        });
    });


//////////////////////////////////////////
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
    } else {
        console.log("boho error")
    }


///////////////////////////////////////////////////
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
            } else {
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
                } else {
                    item.style.display = "none";
                }
            })
        })
    });


////////////////////////////////////////////////////////////
    // JSON FOR THE SINGLE PRODUCT PAGE





    // target those elements in which to change the data
    const mainImage = document.getElementById("main-image");
    const productName = document.querySelector(".name-product");
    const productPrice = document.querySelector(".price-product");
    const productDescription = document.querySelector(".description-product"); // ALL OF THESE ARE GLOBAL VARIABLES
    const reviewCount = document.querySelector(".ratings span.text-capitalize");
    const imagesMany = document.querySelectorAll(".single-product-photo");
    const infoLink = document.querySelectorAll(".product-info-link");
    const block = document.querySelector(".block");
    // This is a dummy value it will be changed when the next or prev button is clicked then it wil lbe addedd into the cart
    let priceIdVariable = "price_1P2XaC03YcH2K12qns5PGnsJ";

    // THE JQUERY FORMAT IS $(selector).action()
    // $: Defines or accesses jQuery.
    // (selector): Finds HTML elements based on the selector.
    // .action(): Is a jQuery action to be performed on the element(s).

    // taget btns
    const $nextBtn = $(".next-btn");
    const $prevBtn = $(".prev-btn");


    // currentIndex
    let currentProductIndex = 0;

    // Event listeners
    // if (nextBtn) {
    $nextBtn.on("click", function (e) {
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
        priceIdVariable = currentObj.priceId;
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

            });
        });
        //     Moving this out of the forEachstatment


        // Trigger click event on the current link button
        document.getElementById('description').click();


    })

    //}

    //prevBtn
    // if (prevBtn) {
    $prevBtn.on("click", function (e) {
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


            });
        });
        // Trigger click event on the current link button
        document.getElementById('description').click();


    });


    //adding the quantity counter (maybe Before? the above functionality)
    // EVENTLISTNERS TO THE QUANTITY BTNS

    const plusBtn = document.querySelector(".quantityplus")


    if (plusBtn) {
        plusBtn.addEventListener("click", function () {
            const middleSpan = this.previousElementSibling;
            if (middleSpan) {
                let currentValue = parseInt(middleSpan.innerText);
                currentValue += 1;
                middleSpan.innerText = currentValue;
            }
        });
    }


    const minusBtn = document.querySelector(".quantityminus");
    if (minusBtn) {
        minusBtn.addEventListener("click", function () {

            const middleSpan = this.nextElementSibling;
            let currentValue = parseInt(middleSpan.innerText);
            if (currentValue > 0) {
                currentValue -= 1;
                middleSpan.innerText = currentValue;
            }
        });
    }


/////////////////////////////////////////////////////////////////////////////////////////////////

    //adding adc functionality to the add to cart button in the single product page
    // GIVE EACH MODAL DIFFERENT NAME AND PICTURE
    // !! Dont add dashes in classes like single-page-adc because browser considers it as a bootstrap class and not as a simple class
    const $singlePageAdc = $('.singlepageadc');
    // if (singlePageAdc) {
    $singlePageAdc.on("click", function (e) {

        // fixing the bug of adding the full string literal in the updateCart method
        const newPrice = productPrice.textContent; // "Price:$oldPrice-$newPrice"
        const priceParts = newPrice.split('-'); // ["Price:$oldPrice", "$newPrice"]
        const newPricePart = priceParts[1]; // "$newPrice"
        // const newPPrice = parseFloat(newPricePart.split('$')[1]); // "newPrice" as a number
        e.preventDefault();
        //get the items
        const img = mainImage.src;
        const name = productName.textContent;
        const price = newPricePart;
        //IMPORTANT //. This is because you want to get the current quantity value at the time the singlePageAdc button is clicked, not at the time the page loads.
        const quantityValue = parseInt(plusBtn.previousElementSibling.innerText);
        console.log(quantityValue);
        const priceId = priceIdVariable;
        console.log(priceId);
        // TODO: i need to add the price id here then add it to the obj iteminfo below to store in the shop obj
        // the i will create a request using fetch api and send the data to authenticate to the server


        //FIXME: I NEED TO CREATE A DIFFERENT FUNCTIONALITY TO GET THE PRICE ID FROM THE PRODUCT OBJ AND THEN STORE IT IN THE SHOPOBJ ARRAY

        //creating the object to store inside the json
        const itemInfo = {
            img: img,
            name: name,
            price: price,
            quantity: quantityValue,
        };
        console.log("adc or single page is working ");

        //It then checks if the product already exists in the shopObj (which represents the shopping cart).
        //If it does, it increments the quantity of that product by 1. If it doesn’t, it adds the itemInfo object to the shopObj.


        // CREATING THE FUNCITONALITY TO ADD THE SINGLE PAGE ITEM TO THE ADCOBJARRAY

        // if duplicate increase the quantity
        const adcItemInfo = {
            "itemName": name,
            "itemQuantity": quantityValue,
            "productId": priceId
        }


        // Check if item already exists in the array
        const existantItemForadcObj = adcproductObj.items.find(function (obj) {
            return obj.itemName === adcItemInfo.itemName;
        });
        // for adcitemObj
        if (existantItemForadcObj) {
            existantItemForadcObj.itemQuantity += 1;
        } else {
            adcproductObj.items.push(adcItemInfo);
        }

        sessionStorage.setItem("adcObjArray", JSON.stringify(adcproductObj));


        // DUPLICATE
        // if duplicate increase the quantity
        const existantItem = shopObj.find(function (obj) {
            return obj.name === itemInfo.name;
        });
        if (existantItem) {
            existantItem.quantity += 1;
        } else {
            shopObj.push(itemInfo);
            //adding the itemInfo to the object and making he name the key value pair
        }
        sessionStorage.setItem('shopObj', JSON.stringify(shopObj));
        updateCart(shopObj);


    });


    // }

    ////////////////////////////////////////////////////
    // adding validation for the sign up page
    $(".form").validate({
        rules: {
            first: {
                required: true,
                maxlength: 10,
                minlength: 2
            },
            last: {
                required: true,
                maxlength: 10,
                minlength: 2
            },
            address: {
                required: true,
                maxlength: 50,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            repeat: {
                required: true,
                equalTo: "input[name='password']"
            }
        },

        messages: {
            first: {
                required: "Please enter your first name",
                maxlength: "Your first name must be at most 10 characters long",
                minlength: "Your first name must be at least 2 characters long"
            },
            last: {
                required: "Please enter your last name",
                maxlength: "Your last name must be at most 10 characters long",
                minlength: "Your last name must be at least 2 characters long"
            },
            address: {
                required: "Please enter your home address",
                maxlength: "Your address must be at most 50 characters long",
                minlength: "Your address must be at least 2 characters long"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please enter your password",
                minlength: "Your password must be at least 6 characters long"
            },
            repeat: {
                required: "Please repeat your password",
                equalTo: "Your repeated password must match the password"
            }
        },
        // this function is called for the placement of the error
        errorElement: "span",
        // error: This represents the error message that is generated when a validation rule is not met.
        // element: This represents the input field that the error message is associated with.
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            element.closest(".input-group").append(error);
        },
        //This function is called when an input field fails validation
        //error class and validclass are there because of pre build highlight parameters but not used
        highlight: function (element, errorClass, validClass) {
            // Add is-invalid class to the input field on validation error
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element, errorClass, validClass) {
            // Remove is-invalid class from the input field on validation success
            $(element).removeClass("is-invalid");
        },
    });


    // CREATING A SEPERATE FUNCTION FOR POST REQUEST
    async function newUserPostRequest(url) {

        let newUserInfo = {
            "firstName": $("input[name='first']").val(),
            "lastName": $("input[name='last']").val(),
            "email": $("input[name='email']").val(),
            "password": $("input[name='password']").val(),
            "address": $("input[name='address']").val()
        }

        // ! check why the name being sent is null

        console.log($("input[name='first']").val());

        await fetch(url, {

            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            //  The JSON.stringify() method in JavaScript converts a JavaScript object into a JSON string. This is necessary because HTTP is a text-based protocol, so you can only send text over HTTP. By converting the data object into a JSON string with JSON.stringify(data), you are able to send the data as text over HTTP. On the server side, you would then parse this JSON string back into an object to use it.
            body: JSON.stringify(newUserInfo), // body data type must match "Content-Type" header
        }).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (responseData) {

            console.log(responseData);
            console.log(responseData.errorString);
            showAlert(responseData.errorString);

            //* setting the access token to the session storage and placing checks to check if the value already exists then remove it then add the new access token
            //TODO: Make setup that the accessToken is use to login next

             if(!sessionStorage.getItem("accessToken")){
        sessionStorage.setItem("accessToken",JSON.stringify(responseData.accessToken));
         responseData.refreshToken;
            }
            else{
                sessionStorage.removeItem("accessToken");
                sessionStorage.setItem("accessToken",JSON.stringify(responseData.accessToken));
            }

            if(!sessionStorage.getItem("refreshToken")){
                sessionStorage.setItem("refreshToken",JSON.stringify(responseData.accessToken));
                responseData.refreshToken;
            }
            else{
                sessionStorage.removeItem("refreshToken");
                sessionStorage.setItem("refreshToken",JSON.stringify(responseData.accessToken));
            }


            if (responseData.errorString.indexOf("successfully")!== -1) {
                // Store the username in localStorage
                sessionStorage.setItem('userName', userName);
                // Redirect to the home page after the POST request is completed
                setTimeout(function () {
                    window.location.href = '../index.html';
                }, 6000)
            }
        }).catch(function (e) {
            console.log(e);
            const responseString = "Network Error";
            showAlert(responseString);
        })

    }


    let loggedInUserEmail;
    // console.log(loggedInUserEmail)
    let loggedInUserAddress;

    // No, the HTTP GET request does not typically have a body. According to the HTTP/1.1 specification, a GET request should not include a message body because the server will not use it. Instead, data sent to the server is appended to the URL as query parameters.

    async function userLoginRequest(url) {
        await fetch(url)
            .then(function (response) {
                return response.text();
            }).then(async function (responseData) {


                // getting the data from the response to store in the local storage to send with teh checkout request

                if (responseData.includes("Successfully")) {
                    let splitArray = responseData.split("-");
                    let email = splitArray[1];
                    let address = splitArray[2];
                    loggedInUserAddress = address;
                    loggedInUserEmail = email;

                    sessionStorage.setItem('Email', loggedInUserEmail);
                    sessionStorage.setItem("Address", loggedInUserAddress);
                }


                if (responseData.includes("Successfully")) {
                    showAlert("Login Successfully");
                    // Redirect to the home page after the login is successful
                    //add a function await function to send a requst to get the data of all the user orders relevelnt to a email of the user
                    await fetch("https://fyp-universtiy-production-4f96.up.railway.app/UserData/OrderDetails")

                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (responseData) {
                            sessionStorage.setItem("responseJson", JSON.stringify(responseData));
                        })

                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 5000);

                    console.log(responseData);
                    //Dynamically getting the first name
                    let responseParts = responseData.split('-'); // This splits the string into an array of words

                    console.log(responseParts)
                    // FIXME: there is a bug while showing the name match it

                    let lastName = responseParts[responseParts.length - 3];

                    let lastNameSplit = lastName.split(' ');

                 let veryLastName =    lastNameSplit[lastNameSplit.length - 1];

                    sessionStorage.setItem('userName', `${veryLastName}`);

                }

                else if (responseData.includes("admin")) {
                    showAlert("Welcome Admin")

                    sessionStorage.setItem('userName', "Noor");

                    setTimeout(() => {

                        window.location.href = 'AdminDashboard.html';

                    }, 4000);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    //add a function await function to send a requst to get the data of all the user orders relevelnt to a email of the user
                    await fetch("https://fyp-universtiy-production-4f96.up.railway.app/UserData/OrderDetails")
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (responseData) {
                            sessionStorage.setItem("responseJson", JSON.stringify(responseData));
                        })
                } else {
                    // Show an error message if the login wasn't successful
                    const responseString = "Bad Credentials";
                    showAlert(responseString);
                }
            })
            .catch(function (error) {
                const responseString = "Network Error";
                showAlert(responseString);
                console.log(error);
                console.log("this catch is catching the error")
            });
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ALERT SHOW METHOD
    function showAlert(responseString) {
        const alertContainer = $('.alertContainer');
        const successTemplateString = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

<div class="alert alert-success d-flex align-items-center mb-0" role="alert">
  <svg class="bi flex-shrink-0 me-2 mr-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    ${responseString}
  </div>
</div>`;

        const failureTemplateString = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

<div class="alert alert-danger d-flex align-items-center mb-0" role="alert">
  <svg class="bi flex-shrink-0 me-2 mr-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
  <div>
    ${responseString}
  </div>
</div>`;


        if (responseString.indexOf("Successfully") !== -1 || responseString.indexOf("Admin") !== -1) {
            alertContainer.html(successTemplateString);
        }
        else if(responseString.indexOf("successfully") !== -1){
            alertContainer.html(successTemplateString);
        }
        else {
            alertContainer.html(failureTemplateString)
        }
        // Remove the alert after 3 seconds
        setTimeout(() => {
            alertContainer.html('');
        }, 5000);


    }


    //SUBMISSION
    $(".form").on("submit", function (event) {

        event.preventDefault(); // Prevent the default form submission behavior
        // If the form is valid

        if ($(".form").valid()) {


            // newUserPostRequest("https://fyp-universtiy-production-4f96.up.railway.app/api/v1/auth/register");
            newUserPostRequest("http://localhost:8080/api/v1/auth/register");

            // Show a toast notification for successful submission
            console.log('Form submitted successfully.');

            // Prevent form submission so the page doesn't reload
            return false;
        } else if ($(".form").invalid()) {
            console.log('Form submission failed. Please check your inputs.');

            // Prevent form submission so the page doesn't reload
            return false;

        }
    });


    ///////////////////////////////////////////////////////////////////////
    // Add validation rules to the login form
    $(".loginForm").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6  // You can set the minimum length for the password
            }
        },
        messages: {
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please enter your password",
                minlength: "Your password must be at least 6 characters Long"
            }
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            // Place error message below the input field
            error.addClass("invalid-feedback");
            element.closest(".input-group").append(error);
        },
        highlight: function (element, errorClass, validClass) {
            // Add is-invalid class to the input field on validation error
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element, errorClass, validClass) {
            // Remove is-invalid class from the input field on validation success
            $(element).removeClass("is-invalid");
        }
    });


    $(".loginForm").on("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // Check if the form is valid
        // The $("form") selector in jQuery selects all the <form> elements in the HTML of the currently loaded webpage. that is why we didnt use a .for selecting a class name

        if ($(".loginForm").valid()) {
            // If the form is valid
            const userEmail = $("input[name='email']").val();
            const userPassword = $("input[name='password']").val();

            // Add your AJAX request here if you want to submit the form data to the server

            userLoginRequest(`https://fyp-universtiy-production-4f96.up.railway.app/UserData/login?email=${userEmail}&password=${userPassword}`);


            // Prevent form submission so the page doesn't reload
            return false;
        } else if ($("form")) {
            // If the form is not valid

            // Show a toast notification for unsuccessful submission
            console.log('Form submission failed. Please check your inputs.');

            // Prevent form submission so the page doesn't reload
            return false;
        }
    });


    ///////////////////////////////////////////////
    // retrieving name from local storage to show it
    $(document).ready(function () {
        const userName = sessionStorage.getItem('userName');

        // this is a ocmment
        if (!userName) {
            const signOutBtn = $(".signOutBtn");
            signOutBtn.hide();
        } else if (userName) {
            const icon = $(".userIcon");
            const element = $("<span></span>").addClass("mt-1 mr-2 nameSpan");
            element.text(userName);
            element.insertBefore(".signOutBtn");
            //     adding name to the admin dashboard after signup
            const adminElement = $("#dropdownMenuButton");
            adminElement.text(`Hello, ${userName}`)
        }


        if (userName == "Noor") {
            // setting the adminpanel link in the homepage navbar
            let ul = $(".homePageUl")
            ul.each(function () {
                    $(this).append('<li class="nav-item mx-2"><a href="AdminDashboard.html" class="nav-link">Admin Panel</a></li>');
                }
            )
        }


    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //REQUEST TO SEND THE DATA OVER TO THE SERVER

    // CREATING A SEPERATE FUNCTION FOR POST REQUEST
    async function checkOutPostRequest(url) {


        await fetch(url, {

            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            //  The JSON.stringify() method in JavaScript converts a JavaScript object into a JSON string. This is necessary because HTTP is a text-based protocol, so you can only send text over HTTP. By converting the data object into a JSON string with JSON.stringify(data), you are able to send the data as text over HTTP. On the server side, you would then parse this JSON string back into an object to use it.
            body: JSON.stringify(adcproductObj), // body data type must match "Content-Type" header
        }).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (responseData) {


            if (responseData.url) {

                window.location.href = responseData.url;
                console.log(responseData.url)
                console.log(responseData);
            }
        }).catch(function () {
            const responseString = "Network Error";
            showAlert(responseString);
        })

    }


// using the checkout button to send the request to checkout
    $(".checkOutBtn").on("click", function (e) {
        checkOutPostRequest("https://fyp-universtiy-production-4f96.up.railway.app/UserData/Stripe/Authenticate");
    })


//creating the empty cart button functionality
// this is first removing the data from the local storage then it is removing the data from the cart itself
    $(".EmptyCartBtn").on("click", function (e) {
        sessionStorage.clear();
        while (ADCSection.firstChild) {
            ADCSection.removeChild(ADCSection.firstChild);
        }
    })

// PWA CAHCHING


    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js', {scope: './'})
                .then(function (registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function (err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }








    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    // this is the reset password form functionality when it is validated it sends a post request to the database



    $(".resetForm").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6  // You can set the minimum length for the password
            },
            repeatPassword: {
                required: true,
                minlength:6,
                equalTo: "[name='password']"  // This ensures the repeat password is the same as the password
            }
        },
        messages: {
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please enter your password",
                minlength: "Your password must be at least 6 characters Long"
            },
            repeatPassword:{
                required: "Please enter your password",
                minlength: "Your password must be at least 6 characters Long",
                equalTo: "The password does not match"
            }
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            // Place error message below the input field
            error.addClass("invalid-feedback");
            element.closest(".input-group").append(error);
        },
        highlight: function (element, errorClass, validClass) {
            // Add is-invalid class to the input field on validation error
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element, errorClass, validClass) {
            // Remove is-invalid class from the input field on validation success
            $(element).removeClass("is-invalid");
        }
    });


    $(".resetForm").on("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // Check if the form is valid
        // The $("form") selector in jQuery selects all the <form> elements in the HTML of the currently loaded webpage. that is why we didnt use a .for selecting a class name

        if ($(".resetForm").valid()) {
            // If the form is valid
            const userEmail = $("input[name='email']").val();
            const userPassword = $("input[name='password']").val();

            // Add your AJAX request here if you want to submit the form data to the server

            passwordResetRequest(`https://fyp-universtiy-production-4f96.up.railway.app/UserData/resetPassword`);
            // passwordResetRequest(`http://localhost:8080/UserData/resetPassword`);


            // Prevent form submission so the page doesn't reload
            return false;
        } else if ($("form")) {
            // If the form is not valid

            // Show a toast notification for unsuccessful submission
            console.log('Form submission failed. Please check your inputs.');

            // Prevent form submission so the page doesn't reload
            return false;
        }
    });

    ///////////////////////////////////////////////////////////////////////////



  async function passwordResetRequest(url) {
      let userInfo = {
          "email": $("input[name='email']").val(),// it will look for the current loaded html page for the elements
          "password": $("input[name='password']").val()
      }

      await fetch(url, {method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
          'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //  The JSON.stringify() method in JavaScript converts a JavaScript object into a JSON string. This is necessary because HTTP is a text-based protocol, so you can only send text over HTTP. By converting the data object into a JSON string with JSON.stringify(data), you are able to send the data as text over HTTP. On the server side, you would then parse this JSON string back into an object to use it.
      body: JSON.stringify(userInfo), // body data type must match "Content-Type" header)}
  }).then(function(response){
      console.log(response);
      return response.text();
      }).then(function(responseData){
          if(responseData.includes("successfully")){
              const responseString = "password reset successfully";
              showAlert(responseString);
          }
          else if(responseData.includes("exist")){
              const responseString = "The email does not exist in the database";
              showAlert(responseString);
          }
          else {
            const responseString =   "Network error";
          showAlert(responseString);
          }
      })
  //     TODO: write the return data after the completing of the request on the backend

  }


})//FIXME: the end of dom content loaded dont write below it




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
        "additionalInformation": "Dimensions: 80\" x 40\" x 30\"\nMaterial: High-quality fabric\nAssembly required: Yes",
        "priceId": "price_1P2XMU03YcH2K12qvjlrlBnI"
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
        , "priceId": "price_1P2XTF03YcH2K12q0F1ZDpR7"

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
        , "priceId": "price_1P2XV703YcH2K12qpNtZghac"
    },
    {
        "name": "Queen Size Bed",
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
        , "priceId": "price_1P2XWG03YcH2K12qHTxQtkIs"
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
        , "priceId": "price_1P2XXX03YcH2K12qCCeDb7zG"
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
        , "priceId": "price_1P2XYW03YcH2K12qaERV6BHt"
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
        , "priceId": "price_1P2XZX03YcH2K12qeKm6r6Bj"
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
        , "priceId": "price_1P2XaC03YcH2K12qns5PGnsJ"
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
        , "priceId": "price_1P2Xbh03YcH2K12q0YFAsnJX"
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
        , "priceId": "price_1P2XcW03YcH2K12qmuBeCOre"
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
        , "priceId": "price_1P2XdX03YcH2K12qDFzXtW5n"
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
        , "priceId": "price_1P2Xg503YcH2K12qsUb6MLr9"
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
        , "priceId": "price_1P2Xkq03YcH2K12qxAfC4dzP"
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
        , "priceId": "price_1P2XlX03YcH2K12q78Yv7Qc4"
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
        , "priceId": "price_1P2XmB03YcH2K12qenNzgxzF"
    }
]


















// MOVED THE FUNCTIONS OUTSIDE THE DOMCONTENTLOADED BECAUES OF THE SCOPE ISSUE WHEN CALLING INSIDE A DIFFERENT DOMCONTENTLOAEDED AND NO ONE DOMECONTENTEVENTLISTENER CANNOT BE PUT INSIDE ANTOHER ONE

//     function to show the details of the orders in the admin dashboard
function showDataOfOrders() {

    const responseJson = JSON.parse(sessionStorage.getItem("responseJson"));
    console.log(responseJson);
    console.log("the functions inside this event handler is runnign ")


}


//function to show the data recieved about the orders fron the server in the admin panel
function showDataInAdminPanel() {
    const responseJson = JSON.parse(sessionStorage.getItem("responseJson"));
    const tableElement = document.querySelector(".tableOfOrderData");

    while (tableElement.firstChild) {
        tableElement.removeChild(tableElement.firstChild);
    }
    responseJson.forEach(function (orderPackage) {


        const items = orderPackage.items;

        items.forEach(function (item) {
            const html = `<tr>
                                        <th scope="row">${item.id}</th>
                                        <td>${item.itemName}</td>
                                        <td>${orderPackage.email}</td>
                                        <td>${item.itemQuantity}</td>
                                        <td>${orderPackage.address}</td>
                                    </tr>`
            tableElement.innerHTML += html;
        })
    })
}


document.addEventListener("DOMContentLoaded", function (e) {
    // Check if the current page is AdminDashboard.html
    if (window.location.href.endsWith('AdminDashboard.html')) {
        showDataOfOrders();
        showDataInAdminPanel();
        console.log("this function is running");
    }
});


function btnNameRemove() {
    sessionStorage.removeItem("userName");
    $('.nameSpan').remove();

}


document.addEventListener("DOMContentLoaded", function () {
    // Check if the current page is index.html
    if (window.location.href.endsWith('index.html')) {
        $('.signOutBtn').on('click', function () {
            btnNameRemove();
            // Use a path that works from index.html
            window.location.href = 'FYP%20Project/login.html';
        });
    } else {
        // For all other pages
        $('.signOutBtn').on('click', function () {
            btnNameRemove();
            // Use a path that works from other pages
            window.location.href = 'login.html';
        });
    }
});




document.addEventListener("DOMContentLoaded", function () {
    // Check if the current page is index.html
    if (window.location.href.endsWith('orderPage.html')) {
        const orderPageSection = $(".orderPageSection");

        function showDataOnOrderPage() {
            console.log("the function is running")
            if (orderPageSection.length) {
                orderPageSection.empty();
            }
                console.log("the adc section clear log is working");

                const responseData = JSON.parse(sessionStorage.getItem("responseJson"));

                $.each(responseData, function(index, eachOrder) {

                    console.log(eachOrder.email);
                    console.log(loggedInUserEmail2);


                    if (eachOrder.email == loggedInUserEmail2) {

                        console.log("the condition inside showdataonorderpage is being passed ");

                        $.each(eachOrder.items, function(index, item) {
                            /////////////////////////////////////////////
                            let imagePath;
                            productObj.forEach(function(obj){
                                if(obj.name==item.itemName){
                                   imagePath = obj.image;
                                }
                            })

                            // Add the HTML for each column in the row
                            const html = `
                            <div class=" col-10 mx-auto col-md-2 my-3">
                                <img src="${imagePath}" alt="" class="img-fluid">
                            </div>
                            <div class="col-10 mx-auto col-md-4">
                                <p class="text-uppercase itemName">${item.itemName}</p>
                            </div>
                            <div class="col-10 mx-auto col-md-2">
                                <p class="text-uppercase">${item.id}</p>
                            </div>
                            <div class="col-10 mx-auto col-md-2">
                                 <p class="text-uppercase">${item.itemQuantity}</p>
                            </div>
                             <div class="col-10 mx-auto col-md-2 subTotal">
                                      <p class="text-uppercase">"Out for Delivery"</p>    
                              </div>
`;

                            orderPageSection.append(html);
                        });

                    }
                    else {
                        console.log("the amail does not match");
                    }
                });

        }
        setTimeout(showDataOnOrderPage,1000)

    } else {
        // For all other pages
        console.log("the order page is not opened ")
    }
});

// FIXME:i have to fix the bug in the name of the user by spliting the string  further one step
// FIXME: some products are not added in the productObj add them in the productObj