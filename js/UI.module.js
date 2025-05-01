export class Ui {
  constructor() {
  

  }



  displayByFirstletter(info){
    let mealContainer = ``;
    for (let i = 0; i < info.length; i++) {
      mealContainer += `   
      <div class="col-lg-3 col-xl-3 col-md-3">
                  <div class="dish" data-id = ${info[i].idMeal}>
                    <img src="${info[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <div class="text-layer rounded-3 d-flex justify-content-start align-items-center">
                      <h2 class="ps-2">${info[i].strMeal}</h2>
                    </div>
                  </div>

      </div>`;
    }
    document.getElementById("mealbyletter").innerHTML = mealContainer;

  }
  displayMeal(data) {
    let mealContainer = ``;
    for (let i = 0; i < data.length; i++) {
      mealContainer += `   
      <div class="col-lg-3 col-xl-3 col-md-3">
                  <div class="dish" data-id = ${data[i].idMeal}>
                    <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <div class="text-layer rounded-3 d-flex justify-content-start align-items-center">
                      <h2 class="ps-2">${data[i].strMeal}</h2>
                    </div>
                  </div>

      </div>`;
    }
    document.getElementById("Showmeal").innerHTML = mealContainer;
  }
  displayCategories(data) {
    let mealContainer = ``;
    for (let i = 0; i < data.length; i++) {
      mealContainer += `   
      <div class="col-lg-3 col-xl-3 col-md-3">
                  <div class="dish" data-category = ${data[i].strCategory}>
                    <img src="${data[i].strCategoryThumb}" class="w-100 rounded-3" alt="">
                    <div class="text-layer rounded-3 ">
                      <h2 class="ps-2 text-center">${data[i].strCategory}</h2>
                      <p class="text-center text-black">${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                  </div>

      </div>`;
    }
    document.getElementById("showCategory").innerHTML = mealContainer;
  }

  displayDetails(data) {
    let recipes = ``;
    let tags =``;
    let string;
     if(data.strTags){
      string = data.strTags.split(",");
      for (let i = 0; i < string.length; i++) {
        tags += ` <button class="btn btn-tags mt-2 mb-2 ms-2 p-2">${string[i]}</button>`
      }
     }

    for (let i = 1; i <= 20; i++) {
        data[`strIngredient${i}`]? recipes += `<button class="btn recipeBtn ms-2 me-2 mt-2 mb-2  ps-2 pe-2 pt-1 pb-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</button>`: "";
    }


   
    const mealDetails = `
       <div class="col-md-4">
              <img
                src="${data.strMealThumb}"
                class="w-100 rounded-2"
                alt="image details"
              />
              <h3 class="text-white p-1">${data.strMeal}</h3>
            </div>
            <div class="col-md-8">
              <h2 class="text-white">Insructions</h2>
              <p class="text-white">
              ${data.strInstructions}
              </p>
              <h3 class="text-white">
                Area:  ${data.strArea}
              </h3>
              <h3 class="text-white">
                Category:  ${data.strCategory}
              </h3>
              <h3 class="text-white">
                Recipes:  
              </h3>
              <div class="col-md-8 mb-3  w-100">
                ${recipes}
              </div>
              <h3 class="text-white">
                Tags:  
              </h3>
               <div class="col-md-8 mb-3  mt-3  w-100">
                  ${tags}
              </div>
              <div class="col-md-8 mb-3  mt-3  w-100">
                <a
                class="btn btn-outline-danger btn-danger  ps-3 pe-3 pt-2 pb-2 text-white"
                target="_blank"
                href="${data.strSource}"
                >Source</a
              >
                <a
                class="btn  btn-success  ps-3 pe-3 pt-2 pb-2 text-white"
                target="_blank"
                href="${data.strYoutube}"
                >Youtube</a
              >
              </div>

            
            </div>          
        
         
      
     `;

    document.getElementById("detailsContent").innerHTML = mealDetails;
    /* this.editGameDetails(); */
  }
  editGameDetails() {
    let allScreenShots = Array.from(document.querySelectorAll(".gallery img"));
    let layer = document.querySelector(".layer");
    let inner = document.querySelector(".inner");
    let closeMark = document.querySelector(".fa-xmark");
    let nextImg = document.querySelector(".fa-arrow-right");
    let prevImg = document.querySelector(".fa-arrow-left");
    let index;
    let imgSrc;

    for (let i = 0; i < allScreenShots.length; i++) {
      allScreenShots[i].addEventListener("click", function (e) {
        layer.classList.remove("d-none");
        imgSrc = e.target.getAttribute("src");
        inner.style.backgroundImage = `url(${imgSrc})`;
        index = allScreenShots.indexOf(e.target);
      });
    }
    function getNext() {
      index++;
      index == allScreenShots.length ? (index = 0) : "";
      imgSrc = allScreenShots[index].getAttribute("src");
      inner.style.backgroundImage = `url(${imgSrc})`;
    }
    function getPrev() {
      index--;
      index == -1 ? (index = allScreenShots.length - 1) : "";
      imgSrc = allScreenShots[index].getAttribute("src");
      inner.style.backgroundImage = `url(${imgSrc})`;
    }

    function closeImg() {
      layer.classList.add("d-none");
    }
    closeMark.addEventListener("click", closeImg);
    nextImg.addEventListener("click", getNext);
    prevImg.addEventListener("click", getPrev);
  }
}
