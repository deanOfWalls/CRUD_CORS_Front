document.addEventListener("DOMContentLoaded", function() {
    setTimeout(checkAppStatus, 5000);
});

function checkAppStatus() {
    fetch('https://crud-cors-back.onrender.com/health-check')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                document.getElementById('loadingSection').style.display = 'none';
                document.getElementById('mainAppSection').style.display = 'block';
                document.getElementById('statsSection').style.display = 'block';

                // Ensure that data has the properties you are looking for before setting them
                if (data.cpu) {
                    document.querySelector("#cpuCount .stat-value").textContent = data.cpu;
                }
                if (data.memory) {
                    document.querySelector("#cpuSpeed .stat-value").textContent = data.memory;
                }
                if (data.uptime) {
                    document.querySelector("#jvmMemory .stat-value").textContent = data.uptime;
                }
            } else {
                console.error('Received data is undefined or not in the expected format.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
}
