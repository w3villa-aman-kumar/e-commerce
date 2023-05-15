// calling data handler function
let urlPath = window.location.pathname
urlPath = urlPath.replace('/e-commerce','')

if ((urlPath == "/index.html") || (urlPath == "/") ) {
	dataHandler()
} else if (urlPath == "/wishlist.html") {
	loadWlHtml()
	displayWlItem()
} else if (urlPath == "/search-page.html") {
	displaywlCount()
} else if (urlPath == "/product-page.html") {
	displaywlCount()
}



//home page dataHandler function decleration
function dataHandler() {

	//display wishlist count
	displaywlCount()

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
                                                        <button class="btn">Add to Cart</button>
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
                                                <a href="javascript:void(0);" class="btn">Add to Cart</a>
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
                                            <a>
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
function loadWlHtml() {

	fetch("./header.html")
		.then(response => {
			return response.text()
		})
		.then(data => {
			document.getElementById("header-part").innerHTML = data;
			displaywlCount()
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