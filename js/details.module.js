import { Ui } from "./UI.module.js";
export class Details {
  constructor(id) {
    document.querySelector("#btnClose").addEventListener("click", () => {
      document.querySelector(".allMenu .food").classList.remove("d-none");
      document.querySelector(".details").classList.add("d-none");
    });
    this.getDetails(id);
    //this.uiInstance  = new ui();
    
  }

  async getDetails(id) {
    const loading = document.querySelector(".loader");
    loading.classList.remove("d-none"); 
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const result = await response.json();
     loading.classList.add("d-none"); 

    new Ui().displayDetails(result.meals[0]); 
  }
}
