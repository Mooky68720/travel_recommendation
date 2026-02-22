const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const inputField = document.getElementById('recInputs');

function searchRecommendations() {
    const input = document.getElementById('recInputs').value.toLowerCase();
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = "";

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            debugger;
            switch(input) {
                case 'beach':
                case 'beaches':
                    {
                        const beaches = data.beaches;
                        for(var i=0; i < beaches.length; i++) {
                            resultDiv.innerHTML += `<div class="reco">`;
                            resultDiv.innerHTML += `<img src="${beaches[i].imageUrl}" class="picture"></img>`;
                            resultDiv.innerHTML += `<h1>${beaches[i].name}</h1>`;
                            resultDiv.innerHTML += `<p>${beaches[i].description}</p>`;
                            resultDiv.innerHTML += `</div>`;
                        }
                    }
                    break;
                case 'temple':
                case 'temples':
                    {
                        const temples = data.temples;
                        for(var i=0; i < temples.length; i++) {
                            resultDiv.innerHTML += `<div class="reco">`;
                            resultDiv.innerHTML += `<img src="${temples[i].imageUrl}" class="picture"></img>`;
                            resultDiv.innerHTML += `<h1>${temples[i].name}</h1>`;
                            resultDiv.innerHTML += `<p>${temples[i].description}</p>`;
                            resultDiv.innerHTML += `</div>`;
                        }
                    }
                    break;
                case 'country':
                case 'countries':
                    {
                        const countries = data.countries;
                        for(var i=0; i < countries.length; i++) {
                            const cities = countries[i].cities;
                            for(var j=0; j < cities.length; j++) {
                                resultDiv.innerHTML += `<div class="reco">`;
                                resultDiv.innerHTML += `<img src="${cities[j].imageUrl}" class="picture"></img>`;
                                resultDiv.innerHTML += `<h1>${cities[j].name}</h1>`;
                                resultDiv.innerHTML += `<p>${cities[j].description}</p>`;
                                resultDiv.innerHTML += `</div>`;
                            }
                        }
                    }
                    break;
                default: return;
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML += 'An error occurred while fetching data.';
        });
        
}
function clear() {
    inputField.value = "";
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = "";
}

btnSearch.addEventListener('click', searchRecommendations);
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchRecommendations();
    }
});
btnClear.addEventListener('click', clear);