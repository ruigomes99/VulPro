const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    fetchData();
});

function fetchData() {
    // Get Data
    const data = {};
    data['username'] = document.getElementById('username').value.trim();
    data['password'] = document.getElementById('password').value.trim();
    //data['_csrf'] = document.getElementById('_csrf').value.trim();

    // Fetch Headers
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("CSRF-Token", document.getElementById('_csrf').value.trim());

    // Fetch requestOptions
    const requestOptions = {
        credentials: 'same-origin', // <-- includes cookies in the request
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    // Fetch
    fetch(`${location.origin}/sec/login`, requestOptions)
        .then(response => response.json())
        .then(data => {
            // case: error
            if (data.status >= 400 && data.status < 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Incorrect Password',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#DC3545',
                });
                return;
            }
            // case: success
            if (data.status >= 200 && data.status < 300) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login with success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#28A745',
                });
                return;
            }
            // case: unexpected response
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Incorrect Password',
                confirmButtonText: 'OK',
                confirmButtonColor: '#DC3545',
            });
            return;
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Incorrect Password',
                confirmButtonText: 'OK',
                confirmButtonColor: '#DC3545',
            });
            return;
        });
};