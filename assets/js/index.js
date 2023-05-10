// calling data handler function
dataHandler()


//dataHandler function decleration
function dataHandler () {
    
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

    for (let i=0; i<btnClass.length; i++) {
        
        btnClass[i].addEventListener('click', function () {
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

        let { img, name } = data[category][i];

        whyBuyHtml += `<div class="item top-category-item">
                    <div class="top-category-img">
                        <img src="${img}">
                    </div>
                    <div class="top-category-btn">
                        <a href="#" class="btn">${name}</a>
                    </div>
                    </div>`
    }

    whyBuyHtml += `</div>`
    whyBuy.insertAdjacentHTML("beforeend",whyBuyHtml)
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
            let {img, company, model, name, price} = data.products[i]

            featuredProductHtml += `<div class="item">
                                        <div class="featured-products-card">
                                            <div class="fp-card-img common-tag">
                                                <img src="${img}" alt="headphone">
                                                <div class="card-tag left"><span>CUSTOM LABELS</span></div>
                                                <div class="card-tag right top"><span>-70%</span></div>
                                                <div class="card-tag right bottom"><span>HOT</span></div>
                                            </div>
                                            <div class="fp-seller">
                                                <a href="#">${company}</a>
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
                                                        <a href="#"><i class="fa-regular fa-heart fa-lg"></i></a>
                                                        <a href="#"><i class="fa-regular fa-arrow-right-arrow-left fa-lg"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fp-buy-now">
                                                <a href="#"><i class="fa-regular fa-dollar-sign"></i> Buy Now</a>
                                                <a href="#"><i class="fa-regular fa-circle-question"></i> Question</a>
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

    if(nfCarousel)
        newFashionWrap.removeChild(nfCarousel)

    let response = await fetch("./assets/data/product.json")
    let data = await response.json()

    let newFashionHtml = `<div id="new-fashion-carousel" class="owl-carousel owl-theme">`

    for (i in data.products) {

        if (data.products[i].categories.toLowerCase() == category) {
            let {img, name, price} = data.products[i]
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
                                                <a href="#" class="btn">Add to Cart</a>
                                                <div class="new-fashion-wish-compare">
                                                    <a href="#"><i class="fa-regular fa-heart fa-lg"></i></a>
                                                    <a href="#"><i class="fa-regular fa-arrow-right-arrow-left fa-lg"></i></a>
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

    if(obCarousel)
        ourBlog.removeChild(obCarousel)

    let response = await fetch("./assets/data/blog.json")
    let data = await response.json()

    let ourBlogHtml = `<div id="our-blog-cards" class="owl-carousel owl-theme">`

    for (i in data.blogs) {

        if (data.blogs[i].categories.toLowerCase() == category) {
            let {img, date, posted, comments, views, title, body} = data.blogs[i]

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
                                            <a href="#">Read More <i class="fa-regular fa-arrow-right"></i></a>
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
            let {img, name, price} = data.products[i]

            mostViewHtml += `<div class="item">
                                <div class="most-view-product">
                                    <div class="product-img">
                                        <img src="${img}" alt="">
                                    </div>
                                    <div class="product-detail">
                                        <p>${name}</p>
                                        <p>${price}</p>
                                        <div>
                                            <i class="fa-regular fa-cart-shopping"></i>
                                            <i class="fa-regular fa-heart"></i>
                                            <i class="fa-solid fa-right-left"></i>
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
        let {comment, name} = data.reviews[i]

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
        autoplay:true,
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
        autoplay:true,
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
        autoplay:true,
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
        autoplay:true,
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
        autoplay:true,
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
        autoplay:true,
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
