//music charts

console.log('hello')

// console.log(response)
// console.log(response.data.trending[0].strArtist)
// console.log(response.data.trending[0].strAlbum)
// console.log(response.data.trending[0].strAlbumThumb)


const ITUNES_ALBUM_CHARTS= 'https://theaudiodb.com/api/v1/json/523532/trending.php?country=us&type=itunes&format=albums'


const getChart = async () => {
    try {
        const response = await axios.get(ITUNES_ALBUM_CHARTS)
        makeChart(response.data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}


const makeChart = (data) => {
    const chartBox = document.querySelector('.chartBox')
    const boxThing = document.createElement('select')
    data.forEach((object) => {
        console.log(object)
        // let boxGen = document.createElement('box')
        // boxGen.innerText = `${stat.strArtist}`
        // boxGen.setAttribute('artist', stat.artist)
        // boxThing.appendChild(boxGen)
        
    })
    // chartBox.appendChild(boxThing)
}


window.onload = getChart


