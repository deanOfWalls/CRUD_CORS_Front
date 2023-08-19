document.addEventListener("DOMContentLoaded", () => {
    // Initially hides the loading section and displays the form
    document.getElementById('loadingSection').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';

    // Check system stats after 5 seconds
    setTimeout(() => {
        checkAppStatus();
    }, 5000);
});

function checkAppStatus() {
    fetch('https://crud-cors-back.onrender.com/health-check')
        .then(response => {
            if (response.status === 200) {
                return response.text();
            }
            throw new Error('Not up yet');
        })
        .then(status => {
            document.getElementById('statsSection').style.display = 'block'; // Display the stats section
            const statsElements = document.querySelectorAll('.stat-value');
            const stats = JSON.parse(status);

            statsElements[0].textContent = stats.cpu;
            statsElements[1].textContent = stats.memory;
            statsElements[2].textContent = stats.uptime;
        })
        .catch(error => {
            console.log(error);
        });
}
