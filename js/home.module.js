import { Details } from "./details.module.js";
import { Ui } from "./UI.module.js";

export class Home {
  constructor() {
    /* this.ui  = new Ui(); */

    
    this.getMeal("");
    this.searchByName();

    this.mainSection = document.querySelector(".allMenu .food");
    this.details = document.querySelector(".details");
    this.openBtn = $(".openTag .fa-bars");
    this.closBtn = $(".open-close-icon");
    this.searchLink = $("#Search");
    this.Area = document.querySelector("#Area_link").addEventListener("click",()=>{
      document.querySelector(".allMenu .food").classList.add("d-none");
      document.querySelector(".details").classList.add("d-none");
      document.querySelector("#search").classList.add("d-none");
      document.querySelector("#category").classList.add("d-none");
      document.getElementById("Contact").classList.add("d-none")
      document.querySelector(".recipes").classList.add("d-none")
      document.getElementById("countries").classList.remove("d-none");
      document.querySelectorAll("#countries .region").forEach((region) => {
        region.addEventListener("click", () => {

          const country = region.dataset.country;
          this.getRegionBestFood(country);
          
        });
      });
      

    })
    this.contact = document.getElementById("Contact_link").addEventListener("click",()=>{
      document.querySelector(".allMenu .food").classList.add("d-none");
      document.querySelector(".details").classList.add("d-none");
      document.querySelector("#search").classList.add("d-none");
      document.querySelector("#category").classList.add("d-none");
      document.getElementById("countries").classList.add("d-none");
      document.querySelector(".recipes").classList.add("d-none")
      document.getElementById("Contact").classList.remove("d-none")

    })


    this.ingredients = document.getElementById("Ingredients_link").addEventListener("click",()=>{
      document.querySelector(".allMenu .food").classList.add("d-none");
      document.querySelector(".details").classList.add("d-none");
      document.querySelector("#search").classList.add("d-none");
      document.querySelector("#category").classList.add("d-none");
      document.getElementById("countries").classList.add("d-none");
      document.getElementById("Contact").classList.add("d-none")
      document.querySelector(".recipes").classList.remove("d-none")
      document.querySelectorAll("#Ingredients .ingredient").forEach((ingredient) => {
        ingredient.addEventListener("click", () => {
          const recipe = ingredient.dataset.ingredient;
          this.getIngredients(recipe);

        });
      }); 

    })
    this.category = document
      .querySelector("#category_link")
      .addEventListener("click", () => {
        document.querySelector(".allMenu .food").classList.add("d-none");
        document.querySelector(".details").classList.add("d-none");
        document.getElementById("Contact").classList.add("d-none")
        document.querySelector("#search").classList.add("d-none");
        document.querySelector("#countries").classList.add("d-none");
        document.querySelector(".recipes").classList.add("d-none")
        document.getElementById("Contact").classList.add("d-none")
        document.querySelector("#category").classList.remove("d-none");

        this.getCategories();
      });
   

    this.searchLink.click(function () {
      document.querySelector(".allMenu .food").classList.add("d-none");
      document.querySelector(".details").classList.add("d-none");
      document.getElementById("Contact").classList.add("d-none")
      document.querySelector("#search").classList.remove("d-none");
      document.querySelector("#countries").classList.add("d-none");
      document.querySelector("#category").classList.add("d-none");
      document.querySelector(".recipes").classList.add("d-none")
    });

    this.openBtn.click(function (e) {
      $(".overlay .items").animate({ left: "0px" }, 100);
      $(".overlay .openTag").animate({ left: "270px" }, 100);
      $(".openTag .fa-bars").hide();
      $(".open-close-icon").show();
      $(".footer-nav").animate({ left: "20px" }, 500);
      $(".items li").show(1000);
    });
    this.closBtn.click(function () {
      $(".overlay .items").animate({ left: "-270px" }, 100);
      $(".overlay .openTag").animate({ left: "270px" }, 100);
      $(".openTag .fa-bars").show();
      $(".open-close-icon").hide();
      $(".footer-nav").animate({ left: "-270px" }, 500);
      $(".items li").hide(800);
    });

    let x;
    this.inputField = document.querySelector(".letter");
    this.inputField.addEventListener("keyup", function (e) {
      if (
        e.target.value !== "" &&
        e.target.value !== null &&
        e.target.value !== undefined
      ) {
        x = e.target.value;
        new Home().mealLetter(x);
      }
    });
  }

  async mealLetter(char) {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      new Ui().displayByFirstletter(data.meals);
      document.querySelectorAll("#search .dish").forEach((dish) => {
        dish.addEventListener("click", () => {
          this.details.classList.remove("d-none");
          this.mainSection.classList.add("d-none");
          document.querySelector("#search").classList.add("d-none");

          const mealID = dish.dataset.id;
          new Details(mealID);
        });
      });
      
      
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as per your application's requirements
    }
  }
  searchByName() {
    document
      .querySelector(".searchbyname")
      .addEventListener("keyup", function (e) {
        let x = e.target.value;
        /* new Ui().displayByFirstletter(data.meals) */
        new Home().nameApi(x);
      });
  }
  async nameApi(name) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const req = await fetch(url);
    const response = await req.json();
    new Ui().displayByFirstletter(response.meals);
    document.querySelectorAll("#search .dish").forEach((dish) => {
      dish.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.mainSection.classList.add("d-none");
        document.querySelector("#search").classList.add("d-none");

        const mealID = dish.dataset.id;
        new Details(mealID);
      });
    });
    
   
  }

  async  getCategories() {
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data.categories) {
        throw new Error('Categories not found in response');
      }
  

  
      // Uncomment and adapt the following line if you have a UI class/method to display categories
      new Ui().displayCategories(data.categories);


      document.querySelectorAll("#showCategory .dish").forEach((dish) => {
        dish.addEventListener("click", () => {
          const foodCategory = dish.dataset.category
          this.getSpecificCategory(foodCategory);
          document.querySelector(".allMenu .food").classList.remove("d-none");
          document.querySelector("#category").classList.add("d-none");
        });
      });




  
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  async getSpecificCategory(category){
  
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      /* if (!data.categories) {
        throw new Error('Categories not found in response');
      } */
  
    
     

  
     
       new Ui().displayMeal(data.meals); 
       document.querySelectorAll(".dish").forEach((dish) => {
        dish.addEventListener("click", () => {
          this.details.classList.remove("d-none");
          this.mainSection.classList.add("d-none");
          const mealID = dish.dataset.id;
          new Details(mealID);
        });
      });

  
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

  }
  async getRegionBestFood(region){
    document.getElementById("countries").classList.add("d-none");
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`
    const req = await fetch(url);
    const response = await req.json();
    this.mainSection.classList.remove("d-none");
    new Ui().displayMeal(response.meals)
    document.querySelectorAll(".dish").forEach((dish) => {
      dish.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.mainSection.classList.add("d-none");
        const mealID = dish.dataset.id;
        new Details(mealID);
      });
    });

  }
  async  getIngredients(recipe) {
    try {
      // Assuming you have an element with class "recipes" that you want to reveal
      document.querySelector(".recipes").classList.add("d-none");
  
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipe}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      this.mainSection.classList.remove("d-none");
      new Ui().displayMeal(data.meals)
  
      // Assuming you want to log the meals array from the response
    
      document.querySelectorAll(".dish").forEach((dish) => {
        dish.addEventListener("click", () => {
          this.details.classList.remove("d-none");
          this.mainSection.classList.add("d-none");
          const mealID = dish.dataset.id;
          new Details(mealID);
        });
      });
  
      // You can proceed with further data manipulation or UI updates here
  
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  

  async getMeal(name) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const req = await fetch(url);
    const response = await req.json();
    /* console.log(response.meals); */
    new Ui().displayMeal(response.meals);

    document.querySelectorAll(".dish").forEach((dish) => {
      dish.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.mainSection.classList.add("d-none");
        const mealID = dish.dataset.id;
        new Details(mealID);
      });
    });
  }
}
