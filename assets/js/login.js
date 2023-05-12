const loginBtn = document.getElementsByClassName('login')
const registerBtn = document.getElementsByClassName('register')
const modal = document.getElementById('modal-section')
const modalClose =document.getElementById('modal-cross')
const loginForm = document.getElementById('login-form-wrap')
const registerForm = document.getElementById('register-form-wrap')
const register = document.getElementById('modalRegister')
const login = document.getElementById('modalLogin')



//display user name and logout
let login_status = get_item('login-status')

if (login_status === 'true') {

	displayUserName()

	const logout = document.getElementsByClassName("register")

	for (i=0; i<logout.length; i++) { 
		logout[i].addEventListener('click', logoutFun)
	}


} else {

	for (i=0; i<registerBtn.length; i++) {
			//register modal open
			registerBtn[i].addEventListener('click', showRegisterModal)


			//login modal open
			loginBtn[i].addEventListener('click', showLoginModal)
	}
		
		
	//login and register click
	register.addEventListener('click', registerFun)
	login.addEventListener('click', loginFun)

}


//modal close click
modalClose.addEventListener('click', () => modal.style.display = 'none')

//show login modal
function showLoginModal() {

	modal.style.display = 'block'

	loginForm.style.display = 'block'
	registerForm.style.display = 'none'
}


//show register modal
function showRegisterModal() {

	modal.style.display = 'block'

	registerForm.style.display = 'block'
	loginForm.style.display = 'none'

}



/********************************
 ******** Register Function ********
 ********************************/
//register function
function registerFun() {
	const userName = document.getElementById('registerUsername').value
	const email = document.getElementById('registerEmail').value
	const password = document.getElementById('registerPassword').value
	const cnfPassword = document.getElementById('registerCnfPassword').value

	let userDetails = JSON.parse(get_item('user'))

	if (userName === '') {
		alert('user name cannot be empty!')
		return
	} else {
        for (detail in userDetails){
            if (userName === detail){
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
        for (detail in userDetails){
            if (email === userDetails[detail].email){
                alert('user is already registered with this email. Please use some other email')
                return
            }
        }
    }

	if (password.length < 6) {
		alert('Password length must be atleast of 6 character')
		return
	}

	if (cnfPassword != password) {
		alert('Password and Confirm password does not match')
		return
	}

	let set_bool = set_user(userName, email, password)
	if (set_bool) {
		alert('registered sucessfully')

		loginForm.style.display = 'block'
		registerForm.style.display = 'none'
	}

}



// set user function
function set_user(userName, email, password) {
	let set_status = false
	let login_status = false
	let user = {}
	let new_user = {
		"userName": userName,
		"email": email,
		"password": password,
		"loginStatus": login_status
	}

	let db_user = get_item('user')

	if (db_user != null) {
		user = JSON.parse(db_user)
	}

	user[email] = new_user

	set_status = set_item('user', user)
	return set_status

}



/********************************
 ** Login and Logout Function ***
 ********************************/
 function loginFun() {
	const email = document.getElementById('loginEmail').value
	const password = document.getElementById('loginPassword').value
    
    let userDetails = JSON.parse(get_item('user'))

    if (userDetails === null){
        alert('Please register your account')
        return
    }
	
	let user_detail = userDetails[email]

	if (!user_detail) {
		alert('Enter correct USER NAME')
		return
	} else if (user_detail.password === password) {
		userDetails[email].loginStatus = true
		set_item('user', userDetails)
		set_item('login-status', true)
		window.location.href = './index.html'
	} else {
		alert('enter correct Password')
	}

}



//display user name function
function displayUserName() {
	console.log('in display user name')
	let userName

	let userDetails = JSON.parse(get_item('user'))

	for (detail in userDetails) {
		if (userDetails[detail].loginStatus === true) {
			userName = userDetails[detail].userName
		}
	}

	const user_text = document.getElementsByClassName('login-text')
	const logout_text = document.getElementsByClassName('register-text')

	for (i = 0; i<user_text.length; i++) {

		user_text[i].innerHTML = userName
		logout_text[i].innerHTML = 'Logout'
	}

}



// log out function
function logoutFun() {

	let userDetails = JSON.parse(get_item('user'))

	for (detail in userDetails) {
		if (userDetails[detail].loginStatus === true) {

			userDetails[detail].loginStatus = false
		}
	}

	set_item('user', userDetails)

	set_item('login-status', false)
	window.location.href = "./index.html"

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