function checkAppStatus() {
    fetch('https://crud-cors-back.onrender.com/health-check')
        .then(response => {
            if (response.status === 200) {
                return response.text();
            }
            throw new Error('Not up yet');
        })
        .then(status => {
            if (status === 'UP') {
                // Introduce a 5-second delay before switching views
                setTimeout(() => {
                    document.getElementById('loadingSection').style.display = 'none';
                    document.getElementById('mainAppSection').style.display = 'block';
                }, 5000);
            } else {
                setTimeout(checkAppStatus, 5000);
            }
        })
        .catch(error => {
            setTimeout(checkAppStatus, 5000);
        });
}

checkAppStatus();
