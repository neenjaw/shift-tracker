/*global axios*/

$(function() {
    var loginForm = document.querySelector('form.login');
    var loginFormSubmitButton = loginForm.querySelector('button');
    var loginFormUsername = loginForm.querySelector('#username');
    var loginFormPassword = loginForm.querySelector('#password');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        loginFormSubmitButton.innerHTML = '<i class="fas fa-transfer"></i> Sending...';     


        axios
            .post('/api/user/login.php', {
                username: loginFormUsername.value,
                password: loginFormPassword.value
            })
            .then(function (response) {
                console.log(response);

                if (response.data.authorized) {

                    loginFormSubmitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
                    loginFormSubmitButton.classList.remove('btn-primary');
                    loginFormSubmitButton.classList.add('btn-success');

                    setTimeout(function() {
                        window.location.href = '/home'; 
                    }, 1000);
                    
                } else {
                    loginFormSubmitButton.innerHTML = 'Log in';                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });
});