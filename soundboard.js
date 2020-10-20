// https://theaudiodb.com/api/v1/json/1/search.php?s=coldplay

console.log('test')

let searchBar = document.querySelector(".search-bar")



const goFind = (inputText) => {
    console.log('HELLO')
    // axios.get(ARTIST_RESULTS)
    axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${inputText}`)
    // console.log(ARTIST_RESULTS)
    .then(response =>{
        console.log(response)
        console.log(response.data.artists)
        return response.data
    })
    .catch(error => console.log('Error:', error))
}

searchBar.addEventListener('keyup', function(userSearch) {
    if (userSearch.keyCode == 13) {
        //enter key
        let inputText= userSearch.target.value
        goFind(inputText)

    }
  })







