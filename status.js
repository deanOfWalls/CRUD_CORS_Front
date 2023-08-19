document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        checkAppStatus();
    }, 5000);
});

function checkAppStatus() {
    fetch('https://crud-cors-back.onrender.com/health-check')
        .then(response => {
            // Check if the content type is JSON
            if (response.headers.get('Content-Type').includes('application/json')) {
                return response.json();
            } else {
                // Log the raw response for further inspection
                return response.text().then(text => {
                    console.log("Raw Response:", text);
                    throw new Error('Received non-JSON response');
                });
            }
        })
        .then(data => {
            document.getElementById('loadingSection').style.display = 'none';
            document.getElementById('mainAppSection').style.display = 'block';
            document.getElementById('statsSection').style.display = 'block';

            document.querySelector("#cpuCount .stat-value").textContent = data.cpu;
            document.querySelector("#cpuSpeed .stat-value").textContent = data.memory;
            document.querySelector("#jvmMemory .stat-value").textContent = data.uptime;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
}
