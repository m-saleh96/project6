
let searchBtn = document.getElementById('searchBtn')
let searchInput = document.getElementById('searchInput');
let recipesRow = document.getElementById('recipesRow')
let recipeDetailsDiv = document.getElementById('recipeDetails')
let pizza = document.getElementById('pizza')
let pasta = document.getElementById('pasta')

let allRecipes = []

async function getRecipes(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`)
    apiResponse = await apiResponse.json()
    allRecipes = apiResponse.recipes
    displayRecipes()
}

searchBtn.addEventListener('click' , function () {
    getRecipes(searchInput.value);
})
pizza.addEventListener('click' , function () {
    getRecipes("pizza");
})
pasta.addEventListener('click' , function () {
    getRecipes("pasta");
})

function displayRecipes() {
    cartona = ""
    for (let i = 0; i < allRecipes.length; i++) {
        let myid = "'"+allRecipes[i].recipe_id+"'"
        cartona += `
        <div onclick="getrecipeDetails(${myid})" class="col-md-4">
        <img class="w-100" src="${allRecipes[i].image_url}" alt="">
        <h5>${allRecipes[i].title}</h5>
        <p>${allRecipes[i].publisher}</p>
        </div>
        `
    }
    recipesRow.innerHTML = cartona
}


async function getrecipeDetails(id){
    recipeDetails ;
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    apiResponse = await apiResponse.json()
    recipeDetails = apiResponse.recipe
    showrecipeDetails(recipeDetails)
}




function showrecipeDetails(recipeDetails) {
    let cartona =  `
    <h4>${recipeDetails.title}</h4>
    <img src="${recipeDetails.image_url}" alt="">
    <p class='p-2'>${recipeDetails.publisher}</p>
    <ul>`
    for (let i = 0; i < recipeDetails.ingredients.length; i++) {
        
        cartona += `<li>${recipeDetails.ingredients[i]}</li>`
    }
    
    cartona +=`</ul>`
    
     
    recipeDetailsDiv.innerHTML = cartona
}
