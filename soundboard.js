// https://theaudiodb.com/api/v1/json/1/search.php?s=coldplay

console.log('test')

let searchBar = document.querySelector(".search-bar")
let artistName = document.querySelector(".artistName")
let locationResult = document.querySelector(".loc")



const quickView = (data) => {
    // console.log(data.artists[0].intFormedYear)
    artistName.innerHTML = data.artists[0].strArtist
    locationResult.innerHTML = data.artists[0].strCountry
}



const goFind = (inputText) => {
    console.log('HELLO')
    // axios.get(ARTIST_RESULTS)
    axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${inputText}`)
    // console.log(ARTIST_RESULTS)
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







