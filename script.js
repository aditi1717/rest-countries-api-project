const filterbyRegion = document.querySelector(".filter-by-region");
const countriesContainer = document.querySelector(".countries-container");
const body=document.querySelector('body');
const darkMode = document.querySelector(".dark-mode");


let allCountriesData;
fetch(
	"https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"
)
	.then((response) => response.json())
	.then((data) => {
		allCountriesData = data;
		renderCountries(data);
	});
// console.log(data);

filterbyRegion.addEventListener("change", (e) => {
	console.log(e.target.value);
	fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			
			renderCountries(data);
		});
});

function renderCountries(data) {
	document.querySelector(".countries-container").innerHTML = "";
	data.forEach((country) => {
		// console.log(country.region);

		const countryCard = document.createElement("a");
		countryCard.classList.add("country-card");
		countryCard.href = `./country.html?name=${country.name.common}`;

		const cardHtml = `<img src="${country.flags.svg}" alt="">
                   <div class="card-text">
                     <h3 class="card-title">${country.name.common}</h3>
                      <p><b>Population:</b>${country.population.toLocaleString(
												"en-IN"
											)}</p>
                     <p><b>Region:</b>${country.region}</p>
                      <p><b>Capital:</b>${country.capital?.[0]}</p>
                   </div>`;

		countryCard.innerHTML = cardHtml;
		document.querySelector(".countries-container").append(countryCard);
	});
}


document.querySelector(".search-input").addEventListener("input",(e)=>{
	// console.log(allCountriesData);
	
	const filteredCountries=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries);
	// console.log(filteredCountries);

	
})

darkMode.addEventListener('click',()=>{
	body.classList.toggle('dark');
})