function searchReviews() {
    const searchQuery = document.getElementById('search-reviews').value;

    fetch(`http://localhost:3000/reviews?search=${searchQuery}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById('review-results');
            resultsDiv.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                resultsDiv.innerHTML = '<p>No reviews found.</p>';
                return;
            }

            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('result-item');
                div.innerHTML = `
                    <h3>${item.restaurant_name}</h3>
                    <p>Review: ${item.review}</p>
                    <p>Rating: ${item.rating}/5</p>
                    <p>Submitted on: ${new Date(item.created_at).toLocaleString()}</p>
                `;
                resultsDiv.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Failed to fetch review results.');
        });
}
