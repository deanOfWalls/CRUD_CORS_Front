document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        checkAppStatus();
    }, 5000);
});

function checkAppStatus() {
    fetch('https://crud-cors-back.onrender.com/health-check')
        .then(response => response.json())
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