const url = "rabbit.json";
// Fetch the planet data from json file

async function fetchText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const vw = await response.json();
    // put the data ub the localstorage
    localStorage.setItem("vw", JSON.stringify(vw.rabbit));
    // let activeId = JSON.parse(localStorage.getItem("cars"));
    // function to diplsay data
    displayCars(vw.rabbit);
  } catch (e) {
    console.error(e);
  }
}
// function deleteItem(num) {
//   alert(num);
// }
// golfs is an arry of different cars
function displayCars(golfs) {
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
    // remove from localStorage
    del.addEventListener("click", function () {
      localStorage.removeItem(golf);
      let delResponse = fetch(`rabbit.json/rabbit/${golf.id}`, {
        method: "DELETE",
      });
      //   console.log(golf);
    });

    // add an action
    del.textContent = "delete";
    bunny.appendChild(actions);
    bunny.appendChild(del);
    const carSection = document.querySelector(".cars");
    carSection.appendChild(bunny);

    // carSection.innerHTML = `<img src="${golf.image}">ee  </img>`;
    // carSection.innerHTML = `<p>${golf.model}</p>`;
    //console.log(carSection);
  });
  // console.log(carSection);
}
fetchText(url);
