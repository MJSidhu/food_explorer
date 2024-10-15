function searchRestaurants() {
    const searchQuery = document.getElementById('search').value;

    fetch(`http://localhost:3000/search?search=${searchQuery}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
                return;
            }

            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('result-item');
                div.innerHTML = `<h3>${item.name}</h3><p>Location: ${item.location}</p><p>Type of Food: ${item.type_of_food}</p>`;
                resultsDiv.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Failed to fetch search results.');
        });
}
