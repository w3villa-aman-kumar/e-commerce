// sign-in sign-up toggel
const sign_up = document.getElementById('login-sign_up')
const sign_in = document.getElementById('register-sign_in')

sign_in.addEventListener('click',()=>{
    window.location.href = './login.html'+'?'+'operation=login'
})

sign_up.addEventListener('click',()=>{
    window.location.href = './login.html'+'?'+'operation=register'
})

const url_params = new URLSearchParams(window.location.search)
const operation = url_params.get('operation')

const login_main = document.getElementById("login-main")
const register_main = document.getElementById("register-main")

if(operation == 'register' ){
    login_main.style.display = 'none'
    register_main.style.display = 'block'
} else if(operation == 'login'){
    login_main.style.display = 'block'
    register_main.style.display = 'none'
}


/********************************
 **** Register Functionality ****
 ********************************/

const register_btn = document.getElementById('register-btn');
register_btn.addEventListener('click',register_fun)

// register function
function register_fun(){
    const user_name = document.getElementById('register-user-name').value
    const email = document.getElementById('register-email').value
    const password = document.getElementById('register-password').value
    const confirm_password =document.getElementById('register-cnf-password').value

    if (user_name === ''){
        alert('user name cannot be empty!')
        return
    }

    const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!email.match(email_regex)){
        alert('You have entered an wrong email. Please enter a valid email address ex = "abc@gmail.com"')
        return
    }

    if(password.length < 6){
        alert('Password length must be atleast of 6 character')
        return
    }

    if(confirm_password != password){
        alert('Password and Confirm password does not match')
        return
    }

    
    let set_bool = set_user(user_name,email,password)
    if(set_bool){
        alert('registered sucessfully')

        window.location.href = './login.html'+'?'+'operation=login'
    }
}



/*****************************
 **** Login Functionality ****
 *****************************/

const login_btn = document.getElementById('login-btn')
login_btn.addEventListener('click',login_fun)

// login function
function login_fun(){
    const user_name = document.getElementById('login-user-name').value
    const password = document.getElementById('login-password').value

    user_details = JSON.parse(get_item('user'))
    user_detail = user_details[user_name]


    if(!user_detail){
        alert('Enter correct USER NAME')
        return
    }else if(user_detail.password === password){
        set_item('login-status',true)
        window.location.href = './index.html'+'?'+'user='+user_name
        console.log('login success')
    }


}


// set user function
function set_user(user_name,email,password){
    let set_status =false
    let user = {}
    let obj= {
         "userName": user_name,
         "email": email,
         "password":password
    }

    let db_user = get_item('user')

    if(db_user != null) {
        user =  JSON.parse(db_user)
    }

    user[user_name]=obj
    user = JSON.stringify(user)

    set_status = set_item('user',user)
    return set_status

}


// localStorage set item function
function set_item(key,value){

     localStorage.setItem(key,value)
     return true

}


// localStorage get item function
function get_item(key){
   let key_value = localStorage.getItem(key)
   return key_value
}

