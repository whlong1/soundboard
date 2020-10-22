//soundboard

let searchBar = document.querySelector(".search-bar")

let boxOne = document.querySelector(".boxOne")
let boxTwo = document.querySelector('.boxTwo')
let singleAlbumDisplay = document.querySelector(".singleAlbumDisplay")

//QUICKVIEW DATA

//Leftside-Artist Details

let profilePicture = document.querySelector("#artistPhoto")
let artistName = document.querySelector("#artistName")
let locationResult = document.querySelector("#location")
let startDate = document.querySelector("#began")
let recordLabel = document.querySelector("#label")
let musicGenre = document.querySelector("#genre")
let mood = document.querySelector("#mood")
let artistBio = document.querySelector("#bioText")

//Rightside-Discography

let albumArtDiv = document.querySelector(".albumBox")

//Bottom-Social Media 

let web = document.querySelector("#web")
let fb = document.querySelector("#fb")
let twitter = document.querySelector("#twitter")

//Assigns data to variables

const quickView = (data) => {
    //default visibility of boxOne in css set as hidden
    boxOne.style.visibility = "visible"
    //Artist Details
    profilePicture.src = data.artists[0].strArtistThumb
    artistName.innerHTML = data.artists[0].strArtist
    locationResult.innerHTML = data.artists[0].strCountry
    startDate.innerHTML = data.artists[0].intFormedYear
    recordLabel.innerHTML = data.artists[0].strLabel
    musicGenre.innerHTML = data.artists[0].strGenre
    mood.innerHTML = data.artists[0].strMood
    artistBio.innerHTML = data.artists[0].strBiographyEN
    //Social Meddia
    web.innerHTML = data.artists[0].strWebsite
    fb.innerHTML = data.artists[0].strFacebook
    twitter.innerHTML = data.artists[0].strTwitter
}

//Find data on an artist

const goFind = (inputText) => {
    axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${inputText}`)
    .then(response =>{
        quickView(response.data)
        return response.data
    })
    .catch(error => console.log('Error:', error))
}

//Compare release dates of albums

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

//Get discography from selected artist

const getAlbums = async (inputText) => {
    try {
        const response = await axios.get(`https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${inputText}`)
        let discogs = response.data.album

        //Sort albums chronologically

        discogs.sort((a, b) => {
            return a.intYearReleased - b.intYearReleased})
        discogs.sort(compareAlbums)

        console.log(discogs)
        populateAlbums (discogs)
    } catch (error) {
        console.log(error)
    }
}

//Display returned album art

const populateAlbums = (discogs) => {
    //clear container each time to prevent overlap
    boxTwo.innerHTML= ""

    //Creates Discography section title & album art images

    let discogTitle = document.createElement('p')
    discogTitle.classList.add("discogTitle")
    discogTitle.innerText = "Discography"
    let coverDiv = document.createElement('div')
    coverDiv.classList.add("coverDiv")
    boxTwo.appendChild(discogTitle)
    boxTwo.appendChild(coverDiv)

    //Creates an image for every album in discogs

    for (let i = 0; i< discogs.length; i++) {
        let coverArt = document.createElement('img')
        coverArt.classList.add("pic")
        coverArt.id = discogs[i].strAlbum

        //Blocks data with no album art (bootlegs etc)

        if (discogs[i].strAlbumThumb === null || discogs[i].strAlbumThumb === "") {
            continue
        } else {
            coverArt.src = discogs[i].strAlbumThumb
        }
        coverDiv.appendChild(coverArt)
    }
}

//Listen for enter key on search bar--> find the artist and get their albums

searchBar.addEventListener('keydown', function(searchEvent) {
    if (searchEvent.keyCode == 13) {
        searchEvent.preventDefault()
        let inputText = searchEvent.target.value
        goFind(inputText)
        getAlbums(inputText)
    }
  })

