function login() {
    let user = document.getElementById("Username").value.trim();
    let pass = document.getElementById("password").value;

    if (user.length == 0 || pass.length == 0) {
        alert("Please enter both username and password");
    } else if (localStorage.getItem(user)) {
       
        let userDetails = JSON.parse(localStorage.getItem(user));

        if (pass == userDetails.password) {
            
            localStorage.setItem("currentUser", user); 
            window.location = "main.html";
        } else {
            
            alert("Wrong password");
        }
    } else {
        
        alert("Can't find this account. Please Sign up");
    }
}
