// https://theaudiodb.com/api/v1/json/1/search.php?s=coldplay

let searchBar = document.querySelector(".search-bar")

// let inputText= searchBar.innerHTML

//Quickview Data
let boxOne = document.querySelector(".boxOne")
// boxOne.style.visibility = "hidden"

// let displayCase = document.querySelector('.quickView')
// displayCase.style.visibility = "hidden"

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
    // displayCase.style.visibility = "visible"
    profilePicture.src = data.artists[0].strArtistThumb
    artistName.innerHTML = data.artists[0].strArtist
    locationResult.innerHTML = data.artists[0].strCountry
    startDate.innerHTML = data.artists[0].intFormedYear
    recordLabel.innerHTML = data.artists[0].strLabel
    musicGenre.innerHTML = data.artists[0].strGenre
    mood.innerHTML = data.artists[0].strMood
    artistBio.innerHTML = data.artists[0].strBiographyEN

    web.innerHTML = data.artists[0].strWebsite
    fb.innerHTML = data.artists[0].strFacebook
    twitter.innerHTML = data.artists[0].strTwitter
}

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

        discogs.sort((a, b) => {
            return a.intYearReleased - b.intYearReleased})
        discogs.sort(compareAlbums)

        console.log(discogs)
        populateAlbums (discogs)
    } catch (error) {
        console.log(error)
    }
}




let boxTwo = document.querySelector('.boxTwo')

const populateAlbums = (discogs) => {
    boxTwo.innerHTML= ""

    let discogTitle = document.createElement('p')
    discogTitle.classList.add("discogTitle")
    discogTitle.innerText = "Discography"
    let coverDiv = document.createElement('div')
    coverDiv.classList.add("coverDiv")
    boxTwo.appendChild(discogTitle)
    boxTwo.appendChild(coverDiv)

    for (let i = 0; i< discogs.length; i++) {
        let coverArt = document.createElement('img')
        // let discogTitle = document.createElement('h3')
        coverArt.classList.add("pic")
        coverArt.id = discogs[i].idAlbum
        // discogTitle.classList.add("discogTitle")
        // discogTitle.innerText = "Discography"

        // coverArt.src = discogs[i].strAlbumThumb

        if (discogs[i].strAlbumThumb === null || discogs[i].strAlbumThumb === "") {
            continue
        } else {
            coverArt.src = discogs[i].strAlbumThumb
        }
        // coverArt.src = discogs[i].strAlbumThumb
        coverDiv.appendChild(coverArt)
        // boxTwo.appendChild(discogTitle)
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

