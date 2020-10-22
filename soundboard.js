// https://theaudiodb.com/api/v1/json/1/search.php?s=coldplay

let searchBar = document.querySelector(".search-bar")

// let inputText= searchBar.innerHTML

//Quickview Data
let boxOne = document.querySelector(".boxOne")
let profilePicture = document.querySelector("#artistPhoto")
let artistName = document.querySelector("#artistName")
let locationResult = document.querySelector("#location")
let startDate = document.querySelector("#began")
let recordLabel = document.querySelector("#label")
let musicGenre = document.querySelector("#genre")
let mood = document.querySelector("#mood")
let artistBio = document.querySelector("#bioText")

let web = document.querySelector("#web")
let fb = document.querySelector("#fb")
let twitter = document.querySelector("#twitter")

let albumArtDiv = document.querySelector(".albumBox")


const quickView = (data) => {
    boxOne.style.visibility = "visible"
    profilePicture.src = data.artists[0].strArtistThumb
    artistName.innerHTML = data.artists[0].strArtist
    locationResult.innerHTML = data.artists[0].strCountry
    startDate.innerHTML = data.artists[0].intFormedYear
    recordLabel.innerHTML = data.artists[0].strLabel
    musicGenre.innerHTML = data.artists[0].strGenre
    mood.innerHTML = data.artists[0].strMood
    artistBio.innerHTML = data.artists[0].strBiographyEN

    // web.innerHTML = data.artists[0].strWebsite
    // fb.innerHTML = data.artists[0].strFacebook
    // twitter.innerHTML = data.artists[0].strTwitter
}

//toggle class tied to image in quickview
//in css make class hidden
//toggle to not hidden with event handler

//search
//on click expand
//on click width= blank

const goFind = (inputText) => {
    axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${inputText}`)
    .then(response =>{
        quickView(response.data)
        return response.data
    })
    .catch(error => console.log('Error:', error))
}

//======================================================================================

const compareAlbums = (a, b) => {
    const aYear = parseInt(a.intYearReleased)
    const bYear = parseInt(b.intYearReleased)
    let comparison = 0 
    if (aYear > bYear){
        comparison = 1
    } else if (aYear < bYear) {
        comparison = -1
    }
    return comparison
}

const getAlbums = async (inputText) => {

    try {
        const response = await axios.get(`https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${inputText}`)
        let discogs = response.data.album
        // discogs.sort((a, b) => {
        //     return a.intYearReleased - b.intYearReleased})
        // discogs.sort(compareAlbums)
        console.log(discogs)
        populateAlbums (discogs)
    } catch (error) {
        console.log(error)
    }
}

let boxTwo = document.querySelector('.boxTwo')

const populateAlbums = (discogs) => {
    boxTwo.innerHTML= " "
    for (let i = 0; i< discogs.length; i++) {
        let coverArt = document.createElement('img')
        coverArt.classList.add("pic")
        // coverArt.src = discogs[i].strAlbumThumb
        if (discogs[i].strAlbumThumb === null || discogs[i].strAlbumThumb === "") {
            return
        } else {
            coverArt.src = discogs[i].strAlbumThumb
        }
        boxTwo.appendChild(coverArt)
    }
}


searchBar.addEventListener('keydown', function(searchEvent) {
    if (searchEvent.keyCode == 13) {
        searchEvent.preventDefault()
        let inputText = searchEvent.target.value
        goFind(inputText)
        getAlbums(inputText)

    }
  })

