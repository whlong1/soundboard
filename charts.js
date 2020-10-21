//itunes album charts

console.log('hello')


const ITUNES_ALBUM_CHARTS= 'https://theaudiodb.com/api/v1/json/523532/trending.php?country=us&type=itunes&format=albums'

let chartBox = document.querySelector('.chartBox')

const getChart = async () => {
    try {
        const response = await axios.get(ITUNES_ALBUM_CHARTS)
        let trending = response.data.trending
        for (let i = 0; i< trending.length; i++) {

            let boxGen = document.createElement('div')
            boxGen.classList.add("frame");

            let albumTitle = document.createElement('h3')
            let artistName = document.createElement('p')
            let albumArt = document.createElement('img')
            albumArt.classList.add("albumBox");

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



window.onload = getChart


