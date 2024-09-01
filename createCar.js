let golfs = JSON.parse(localStorage.getItem("vw"));
// load the DOM into variables
let modelInput = document.getElementById("model");
let pricelnput = document.getElementById("price");
let powerlnput = document.getElementById("power");
let yearInput = document.getElementById("year");
let milesInput = document.getElementById("miles");
let jokeInput = document.getElementById("joke");
function availableIndex() {
  let i = 0;
  while (true) {
// check if the id with number i is available
    let filteredArray = golfs.filter(function (e) {
      return e.id == i;
    });
// check if i is already in use
    if (filteredArray.length == 0) {
// it is availableIndex, so we have found an index
      return i;
    } else {
// itis not available so we increment
      i++;
    }
  }
}

document.querySelector(".createBtn").addEventListener("click", (e) => {
  // find the id of the new element
  let newId = availableIndex();
//   get the values in the fields
  let newModel = modelInput.value;
  let newPrice = pricelnput.value;
  let newPower = powerlnput.value;
  let newYear = yearInput.value;
  let newMiles = milesInput.value;
  let newJoke = jokeInput.value;
// create a new object
  let newRabbit = {
    id: newId,
    model: newModel,
    price: newPrice,
    hp: newPower,
    year: newYear,
    miles: newMiles,
    joke: newJoke,
  };
// push the object in the array
  golfs.push(newRabbit);
//   update the storage
  localStorage.setItem("vw", JSON.stringify(golfs));
  e.preventDefault();
  document.location = "cars.html";
});
