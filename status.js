document.addEventListener("DOMContentLoaded", function() {
    setTimeout(checkAppStatus, 5000);
});

function checkAppStatus() {
    fetch('https://crud-cors-back.onrender.com/health-check')
        .then(response => response.text())  // fetch the response as text first
        .then(text => {
            try {
                return JSON.parse(text); // Try parsing the text to JSON
            } catch (error) {
                console.error('Failed to parse JSON:', text);
                throw new Error('Received non-JSON response');
            }
        })
        .then(data => {
            if(data && data.cpu && data.memory && data.uptime) {
                document.getElementById('loadingSection').style.display = 'none';
                document.getElementById('mainAppSection').style.display = 'block';
                document.getElementById('statsSection').style.display = 'block';

                document.querySelector("#cpuCount .stat-value").textContent = data.cpu;
                document.querySelector("#cpuSpeed .stat-value").textContent = data.memory;
                document.querySelector("#jvmMemory .stat-value").textContent = data.uptime;
            } else {
                throw new Error('Incomplete or missing data fields in response');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
            // If there's an error, we should at least hide the loading screen
            document.getElementById('loadingSection').style.display = 'none';
            document.getElementById('mainAppSection').style.display = 'block';
            document.getElementById('statsSection').style.display = 'none'; // Hide stats if there's an error
        });
}
