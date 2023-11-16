const moviesList = [
  { movieName: "12th Fail", price: 150.00 ,trailer:"https://www.youtube.com/embed/WeMJo701mvQ?si=kA2ScTbnOumQa7kV",img_src:"https://m.media-amazon.com/images/M/MV5BNDY5YWMzOWEtNTVhZi00NTdmLWIxNGItN2Q5ZmIxNGRkZDYyXkEyXkFqcGdeQXVyMTYzMTU3Njgx._V1_.jpg" },
  { movieName: "Raktabeej", price:  180.00, trailer:"https://www.youtube.com/embed/FSCpybRfsTc?si=uljJ_Ktjjmt2eTHD", img_src:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/raktabeej-et00354857-1694759098.jpg" },
  { movieName: "Dawshom Awbotaar", trailer:"https://www.youtube.com/embed/tMAyqopQrH4?si=wheisI6u_LfSMn7i",price: 130.00, img_src:"https://upload.wikimedia.org/wikipedia/en/6/6e/Dawshom_Awbotaar.jpeg"},
  { movieName: "TIGER 3", trailer:"https://www.youtube.com/embed/vEjTUDjjU6A?si=sefsxjv3UEd_xovR", price: 520.00, img_src:"https://m.media-amazon.com/images/M/MV5BYzQwMGZlYTUtODUwNi00ZjQxLWEzODAtZGU3Zjc0MmNhMzhkXkEyXkFqcGdeQXVyNTkzNDQ4ODc@._V1_FMjpg_UX1000_.jpg"},
  { movieName: "Baghajatin",trailer:"https://www.youtube.com/embed/nBqZ6cdBboQ?si=wZfXNd6Gmo2oN3qt", price: 200.00, img_src:"https://upload.wikimedia.org/wikipedia/en/c/c6/Bagha_Jatin_%282023_film%29_movie_poster.jpeg"},
];

const selectMovieEl = document.getElementById("selectMovie");
const allSeatCont = document.querySelectorAll("#seatCont .seat");
const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");
const moviePriceEl = document.getElementById("moviePrice");
const cancelBtnEl = document.getElementById("cancelBtn");
const proceedBtnEl = document.getElementById("proceedBtn");

moviesList.forEach((movie) => {
  const optionEl = document.createElement("option");
  optionEl.innerHTML = `${movie.movieName} INR ${movie.price}`;
  selectMovieEl.appendChild(optionEl);
});

let moviePrice = 150.00;
let currentMovieName = "12th Fail"; // Default movie name
var source="https://m.media-amazon.com/images/M/MV5BNDY5YWMzOWEtNTVhZi00NTdmLWIxNGItN2Q5ZmIxNGRkZDYyXkEyXkFqcGdeQXVyMTYzMTU3Njgx._V1_.jpg";
var Demo="https://www.youtube.com/embed/WeMJo701mvQ?si=kA2ScTbnOumQa7kV";
let IMG=document.querySelector('.movie_image');
IMG.innerHTML='<img src="'+source+'" width="200px" height="200px">'
let demo_show=document.querySelector('.movie_trailer');
selectMovieEl.addEventListener("change", () => {
  const selectedIndex = selectMovieEl.selectedIndex;
  if (selectedIndex >= 0 && selectedIndex < moviesList.length) {
    const selectedMovie = moviesList[selectedIndex];
    currentMovieName = selectedMovie.movieName;
    source=selectedMovie.img_src;
    Demo=selectedMovie.trailer;
    moviePrice = selectedMovie.price;
    updateMovieInfo(currentMovieName, moviePrice);
    updatePrice(moviePrice, takenSeats.length);
  }
  IMG.innerHTML='<img src="'+source+'" width="200px" height="200px">'
  demo_show.innerHTML=' <iframe class="Trailer" style ="margin:30%; margin-top:6%; margin-left:16%;" width="71%" height="56%;" src="'+Demo+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
});

let initialSeatValue = 0;
allSeatCont.forEach((seat) => {
  const attr = document.createAttribute("data-seatid");
  attr.value = ++initialSeatValue;
  seat.setAttributeNode(attr);
});

let seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
let takenSeats = [];

seatContEl.forEach((seat) => {
  seat.addEventListener("click", (e) => {
    if (!seat.classList.contains("selected")) {
      seat.classList.add("selected");
      takenSeats.push(seat.getAttribute("data-seatid"));
    } else {
      seat.classList.remove("selected");
      takenSeats = takenSeats.filter((seatId) => seatId !== seat.getAttribute("data-seatid"));
    }
    updateSeats();
    updatePrice(moviePrice, takenSeats.length);
  });
});

function updateSeats() {
  selectedSeatsHolderEl.innerHTML = "";
  takenSeats.forEach((seat) => {
    const seatHolder = document.createElement("div");
    seatHolder.classList.add("selectedSeat");
    seatHolder.innerHTML = `Seat ${seat}`;
    selectedSeatsHolderEl.appendChild(seatHolder);
  });

  if (!takenSeats.length) {
    const spanEl = document.createElement("span");
    spanEl.classList.add("noSelected");
    spanEl.innerHTML = "NO SEAT SELECTED";
    selectedSeatsHolderEl.appendChild(spanEl);
  }
  seatCount();
}

function seatCount() {
  const numberOfSeatEl = document.getElementById("numberOfSeat");
  numberOfSeatEl.innerHTML = takenSeats.length;
}

function updateMovieInfo(movieName, price) {
  const movieNameEl = document.getElementById("movieName");
  const moviePriceEl = document.getElementById("moviePrice");
  movieNameEl.innerHTML = movieName;
  moviePriceEl.innerHTML = `INR ${price}`;
}

function updatePrice(price, seats) {
  const totalPriceEl = document.getElementById("totalPrice");
  let total = seats * price;
  totalPriceEl.innerHTML = `INR ${total}`;
}

cancelBtnEl.addEventListener("click", () => {
  cancelSeats();
});


function cancelSeats() {
  takenSeats = [];
  seatContEl.forEach((seat) => {
    seat.classList.remove("selected");
  });
  updatePrice(0, 0);
  updateSeats();
}

var today = new Date();

function getDate(){

document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


}


proceedBtnEl.addEventListener("click", () => {
  var month_name;
  var Dt=document.getElementById("date").value;
 var dt=Dt.slice(8);
 var mnth=Dt.slice(5,7);
 switch(mnth){
   case '01':
    month_name='January';
    break;
    case '02':
    month_name='February';
    break;
    case '03':
    month_name='March';
    break;
    case '04':
    month_name='April';
    break;
    case '05':
    month_name='May';
    break;
    case '06':
    month_name='June';
    break;
    case '07':
    month_name='July';
    break;
    case '08':
    month_name='August';
    break;
    case '09':
    month_name='September';
    break;
    case '10':
    month_name='October';
    break;
    case '11':
    month_name='November';
    break;
    case '12':
    month_name='December';
    break;
 }
 var yr=Dt.slice(0,4);
  if (takenSeats.length) {
    if(dt%10===1&&(dt!='11'&&dt!='12'&&dt!='13')){
    alert(`Yayy! Your Seats have been booked for ${currentMovieName}. Watch it on ${dt}st ${month_name} ${yr}`);
    }
    else if(dt%10===2&&(dt!='11'&&dt!='12'&&dt!='13')){
      alert(`Yayy! Your Seats have been booked for ${currentMovieName}. Watch it on ${dt}nd ${month_name} ${yr}`);
      }
    else if(dt%10===3&&(dt!='11'&&dt!='12'&&dt!='13')){
      alert(`Yayy! Your Seats have been booked for ${currentMovieName}. Watch it on ${dt}rd ${month_name} ${yr}`);
      }
    else {
      alert(`Yayy! Your Seats have been booked for ${currentMovieName}. Watch it on ${dt}th ${month_name} ${yr}`);
      }
    uncancelSeats();
  } else {
    alert("Oops no seat Selected");
  }
});

function uncancelSeats() {
  seatContEl.forEach((seat) => {
    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    }
  });
  takenSeats = [];
  updatePrice(0, 0);
  updateSeats();
}


getDate();
