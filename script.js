document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultDiv = document.getElementById("result");

    searchButton.addEventListener("click", () => {
        const word = searchInput.value.trim();

        if (word) {
            fetchDictionaryDefinition(word)
                .then(data => {
                    displayDefinition(data);
                })
                .catch(error => {
                    console.error("Error fetching dictionary definition:", error);
                    resultDiv.textContent = "Error fetching dictionary definition.";
                });
        } else {
            resultDiv.textContent = "Please enter a word.";
        }
    });

    function fetchDictionaryDefinition(word) {
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`;

        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            });
    }

    function displayDefinition(data) {
        const definition = data[0].meanings[0].definitions[0].definition;
        resultDiv.textContent = `Definition: ${definition}`;
    }
});
