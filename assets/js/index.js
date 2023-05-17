// calling data handler function
let url_path = window.location.pathname
urlPath = url_path.replace('/e-commerce','')

if ((urlPath == "/index.html") || (urlPath == "/") ) {
	dataHandler()
} else if (urlPath == "/wishlist.html") {
	loadHtml()
	displayWlItem()
} else if (urlPath == "/search-page.html") {
	filterSearch()
	displaywlCount()
	displayCartCount()
} else if (urlPath == "/product-page.html") {
	displayProduct()
	displaywlCount()
	displayCartCount()
} else if (urlPath == '/add-cart.html') {
    loadHtml()
	displayCartItem()
}



//home page dataHandler function decleration
function dataHandler() {

	//display wishlist count
	displaywlCount()
	displayCartCount()

	//display why buy section
	displayWhybuy()
	tglCategory('btn-grp-whyBuy', displayWhybuy)

	//display featured product section
	displayFeaturedProduct()
	tglCategory('btn-grp-featured-prod', displayFeaturedProduct)

	//display new fashion section
	displayNewfashion()

	//display our blog section
	displayOurBlog()
	tglCategory('btn-grp-blog', displayOurBlog)

	// display most view section
	displayMostView()

	//display people saying section
	displayPeopleSaying()


}



//toggel different category section
function tglCategory(btnId, displayFun) {
	let btnCategory = document.getElementById(btnId)
	let current_active = btnCategory.getElementsByClassName("active")

	let btnClass = btnCategory.children
	let category

	for (let i = 0; i < btnClass.length; i++) {

		btnClass[i].addEventListener('click', function() {
			current_active[0].classList.remove("active");
			this.classList.add("active")
			category = this.innerText.toLowerCase()
			displayFun(category)
		})
	}

}



//Render whybuy section
async function displayWhybuy(category = 'top categories') {
	const whyBuy = document.getElementById('why-buy-container')
	const topCategory = document.getElementById("top-category-carousel")

	if (topCategory)
		whyBuy.removeChild(topCategory)

	let response = await fetch("./assets/data/data.json")
	let data = await response.json();

	let whyBuyHtml = `<div id="top-category-carousel" class="owl-carousel owl-theme top-category">`


	for (i in data[category]) {

		let {
			img,
			name
		} = data[category][i];

		whyBuyHtml += `<div class="item top-category-item">
                    <div class="top-category-img">
                        <img src="${img}">
                    </div>
                    <div class="top-category-btn">
                        <a href="javascript:void(0);" class="btn">${name}</a>
                    </div>
                    </div>`
	}

	whyBuyHtml += `</div>`
	whyBuy.insertAdjacentHTML("beforeend", whyBuyHtml)
	topCategoryCarousel()
}



//render featured product
async function displayFeaturedProduct(category = 'featured') {
	const featuredProduct = document.getElementById('featured-product-container')
	const fpCarousel = document.getElementById('featured-product-carousel')

	let featuredProductHtml = `<div id="featured-product-carousel" class="owl-carousel owl-theme">`

	if (fpCarousel)
		featuredProduct.removeChild(fpCarousel)

	let response = await fetch("./assets/data/product.json")
	let data = await response.json()


	for (i in data.products) {

		if (data.products[i].categories.toLowerCase() == category) {
			let {
				id,
				img,
				company,
				model,
				name,
				price
			} = data.products[i]

			featuredProductHtml += `<div class="item">
                                        <div class="featured-products-card">
                                            <div class="fp-card-img common-tag">
                                                <img src="${img}" alt="headphone">
                                                <div class="card-tag left"><span>CUSTOM LABELS</span></div>
                                                <div class="card-tag right top"><span>-70%</span></div>
                                                <div class="card-tag right bottom"><span>HOT</span></div>
                                            </div>
                                            <div class="fp-seller">
                                                <a href="javascript:void(0);">${company}</a>
                                                <p>${model}</p>
                                            </div>
                                            <div class="fp-details">
                                                <p>${name}</p>
                                                <p>${price} <strike>$3,299.00</strike></p>
                                                <div class="fp-button">
                                                    <div class="fp-add-cart">
                                                        <input type="number" id="quantity" min="1" max="5" value="1">
                                                        <button class="btn" onclick="setAddToCart(${id})">Add to Cart</button>
                                                    </div>
                                                    <div class="fp-wishlist">
                                                        <a id="${id}" class="wl-btn-bg" onclick="setWishList(this)"><i onmouseover="addHeartBg(this)" onmouseout="removeHeartBg(this)" class="fa-regular fa-heart fa-lg"></i></a>
                                                        <a href="javascript:void(0);"><i class="fa-regular fa-arrow-right-arrow-left fa-lg"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fp-buy-now">
                                                <a href="javascript:void(0);"><i class="fa-regular fa-dollar-sign"></i> Buy Now</a>
                                                <a href="javascript:void(0);"><i class="fa-regular fa-circle-question"></i> Question</a>
                                            </div>
                                        </div>
                                    </div>`
		}
	}

	featuredProductHtml += `</div>`

	const fpLastElement = document.getElementById('fp-see-all')

	fpLastElement.insertAdjacentHTML("beforebegin", featuredProductHtml)
	featuredProductCarousel()
}


//render new fashion
async function displayNewfashion(category = 'new fashion') {
	const newFashionWrap = document.getElementById('new-fashion-wrap')
	const nfCarousel = document.getElementById('new-fashion-carousel')

	if (nfCarousel)
		newFashionWrap.removeChild(nfCarousel)

	let response = await fetch("./assets/data/product.json")
	let data = await response.json()

	let newFashionHtml = `<div id="new-fashion-carousel" class="owl-carousel owl-theme">`

	for (i in data.products) {

		if (data.products[i].categories.toLowerCase() == category) {
			let {
				id,
				img,
				name,
				price
			} = data.products[i]
			newFashionHtml += `<div class="item">
                                    <div class="new-fashion-card">
                                        <div class="new-fashion-img">
                                            <div class="common-tag">
                                                <img src="${img}" alt="fashion">
                                                <div class="card-tag left"><span>2-3 DAYS</span></div>
                                                <div class="card-tag right"><span>NEW</span></div>
                                            </div>
                                        </div>
                                        <div class="new-fashion-card-content">
                                            <p>${name}</p>
                                            <p>${price}</p>
                                            <hr>
                                            <div class="new-fashion-btn">
                                                <a href="javascript:void(0);" class="btn" onclick="setAddToCart(${id})">Add to Cart</a>
                                                <div class="new-fashion-wish-compare">
                                                    <a id="${id}" class="wl-btn-bg" onclick="setWishList(this)"><i onmouseover="addHeartBg(this)" onmouseout="removeHeartBg(this)" class="fa-regular fa-heart fa-lg"></i></a>
                                                    <a href="javascript:void(0);"><i class="fa-regular fa-arrow-right-arrow-left fa-lg"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
		}
	}

	newFashionHtml += `</div>`

	newFashionWrap.insertAdjacentHTML("beforeend", newFashionHtml)

	newFashionCarousel()
}


//render our blog
async function displayOurBlog(category = 'latest post') {
	const ourBlog = document.getElementById('our-blog-container')
	const obCarousel = document.getElementById('our-blog-cards')

	if (obCarousel)
		ourBlog.removeChild(obCarousel)

	let response = await fetch("./assets/data/blog.json")
	let data = await response.json()

	let ourBlogHtml = `<div id="our-blog-cards" class="owl-carousel owl-theme">`

	for (i in data.blogs) {

		if (data.blogs[i].categories.toLowerCase() == category) {
			let {
				img,
				date,
				posted,
				comments,
				views,
				title,
				body
			} = data.blogs[i]

			ourBlogHtml += `<div class="item">
                                <div class="blog-card-wrapper">
                                    <div class="blog-card-container">
                                        <div class="blog-card-header">
                                            <img src="${img}" alt="">
                                            <p>${date}</p>
                                            <div class="blog-card-button">
                                                <span><i class="fa-solid fa-user"></i> ${posted}</span>
                                                <span><i class="fa-solid fa-comment-dots"></i> ${comments}</span>
                                                <span><i class="fa-solid fa-eye"></i> ${views}</span>
                                            </div>
                                        </div>
                                        <div class="blog-card-content">
                                            <p>${title}</p>
                                            <p>${body}</p>
                                            <a href="javascript:void(0);">Read More <i class="fa-regular fa-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
		}
	}

	ourBlogHtml += `</div>`

	ourBlog.insertAdjacentHTML("beforeend", ourBlogHtml)
	ourBlogCarousel()
}


// render most view
async function displayMostView(category = 'most view') {
	const mostView = document.getElementById('most-view-container')
	const mvCarousel = document.getElementById('most-view-carousel')

	if (mvCarousel)
		mostView.removeChild(mvCarousel)

	let response = await fetch("./assets/data/product.json")
	let data = await response.json()

	let mostViewHtml = `<div id="most-view-carousel" class="owl-carousel owl-theme">`

	for (i in data.products) {

		if (data.products[i].categories.toLowerCase() == category) {
			let {
				id,
				img,
				name,
				price
			} = data.products[i]

			mostViewHtml += `<div class="item">
                                <div class="most-view-product">
                                    <div class="product-img">
                                        <img src="${img}" alt="">
                                    </div>
                                    <div class="product-detail">
                                        <p>${name}</p>
                                        <p>${price}</p>
                                        <div>
                                            <a onclick="setAddToCart(${id})">
                                                <i class="fa-regular fa-cart-shopping"></i>
                                            </a>
                                            <a id="${id}" class="wl-btn-bg" onclick="setWishList(this)">
                                                <i onmouseover="addHeartBg(this)" onmouseout="removeHeartBg(this)" class="fa-regular fa-heart fa-lg"></i>
                                            </a>
                                            <a>
                                                <i class="fa-solid fa-right-left"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
		}
	}

	mostViewHtml += `</div>`

	mostView.insertAdjacentHTML("beforeend", mostViewHtml)

	mostViewCarousel()
}


//render people saying
async function displayPeopleSaying() {
	const peopleSaying = document.getElementById('feedback-container')
	const psCarousel = document.getElementById('feedback-carousel')

	if (psCarousel)
		peopleSaying.removeChild(psCarousel)

	let response = await fetch("./assets/data/peopleSaying.json")
	let data = await response.json()

	let peopleSayingHtml = `<div id="feedback-carousel" class="owl-carousel owl-theme">`

	for (i in data.reviews) {
		let {
			comment,
			name
		} = data.reviews[i]

		peopleSayingHtml += `<div class="item">
                                <div class="feedback-card">
                                    <div class="feedback-logo">
                                        <img src="./assets/image/quote-left-96.png" alt="">
                                    </div>
                                    <p class="feedback-text">${comment}</p>
                                    <p class="feedback-name">- ${name}</p>
                                </div>
                            </div>`
	}

	peopleSayingHtml += `</div>`

	peopleSaying.insertAdjacentHTML("beforeend", peopleSayingHtml)

	peopleSayingCarousel()

}


// whyBuy carousel function
function topCategoryCarousel() {
	$('#top-category-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 10,
		nav: false,
		responsive: {
			1: {
				items: 1
			},
			700: {
				items: 2
			},
			900: {
				items: 3
			},
			1400: {
				items: 4
			},
			1600: {
				items: 5
			}
		}
	})
}


// featured product Carousel
function featuredProductCarousel() {
	$('#featured-product-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 10,
		nav: false,
		responsive: {
			1: {
				items: 1
			},
			700: {
				items: 2
			},
			1200: {
				items: 3
			},
			1600: {
				items: 4
			}
		}
	})
}

//new fashion carousel
function newFashionCarousel() {
	$('#new-fashion-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 10,
		nav: false,
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			769: {
				items: 1
			},
			900: {
				items: 2
			},
			1200: {
				items: 3
			},
			1600: {
				items: 4
			}
		}
	})
}



//our blog Carousel
function ourBlogCarousel() {
	$('#our-blog-cards').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 10,
		nav: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
}

//most view carousel
function mostViewCarousel() {
	$('#most-view-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 10,
		nav: false,
		responsive: {
			0: {
				items: 2
			},
			945: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	})
}


//people saying carousel
function peopleSayingCarousel() {
	$('#feedback-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 10,
		nav: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
}



/********************************
 ******** Wishlist feature ********
 ********************************/

//load header and footer of wishlist html page
function loadHtml() {

	fetch("./header.html")
		.then(response => {
			return response.text()
		})
		.then(data => {
			document.getElementById("header-part").innerHTML = data;
			displaywlCount()
			displayCartCount()
		});

	fetch("./footer.html")
		.then(response => {
			return response.text()
		})
		.then(data => {
			document.getElementById("footer-part").innerHTML = data;
			mostViewCarousel()
		})
		.then(
			loadJS("./assets/js/login.js")
		)

}



//function for loading js file
function loadJS(FILE_URL, async = true) {
	let scriptEle = document.createElement("script");

	scriptEle.setAttribute("src", FILE_URL);
	scriptEle.setAttribute("type", "text/javascript");
	scriptEle.setAttribute("async", async);

	document.body.appendChild(scriptEle);

	// success event 
	scriptEle.addEventListener("load", () => {
		console.log("File loaded")
	});

	// error event
	scriptEle.addEventListener("error", (ev) => {
		console.log("Error on loading file", ev);
	});
}



//display all item in wishlist
async function displayWlItem() {
	console.log('in displaywlItem')
	const wishlistId = JSON.parse(get_item('wishList'))
    const table = document.getElementById('wishlist-table')
	const tableBody = document.getElementById('wl-table-body')
	let wlItemHtml

	let response = await fetch("./assets/data/product.json")
	let data = await response.json()
	let i

    
    if (wishlistId.length == 0) {
        table.innerHTML = ''
        table.parentElement.innerHTML = 'Your wishlist is empty'
        return
    }


	for (value in wishlistId) {
		i = 0
		while (i < data.products.length) {
			if (data.products[i].id == Number(wishlistId[value])) {

				let {
					img,
					model,
					name,
					price
				} = data.products[i]

				wlItemHtml = `<tr id="tr-${wishlistId[value]}">
                                    <td><img src="${img}" alt="" srcset=""></td>
                                    <td class="item-name">${name}</td>
                                    <td>${model}</td>
                                    <td>${price}</td>
                                    <td>
                                        <button class="wishlist-action"><i class="fa-solid fa-cart-shopping"></i></button>
                                        <button id="${wishlistId[value]}" class="wishlist-action" onclick="removeWLItem (this)"><i class="fa-solid fa-xmark"></i></button>
                                    </td>
                                </tr>`
				break
			} else {
				i++
			}
		}

		tableBody.insertAdjacentHTML("beforeend", wlItemHtml)
	}

}


//display number of item in wishlist
function displaywlCount() {

	const uiWishlist = document.querySelector(".wl-number")

	const wishListCount = JSON.parse(get_item('wishList'))

	if (wishListCount) {

		uiWishlist.innerHTML = wishListCount.length
	} else {

		uiWishlist.innerHTML = 0

	}

}

//add heart icon bg
function addHeartBg(self) {
	self.classList.remove('fa-regular')
	self.classList.add('fa-solid')
	self.style.color = "red"
}


//remove heart icon bg
function removeHeartBg(self) {
	self.classList.remove('fa-solid')
	self.classList.add('fa-regular')
	self.style.color = "var(--primary-grey)"
}


//add to wishlist
function setWishList(self) {
	let wish_list = []

	let db_wishlist = JSON.parse(get_item('wishList'))

	if (db_wishlist)
		wish_list = db_wishlist

	if (wish_list.includes(self.id)) {
		alert("Product already exist in wishlist! ")
	} else {
		wish_list.push(self.id)

		set_item('wishList', wish_list)

		displaywlCount()
	}

}


//remove from wishlist
function removeWLItem(self) {
    const table = document.getElementById('wishlist-table')
	let db_wishlist = JSON.parse(get_item('wishList'))

	db_wishlist = db_wishlist.filter((value) => {
		return value != self.id
	})

	set_item('wishList', db_wishlist)
    displaywlCount()

	const removeHtml = document.getElementById(`tr-${self.id}`)
	removeHtml.remove()

    if (db_wishlist.length == 0) {
        table.innerHTML = ''
        table.parentElement.innerHTML = 'Your wishlist is empty'
        return
    }
}



/********************************
 **** Add to cart function *****
 ********************************/
function setAddToCart(id) {
	let addCart = []

	let db_addcart = JSON.parse(get_item('addCart'))

	if (db_addcart)
		addCart = db_addcart

	if (addCart.includes(id)) {
		alert("Product already exist in addcart! ")
	} else {
		addCart.push(id)

		set_item('addCart', addCart)
	}    

	displayCartCount()
}


// display all the item in cart
async function displayCartItem() {
	console.log('in displayCartItem')
	const cartId = JSON.parse(get_item('addCart'))
    const table = document.getElementById('addcart-table')
	const tableBody = document.getElementById('ac-table-body')
	let acHtml

	let response = await fetch("./assets/data/product.json")
	let data = await response.json()
	let i

    
    if (cartId.length == 0) {
        table.innerHTML = ''
        table.parentElement.innerHTML = 'Your cart is empty'
        return
    }


	for (value in cartId) {
		i = 0
		while (i < data.products.length) {
			if (data.products[i].id == Number(cartId[value])) {

				let {
					img,
					model,
					name,
					price
				} = data.products[i]

				acHtml = `<tr id="tr-${cartId[value]}">
							<td><img src="${img}" alt="" srcset=""></td>
							<td class="item-name">${name}</td>
							<td>${model}</td>
							<td>${price}</td>
							<td>$204.00</td>
							<td>
								<button id="wishlist-cart" class="wishlist-action"><i class="fa fa-refresh"></i></button>
								<input type="number" value="1">
								<button id="${cartId[value]}" class="wishlist-action" onclick="removeCartItem (this)"><i class="fa-solid fa-xmark"></i></button>
							</td>
						  </tr>`
				break
			} else {
				i++
			}
		}

		tableBody.insertAdjacentHTML("beforeend", acHtml)
	}
}


//display number of item in cart
async function displayCartCount() {
    const db_addcart = JSON.parse(get_item('addCart'))
	const cartCount = document.getElementById('cart-count')
	const cartBox = document.querySelector('.ac-number')

    let response = await fetch("./assets/data/product.json")
	let data = await response.json()
    let i
    let itemCount=0
    let itemTotalCost = 0
    
    for (value in db_addcart) {
		i = 0
		while (i < data.products.length) {
			if (data.products[i].id == Number(db_addcart[value])) { 
                itemCount++;
                itemTotalCost += Number(data.products[i].price.replace('$',''))
                i++
                break
            } else {
                i++
            }
        }
    }

    cartCount.innerHTML = `${itemCount} item(s) - $${itemTotalCost}.00`
	cartBox.innerHTML = itemCount
    
}


// remove items from cart
function removeCartItem (self) {
    const table = document.getElementById('addcart-table')
	let db_addcart = JSON.parse(get_item('addCart'))

	db_addcart = db_addcart.filter((value) => {
		return value != self.id
	})

	set_item('addCart', db_addcart)
    displaywlCount()

	const removeHtml = document.getElementById(`tr-${self.id}`)
	removeHtml.remove()

    if (db_addcart.length == 0) {
        table.innerHTML = ''
        table.parentElement.innerHTML = 'Your cart is empty'
        return
    }

	displayCartCount()
}


/********************************
 **** LocalStorage function *****
 ********************************/

// localStorage set item function
function set_item(key, value) {
	value = JSON.stringify(value)
	localStorage.setItem(key, value)
	return true

}


// localStorage get item function
function get_item(key) {
	let key_value = localStorage.getItem(key)
	return key_value
}



/********************************
 **** Product search feature *****
 ********************************/
const searchBtn =  document.getElementById('search-id')
const searchInput = document.querySelector('.form-control')
searchBtn.style.pointerEvents = 'none'


searchInput.addEventListener("input", ()=>{
	searchBtn.style.pointerEvents = 'auto'
})

searchInput.addEventListener('keypress', (event) => {
	if (event.key === "Enter") {
		searchBtn.click()
	}
})


searchBtn.addEventListener('click', () => {
	window.location.href = './search-page.html'+'?'+'product='+searchInput.value
})


async function filterSearch() {
	console.log('in filter search')
	const searchedCard = document.getElementById('searched-card-div-id')

	let response = await fetch("./assets/data/product.json")
	let data = await response.json()

	const url_params = new URLSearchParams(window.location.search)
	const product = url_params.get('product')

	let searchedCardHtml
	let productCount = 0

	if (product == '' ) {
		searchedCard.innerHTML = 'no results found'
		return
	}

	for (i in data.products) {
		if (data.products[i].name.toLowerCase().match(product)) {

			productCount++

			let {
				id,
				img,
				company,
				model,
				name,
				price,
				description
			} = data.products[i]

			searchedCardHtml = `<div class="common-search searched-card-grid">
									<div class="search-card-img common-tag" onclick="window.location.href = './product-page.html'+'?'+'product-id=${id}'">
										<img src="${img}" alt="headphone">
										<div class="card-tag right top"><span>-70%</span></div>
										<div class="card-tag right bottom"><span>HOT</span></div>
									</div>

									<div class="search-card-bottom">
										<div class="search-seller">
											<a href="#">${company}</a>
											<p>${model}</p>
										</div>
										<div class="search-details">
											<p class="search-card-title">${name}</p>
											<p class="search-price">${price} <strike>$3,299.00</strike></p>
											<div class="search-button">
												<div class="search-add-cart">
													<input type="number" id="quantity" min="1" max="5" value="1">
													<button class="btn" onclick="setAddToCart(${id})">Add to Cart</button>
												</div>
												<div class="search-wishlist">
													<a id="${id}" onclick="setWishList(this)"><i class="fa-regular fa-heart fa-lg"></i></a>
													<a href="#"><i class="fa-regular fa-arrow-right-arrow-left fa-lg"></i></a>
												</div>
											</div>
										</div>
										<div class="search-buy-now">
											<a href="#"><i class="fa-regular fa-dollar-sign"></i> Buy Now</a>
											<a href="#"><i class="fa-regular fa-circle-question"></i> Question</a>
										</div>
									</div>

									<!-- search-card list view bottom -->
									<div class="search-card-bottom-list">
										<p class="top-title"><span>Brand: <a href="#">${company}</a></span> <span>Model: ${model}</span></p>
										<p class="search-card-title">${name}</p>
										<p class="search-desc">${description}</p>
										<div class="search-price-container">
											<p class="search-price"><span style="color:orange;">${price}</span> <strike>78.46$</strike></p>
											<p>Ex Tax:70.61 $</p>
										</div>
										<div class="search-button-list">
											<input type="number" id="quantity" min="1" max="5" value="1">
											<button onclick="setAddToCart(${id})"><i class="fa-solid fa-cart-shopping"></i> ADD TO CART</button>
											<div onclick="setWishList(this)" id="${id}"><i class="fa-regular fa-heart"></i></div>
											<div><i class="fa-solid fa-right-left"></i></div>
										</div>
										<div class="search-buy-now">
											<a href="#"><i class="fa-regular fa-dollar-sign"></i> Buy Now</a>
											<a href="#"><i class="fa-regular fa-circle-question"></i> Question</a>
										</div>
									</div>
								</div>`
			searchedCard.insertAdjacentHTML("beforeend",searchedCardHtml)
		}
	}

	if (productCount == 0 ) {
		searchedCard.innerHTML = 'no results found'
	}
}

/** Product search feature end here **/

/********************************
 **** Product page feature *****
 ********************************/
async function displayProduct() {
	const prdt_multi_img = document.querySelectorAll('.left-img-grp')
	const prdt_img = document.querySelectorAll('.prdt-img')
	const descp_html = document.querySelector('.descp-text')
	const price_html =document.querySelector('.discount-price')
	const prdt_name_html = document.querySelectorAll('.prdt-name')

	let response = await fetch("./assets/data/product.json")
	let data = await response.json()

	const url_params = new URLSearchParams(window.location.search)
	const product_id = url_params.get('product-id')

	for (i in data.products) {
		if (data.products[i].id == product_id) {
			const {img, price, name, company, description} = data.products[i]

			prdt_multi_img.forEach(element => element.src=img)
			prdt_img.forEach(element => element.src=img)
			descp_html.innerHTML = description
			price_html.innerHTML = price
			prdt_name_html.forEach(element => element.innerHTML = name)
		}
	}
}