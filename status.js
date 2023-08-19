document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('loadingSection').style.display = 'block';
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('statsSection').style.display = 'none';

    setTimeout(() => {
        checkAppStatus();
    }, 5000);
});

function checkAppStatus() {
    fetch('https://crud-cors-back.onrender.com/health-check')
        .then(response => {
            if (response.status === 200) return response.text();
            throw new Error('Not up yet');
        })
        .then(status => {
            document.getElementById('loadingSection').style.display = 'none';
            document.getElementById('statsSection').style.display = 'block';
            document.querySelector('.form-container').style.display = 'block';

            const stats = JSON.parse(status);
            document.querySelector("#cpuCount .stat-value").textContent = stats.cpu;
            document.querySelector("#cpuSpeed .stat-value").textContent = stats.memory;
            document.querySelector("#jvmMemory .stat-value").textContent = stats.uptime;

        }).catch(error => {
            console.log(error);
        });
}