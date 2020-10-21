// https://theaudiodb.com/api/v1/json/1/search.php?s=coldplay

let searchBar = document.querySelector(".search-bar")

//Quickview Data
let profilePicture = document.querySelector("#artistPhoto")
let artistName = document.querySelector("#artistName")
let locationResult = document.querySelector("#location")
let startDate = document.querySelector("#began")
// let endDate = document.querySelector("#end")
let recordLabel = document.querySelector("#label")
let musicGenre = document.querySelector("#genre")
let mood = document.querySelector("#mood")
let artistBio = document.querySelector("#bioText")


let web = document.querySelector("#web")
let fb = document.querySelector("#fb")
let twitter = document.querySelector("#twitter")


const quickView = (data) => {
    profilePicture.src = data.artists[0].strArtistThumb
    artistName.innerHTML = data.artists[0].strArtist
    locationResult.innerHTML = data.artists[0].strCountry
    startDate.innerHTML = data.artists[0].intFormedYear
    // endDate.innerHTML = data.artists[0].intDiedYear
    recordLabel.innerHTML = data.artists[0].strLabel
    musicGenre.innerHTML = data.artists[0].strGenre
    mood.innerHTML = data.artists[0].strMood

    artistBio.innerHTML = data.artists[0].strBiographyEN

    web.innerHTML = data.artists[0].strWebsite
    fb.innerHTML = data.artists[0].strFacebook
    twitter.innerHTML = data.artists[0].strTwitter

}



//toggle class tied to image in quickview
//in css make class hidden
//toggle to not hidden with event handler

//search
//on click expand
//on click width= blank


const goFind = (inputText) => {
    console.log('HELLO')
    axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${inputText}`)
    .then(response =>{
        console.log(response)
        console.log(response.data.artists[0].strCountry)
        quickView(response.data)
        return response.data
    })
    .catch(error => console.log('Error:', error))
}

searchBar.addEventListener('keydown', function(searchEvent) {
    if (searchEvent.keyCode == 13) {
        searchEvent.preventDefault()
        let inputText= searchEvent.target.value
        goFind(inputText)
    }
  })







