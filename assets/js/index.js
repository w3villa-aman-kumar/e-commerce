let login_status = get_item('login-status')


if(login_status === 'true'){
    displayUserName()
    const logout =document.getElementById("register")
    logout.addEventListener('click',logout_fun)

} else{
    tglLoginRegister()
}


// toggel login and register function
function tglLoginRegister(){
    
    const login = document.getElementById("login")
    const register =document.getElementById("register")

    login.addEventListener('click',()=>{
        window.location.href="./login.html"+"?"+"operation=login"
    })

    register.addEventListener('click',()=>{
        window.location.href="./login.html"+"?"+"operation=register"
    })
}


//display user name function
function displayUserName(){

    const user_name = new URLSearchParams(window.location.search).get('user')
    const user_text = document.getElementById('login-text')
    const logout_text = document.getElementById('register-text')

    user_text.innerHTML = user_name
    logout_text.innerHTML = 'Logout'

}


// log out function
function logout_fun(){

    const login = document.getElementById("login")
    set_item('login-status',false)
    window.location.href="./index.html"

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