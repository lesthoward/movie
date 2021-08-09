const seatContainer = document.querySelector('.movie__bottom');
const selectMovie = document.querySelector('.movie__select')
const totalSeats = document.querySelectorAll('.movie__bottom .movie__seat:not(.movie__seat--occupied)');

let ticketPrice = +selectMovie.value

printUI ()

function setMovieData (movieIndex) {
    localStorage.setItem('movieIndex', movieIndex)
}

function updateSelectedCount () {
    const selectedSeat = document.querySelectorAll('.movie__bottom .movie__seat--selected')
    const selectedSeatCount = selectedSeat.length
    // Buscar el index de las sillas seleccionadas dentro del arreglo de sillas totales.
    
    const seatIndex = [...selectedSeat].map(seat => [...totalSeats].indexOf(seat)) 
    // Guardar en LocalStorage las sillas seleccionadas en base a sus indices
    localStorage.setItem('selectedSeat', JSON.stringify(seatIndex))
    
    const movieCount = document.querySelector('.movie__count');
    const moviePrice = document.querySelector('.movie__price')
    movieCount.innerText = selectedSeatCount
    moviePrice.innerText = selectedSeatCount * ticketPrice
}

function selectSeat (selectedSeat) {
    selectedSeat.classList.toggle('movie__seat--selected')
    updateSelectedCount ()
}


selectMovie.addEventListener('change', (e) => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex)
    updateSelectedCount () 
})

seatContainer.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('movie__seat') &&
        !e.target.classList.contains('movie__seat--occupied')
        ) {
        selectSeat (e.target)
    }
})

function printUI () {
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'))
    // console.log('file: movie-seat-booking.js ~ line 49 ~ printUI ~ selectedSeat', selectedSeat)
    if (selectedSeat !== null || selectedSeat > 0) {
        totalSeats.forEach((seat, index) => {
            if (selectedSeat.indexOf(index) > -1) {
                seat.classList.add('movie__seat--selected')
            }
        })
    }

    const movieIndex = localStorage.getItem('movieIndex')
    if(movieIndex !== null || movieIndex > 0) {
        selectMovie.selectedIndex = movieIndex
    }
}

updateSelectedCount ()