// Fetch the car data from json file
const url = "rabbit.json";
// remove a car by id
function removeCar(id, arr) {
  // create a new array without the element with id golf.id
  let filteredArray = arr.filter(function (e) {
    return e.id !== id;
  });
  //   put the new array in the storage
  localStorage.setItem("vw", JSON.stringify(filteredArray));
  location.reload();
}

function updateCar(id, arr) {
  // update array without the element with id golf.id
  golf = arr.filter((arr) => arr.id === id);
  let carString = JSON.stringify(golf);
  // send car to LS
  localStorage.setItem("carToEdit", carString);
  document.location = "updateCars.html";
}

function createCar() {
  document.location = "createCar.html";
}

async function fetchText(url) {
  //check if it is a load or reload
  if (localStorage.getItem("vw") === null) {
    console.log("load");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      vw = await response.json();
      // put the data in the localstorage
      localStorage.setItem("vw", JSON.stringify(vw.rabbit));

      // function to diplsay data
      displayCars(vw.rabbit);
    } catch (e) {
      console.error(e);
    }
  } else {
    // console.log("reload");
    let vwg = JSON.parse(localStorage.getItem("vw"));
    displayCars(vwg);
  }
}

function displayCars(golfs) {
  console.log(golfs);
  // loop the array
  golfs.forEach((golf) => {
    //create a figure
    let bunny = document.createElement("figure");
    bunny.classList.add("car");
    //add style
    bunny.textContent = `Model : ${golf.model}; Year : ${golf.year}; Price ${golf.price}; Rabbit Power : ${golf.hp}`;
    // fix the image
    if (golf.image != undefined) {
      console.log(golf.image);
      let img = document.createElement("img");
      img.src = golf.image;
      // add class
      img.classList.add("pic");
      bunny.appendChild(img);
    }
    let actions = document.createElement("section");
    // make delete button
    let del = document.createElement("button");
    del.classList.add("btn");
    // remove element id from localStorage
    del.addEventListener("click", (event) => {
      event.stopPropagation();
      removeCar(golf.id, golfs);
    });

    // this did not work :((
    //   localStorage.removeItem(golf);
    //   let delResponse = fetch(`rabbit.json/rabbit/${golf.id}`, {
    //     method: "DELETE",
    // add an action
    del.textContent = "delete";
    bunny.appendChild(actions);
    bunny.appendChild(del);
    let update = document.createElement("button");
    update.classList.add("btn");
    // update element id from localStorage
    update.addEventListener("click", (event) => {
      event.stopPropagation();
      updateCar(golf.id, golfs);
    });

    update.textContent = "update";
    let joke = document.createElement("p");
    joke.textContent = `Joke about VW Golf from Pernik, Bulgaria  : "${golf.joke}"`;

    bunny.appendChild(actions);
    bunny.appendChild(update);
    bunny.appendChild(joke);

    // check if we have set the variable
    let carSection = document.querySelector(".cars");
    carSection.appendChild(bunny);
  });
}
fetchText(url);
