let carToEdit = {};
let golfs = [];
let modelInput = document.getElementById("model");
let pricelnput = document.getElementById("price");
let powerlnput = document.getElementById("power");
let yearInput = document.getElementById("year");
let milesInput = document.getElementById("miles");
let jokeInput = document.getElementById("joke");
onPageLoad();

function onPageLoad() {
  carToEdit = JSON.parse(localStorage.getItem("carToEdit"));
  carToEdit = carToEdit[0];
  // fetch the list
  golfs = JSON.parse(localStorage.getItem("vw"));
  renderDataToUI();
}

function renderDataToUI() {
  // put the values in the proper fields
  modelInput.value = carToEdit.model;
  pricelnput.value = carToEdit.price;
  powerlnput.value = carToEdit.hp;
  yearInput.value = carToEdit.year;
  milesInput.value = carToEdit.miles;
  jokeInput.value = carToEdit.joke;
}

document.querySelector(".updateBtn").addEventListener("click", (e) => {
  // take the vakues from the input
  let newModel = modelInput.value;
  let newPrice = pricelnput.value;
  let newPower = powerlnput.value;
  let newYear = yearInput.value;
  let newMiles = milesInput.value;
  let newJoke = jokeInput.value;

  // update the values in the fields
  carToEdit.model = newModel;
  carToEdit.price = newPrice;
  carToEdit.year = newYear;
  carToEdit.hp = newPower;
  carToEdit.miles = newMiles;
  carToEdit.joke = newJoke;

  // update in local storage
  localStorage.setItem("carToEdit", JSON.stringify(carToEdit));
  // update the car in LS
  // find the index of the car
  let index = golfs.findIndex((golfs) => golfs.id === carToEdit.id);
  golfs.splice(index, 1, carToEdit);
  localStorage.setItem("vw", JSON.stringify(golfs));
  e.preventDefault();
  document.location = "cars.html";
});
