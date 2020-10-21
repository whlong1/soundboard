//music charts

console.log('hello')

// console.log(response)
// console.log(response.data.trending[0].strArtist)
// console.log(response.data.trending[0].strAlbum)
// console.log(response.data.trending[0].strAlbumThumb)


const ITUNES_ALBUM_CHARTS= 'https://theaudiodb.com/api/v1/json/523532/trending.php?country=us&type=itunes&format=albums'

let chartBox = document.querySelector('.chartBox')

const getChart = async () => {
    try {
        const response = await axios.get(ITUNES_ALBUM_CHARTS)
        let trending = response.data.trending
        for (let i = 0; i< trending.length; i++) {
            let boxGen = document.createElement('div')
            let albumTitle = document.createElement('h2')
            let artistName = document.createElement('p')
            let albumArt = document.createElement('img')
            albumTitle.innerText = trending[i].strAlbum
            artistName.innerText = trending[i].strArtist
            albumArt.src = trending[i].strAlbumThumb
            
            boxGen.appendChild(albumTitle)
            boxGen.appendChild(albumArt)
            boxGen.appendChild(artistName)
            chartBox.appendChild(boxGen)
            

        }
        console.log(response.data.trending)
    } catch (error) {
        console.log(error)
    }
}


// const makeChart = (data) => {
//     const chartBox = document.querySelector('.chartBox')
//     data.forEach((object) => {
//         console.log(object)
//         // let boxGen = document.createElement('box')
//         // boxGen.innerText = `${stat.strArtist}`
//         // boxGen.setAttribute('artist', stat.artist)
//         // boxThing.appendChild(boxGen)
        
//     })
//     // chartBox.appendChild(boxThing)
// }

// const displayChart = () => {
//     let chartResult

// }


window.onload = getChart


