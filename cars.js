// Fetch the planet data from json file
const url = "rabbit.json";

function removeCar(id, arr) {
  arr.splice(id, 1); // 2nd parameter means remove one item only
  localStorage.setItem("vw", JSON.stringify(arr));
  location.reload();
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
      // put the data ub the localstorage
      localStorage.setItem("vw", JSON.stringify(vw.rabbit));

      // function to diplsay data
      displayCars(vw.rabbit);
    } catch (e) {
      console.error(e);
    }
  } else {
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
    let img = document.createElement("img");
    img.src = golf.image;
    // add class
    img.classList.add("pic");
    bunny.appendChild(img);
    let actions = document.createElement("p");
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
    // check if we have set the variable
    let carSection = document.querySelector(".cars");
    console.log(carSection);

    carSection.appendChild(bunny);
  });
}
fetchText(url);
