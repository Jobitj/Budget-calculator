function register() {
    let userValue = user.value;
    let mailValue = mail.value;
    let passValue = pass.value;

    if (!userValue || !mailValue || !passValue) {
        alert("Please fill in all fields");
      
    }

   
    if (!mailValue.includes('@gmail.com')) {
        alert("Please enter a valid email address");
      
    }

    let Accdetails = {
        username: userValue,
        mail: mailValue,
        password: passValue,
    };

    console.log(Accdetails);
    if (Accdetails.mail in localStorage) {
        alert("This account already exists");
    } else {
        localStorage.setItem(Accdetails.username, JSON.stringify(Accdetails));
        alert("Account created successfully");
        window.location = "index.html";
    }
}
