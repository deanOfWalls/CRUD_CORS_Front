document.addEventListener("DOMContentLoaded", () => {
    // Initially displays the loading section and hides the form and stats
    document.getElementById('loadingSection').style.display = 'block';
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('statsSection').style.display = 'none';

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
            document.getElementById('loadingSection').style.display = 'none';  // Hide the loading section
            document.getElementById('statsSection').style.display = 'block';  // Display the stats section
            document.querySelector('.form-container').style.display = 'block'; // Display the form
            
            const statsElements = document.querySelectorAll('.stat-value');
            const stats = JSON.parse(status);

            statsElements[0].textContent = stats.cpu;
            statsElements[1].textContent = stats.memory;
            statsElements[2].textContent = stats.uptime;
        })
        .catch(error => {
            console.log(error);
            // If there's an error, you can choose to keep the loading screen 
            // or inform the user to try again.
        });
}
