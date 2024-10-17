function register(name, email, password) {
    console.log('Register function called');
    axios.post('/api/auth.php', {
        action: 'register',
        username: email,
        password: password
    })
        .then(response => {
            console.log('Response:', response.data);
            if (response.data.message) {
                alert(response.data.message);
            } else if (response.data.error) {
                alert(response.data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred: ' + error);
        });
}

function login(email, password) {
    console.log('Login function called');
    axios.post('../api/auth.php', {
        action: 'login',
        username: email,
        password: password
    })
        .then(response => {
            console.log('Response:', response.data);
            if (response.data.message) {
                alert(response.data.message);
                localStorage.setItem('token', response.data.token);
                updateUIForLoggedInUser();
            } else if (response.data.error) {
                alert(response.data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred: ' + error);
        });
}