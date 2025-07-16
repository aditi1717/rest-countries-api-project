const flagImage=document.querySelector('.flag-image');
const countName=document.querySelector('.country-name');
const nativeName=document.querySelector('.native-name');
const population=document.querySelector('.population');
const region=document.querySelector('.region');
const subRegion=document.querySelector('.sub-region');
const capital=document.querySelector('.capital');
const domain=document.querySelector('.domain');
const currencies=document.querySelector('.currencies');
const languages=document.querySelector('.language');
const borderCountries=document.querySelector('.border-countries');
const body=document.querySelector('body');
const darkMode = document.querySelector(".dark-mode");
const backButton=document.querySelector('.back-button');
console.log(backButton);
backButton.addEventListener('click',()=>{
    console.log("clicked");
    history.back();
    
})

const countryName= new URLSearchParams(location.search).get('name');
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((response)=>response.json())
.then(([country])=>{
    // console.log(country);
    flagImage.src=country.flags.svg;
    countName.innerText=country.name.common;
    if(country.name.nativeName){
       nativeName.innerText=Object.values(country.name.nativeName)[0].common;
    }
    else{
         nativeName.innerText=country.name.common;
    }
   population.innerText=`${country.population.toLocaleString('en-IN')}`;
   if(country.region){
     region.innerText=country.region;
   }
   
   if(country.subregion){
     subRegion.innerText=country.subregion;
   }
   if(country.capital){
      capital.innerText=country.capital;
   }
   domain.innerText=(country.tld).join(', ');
   

   if(country.currencies){
    currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(', ');
   }
   if(country.languages){
    languages.innerText=Object.values(country.languages).join(',');
   }
   if(country.borders){
    country.borders.forEach((border)=>{
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res)=>res.json())
        .then(([borderCountry])=>{
            const borderCountryTag=document.createElement('a');
            borderCountryTag.classList.add('button');
            borderCountryTag.href=`country.html?name=${borderCountry.name.common}`;
            borderCountryTag.innerText=borderCountry.name.common;
            borderCountries.append(borderCountryTag);
            
        })
    })
   }
})

darkMode.addEventListener('click',()=>{
	body.classList.toggle('dark');
  console.log(clckdd);
  
})