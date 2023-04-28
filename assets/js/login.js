/********************************
 ******** window on load ********
 ********************************/
 window.onload = function() {
	const url_path = window.location.pathname

	if (url_path === '/e-commerce/login.html') {
		signUpInPage()

		const login_btn = document.getElementById('login-btn')
		login_btn.addEventListener('click', loginFun)

		const register_btn = document.getElementById('register-btn');
		register_btn.addEventListener('click', registerFun)

	} else {
		tglLiReIndexPage()

		let login_status = get_item('login-status')

		if (login_status === 'true') {
			displayUserName()

			const logout = document.getElementById("register")
			logout.addEventListener('click', logoutFun)
		}
	}
}



// toggel login and register on index page function
function tglLiReIndexPage() {
	const login = document.getElementById('login')
	const register = document.getElementById('register')

	login.addEventListener('click', () => {
		window.location.href = './login.html' + '?' + 'operation=login'
	})

	register.addEventListener('click', () => {
		window.location.href = './login.html' + '?' + 'operation=register'
	})
}



// toggel signin and signup on login page function
function signUpInPage() {
	const sign_up = document.getElementById('login-sign_up')
	const sign_in = document.getElementById('register-sign_in')

	sign_in.addEventListener('click', () => {
		window.location.href = './login.html' + '?' + 'operation=login'
	})

	sign_up.addEventListener('click', () => {
		window.location.href = './login.html' + '?' + 'operation=register'
	})

	const url_params = new URLSearchParams(window.location.search)
	const operation = url_params.get('operation')

	const login_main = document.getElementById("login-main")
	const register_main = document.getElementById("register-main")

	if (operation == 'register') {
		login_main.style.display = 'none'
		register_main.style.display = 'block'
	} else if (operation == 'login') {
		login_main.style.display = 'block'
		register_main.style.display = 'none'
	}

}



/********************************
 ******** Register Function ********
 ********************************/
function registerFun() {
	const user_name = document.getElementById('register-user-name').value
	const email = document.getElementById('register-email').value
	const password = document.getElementById('register-password').value
	const confirm_password = document.getElementById('register-cnf-password').value
    let user_details = JSON.parse(get_item('user'))

	if (user_name === '') {
		alert('user name cannot be empty!')
		return
	} else {
        for (detail in user_details){
            if (user_name === detail){
                alert('user name is already taken. Please input another username')
                return
            }
        }
    }

	const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

	if (!email.match(email_regex)) {
		alert('You have entered an wrong email. Please enter a valid email address ex = "abc@gmail.com"')
		return
	} else {
        for (detail in user_details){
            if (email === user_details[detail].email){
                alert('user is already registered with this email. Please use some other email')
                return
            }
        }
    }

	if (password.length < 6) {
		alert('Password length must be atleast of 6 character')
		return
	}

	if (confirm_password != password) {
		alert('Password and Confirm password does not match')
		return
	}

	let set_bool = set_user(user_name, email, password)
	if (set_bool) {
		alert('registered sucessfully')

		window.location.href = './login.html' + '?' + 'operation=login'
	}
}



// set user function
function set_user(user_name, email, password) {
	let set_status = false
	let login_status = false
	let user = {}
	let new_user = {
		"userName": user_name,
		"email": email,
		"password": password,
		"loginStatus": login_status
	}

	let db_user = get_item('user')

	if (db_user != null) {
		user = JSON.parse(db_user)
	}

	user[user_name] = new_user

	set_status = set_item('user', user)
	return set_status

}



/********************************
 ** Login and Logout Function ***
 ********************************/
function loginFun() {
	const user_name = document.getElementById('login-user-name').value
	const password = document.getElementById('login-password').value
    
    let user_details = JSON.parse(get_item('user'))

    if (user_details === null){
        alert('Please register your account')
        return
    }
	
	let user_detail = user_details[user_name]

	if (!user_detail) {
		alert('Enter correct USER NAME')
		return
	} else if (user_detail.password === password) {
		user_details[user_name].loginStatus = true
		set_item('user', user_details)
		set_item('login-status', true)
		window.location.href = './index.html'
	} else {
		alert('enter correct Password')
	}

}



// log out function
function logoutFun() {

	let user_name

	let user_details = JSON.parse(get_item('user'))

	for (detail in user_details) {
		if (user_details[detail].loginStatus === true) {
			user_name = detail
		}
	}

	user_details[user_name].loginStatus = false
	set_item('user', user_details)

	set_item('login-status', false)
	window.location.href = "./index.html"

}



//display user name function
function displayUserName() {
	console.log('in display user name')
	let user_name

	let user_details = JSON.parse(get_item('user'))

	for (detail in user_details) {
		if (user_details[detail].loginStatus === true) {
			user_name = detail
		}
	}

	const user_text = document.getElementById('login-text')
	const logout_text = document.getElementById('register-text')

	user_text.innerHTML = user_name
	logout_text.innerHTML = 'Logout'

}



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