//soundboard artist page

let searchBar = document.querySelector(".search-bar")

let boxOne = document.querySelector(".boxOne")
let boxTwo = document.querySelector('.boxTwo')

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
    // recordLabel.innerHTML = data.artists[0].strLabel
    musicGenre.innerHTML = data.artists[0].strGenre
    mood.innerHTML = data.artists[0].strMood
    artistBio.innerHTML = data.artists[0].strBiographyEN
    //Social Meddia
    web.innerHTML = data.artists[0].strWebsite
    fb.innerHTML = data.artists[0].strFacebook
    twitter.innerHTML = data.artists[0].strTwitter

    //API is often missing Label information, text reads not available if label name is not provided. 

    if (data.artists[0].strLabel === null) {
        recordLabel.innerHTML = 'Not Available'
    } else {
        recordLabel.innerHTML = data.artists[0].strLabel
    }
}

//Find data on an artist
const goFind = (inputText) => {
    let quickViewContainer = document.querySelector(".quickView")
    quickViewContainer.style.visibility = "visible"

    axios.get(`https://theaudiodb.com/api/v1/json/1/search.php?s=${inputText}`)
        .then(response => {
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
    if (aYear > bYear) {
        comparison = 1
    } else if (aYear < bYear) {
        comparison = -1
    }
    return comparison
}

//Get discography from selected artist
const getAlbums = async (inputText) => {
    try {
        const response = await axios.get(`https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=${inputText}`)
        let discogs = response.data.album

        //Sort albums chronologically
        discogs.sort((a, b) => {
            return a.intYearReleased - b.intYearReleased
        })
        discogs.sort(compareAlbums)
        populateAlbums(discogs)
    } catch (error) {
        console.log(error)
    }
}

//Display returned album art
const populateAlbums = (discogs) => {
    //clear container each time to prevent overlap
    boxTwo.innerHTML = ""
    let hiddenFooter = document.querySelector(".footerSocial")
    hiddenFooter.style.visibility = "visible"

    //Creates Discography section title & album art images
    let discogTitle = document.createElement('p')
    discogTitle.classList.add("discogTitle")
    discogTitle.innerText = "Discography"
    let coverDiv = document.createElement('div')
    coverDiv.classList.add("coverDiv")
    boxTwo.appendChild(discogTitle)
    boxTwo.appendChild(coverDiv)

    //Creates an image for every album in discogs
    for (let i = 0; i < discogs.length; i++) {
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
    //Make every album art div clickable, and pass selected album through the getOneAlbum function
    document.querySelectorAll('.pic').forEach(pic => pic.addEventListener('click', event => {
        let selectAlbum = event.target.id
        getOneAlbum(selectAlbum)
    }))
}

// SINGLE ALBUM DISPLAY
const getOneAlbum = async (selectAlbum) => {
    try {
        const response = await axios.get(`https://theaudiodb.com/api/v1/json/1/searchalbum.php?a=${selectAlbum}`)
        let oneAlbum = response.data.album[0]
        //To get the album's tracklist, we need to use a different endpoint
        let albumID = response.data.album[0].idAlbum
        populateSingleAlbum(oneAlbum)
        // GET THE TRACKLIST
        getAlbumTracks(albumID)
    } catch (error) {
        console.log(error)
    }
}

const populateSingleAlbum = (oneAlbum) => {
    //Clear boxTwo of full discography to free space for single album view.
    boxTwo.innerHTML = ""

    //Back button
    let backButton = document.createElement('h3')

    //Create container for information on one album
    let singleAlbumDisplay = document.createElement('div')
    singleAlbumDisplay.classList.add("singleAlbumDisplay")
    singleAlbumDisplay.style.visibility = "visible"

    //Album information

    //Title + Art
    let albumName = document.createElement('h3')
    let singleAlbumArt = document.createElement('img')
    let yearReleased = document.createElement('p')
    let theLabel = document.createElement('p')
    let albumDescription = document.createElement('p')
    let trackSectionTitle = document.createElement('p')

    albumName.classList.add("aGroup")
    yearReleased.classList.add("aGroup")
    theLabel.classList.add("aGroup")
    backButton.classList.add("aGroup")
    trackSectionTitle.classList.add("aGroup")

    backButton.id = "backButton"
    albumName.id = "albumTitle"
    singleAlbumArt.id = "topPhoto"
    yearReleased.id = "yearReleased"
    theLabel.id = "theLabel"
    albumDescription.id = "summary"
    trackSectionTitle.id = "trackSectionTitle"

    albumName.innerText = oneAlbum.strAlbum
    singleAlbumArt.src = oneAlbum.strAlbumThumb
    yearReleased.innerText = oneAlbum.intYearReleased
    theLabel.innerText = oneAlbum.strLabel

    //If album description is missing, leave that section blank.
    if (oneAlbum.strDescription === null) {
        albumDescription.innerText = ""
    } else {
        albumDescription.innerText = oneAlbum.strDescriptionEN
    }

    trackSectionTitle.innerText = "Tracklist"
    backButton.innerText = "BACK"

    singleAlbumDisplay.appendChild(backButton)
    singleAlbumDisplay.appendChild(albumName)
    singleAlbumDisplay.appendChild(singleAlbumArt)
    singleAlbumDisplay.appendChild(yearReleased)
    singleAlbumDisplay.appendChild(theLabel)
    singleAlbumDisplay.appendChild(albumDescription)
    singleAlbumDisplay.appendChild(trackSectionTitle)
    boxTwo.appendChild(singleAlbumDisplay)

    //BACK BUTTON EVENT LISTENER
    backButton.addEventListener('click', function (event) {
        let theWayBack = oneAlbum.strArtist
        goFind(theWayBack)
        getAlbums(theWayBack)
    })
}


const getAlbumTracks = async (albumID) => {
    try {
        //This will make a search by the idAlbum returned in the getOneAlbum function.
        const response = await axios.get(`https://theaudiodb.com/api/v1/json/1/track.php?m=${albumID}`)
        let trackList = response.data.track
        //Created an Ordered List
        let theTracks = document.createElement('ol')
        theTracks.classList.add("theTracks")
        //Creates a list item for every track in the array.
        for (let i = 0; i < trackList.length; i++) {
            let aTrack = document.createElement('li')
            aTrack.classList.add("trackGroup")
            aTrack.innerText = trackList[i].strTrack
            theTracks.appendChild(aTrack)
        }
        boxTwo.appendChild(theTracks)
    } catch (error) {
        console.log(error)
    }
}

//Listen for enter key on search bar--> find the artist and get their albums
searchBar.addEventListener('keydown', function (searchEvent) {
    if (searchEvent.keyCode == 13) {
        searchEvent.preventDefault()
        let inputText = searchEvent.target.value
        goFind(inputText)
        getAlbums(inputText)
    }
})
