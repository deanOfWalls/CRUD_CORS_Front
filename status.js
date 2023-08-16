function checkAppStatus() {
    fetch('/health-check')
        .then(response => {
            if (response.status === 200) {
                return response.text();
            }
            throw new Error('Not up yet');
        })
        .then(status => {
            if (status === 'UP') {
                // Introduce a 1-second delay before switching views
                setTimeout(() => {
                    document.getElementById('loadingSection').style.display = 'none';
                    document.getElementById('mainAppSection').style.display = 'block';
                }, 1000);
            } else {
                setTimeout(checkAppStatus, 5000);
            }
        })
        .catch(error => {
            setTimeout(checkAppStatus, 5000);
        });
}

checkAppStatus();
