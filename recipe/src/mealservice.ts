import { Recipe } from "./recipe";
import { Ingredient } from "./ingredient";
import { RecipeDataRetriever } from "./recipeDataRetriever";
import { RemoteRecipeDataRetriever } from "./remoteRecipeDataRetriever";


export class MealService {
  private _recipe: Recipe;
  private _dataRetriever: RecipeDataRetriever;

  // Dependency inversion principle
  constructor(recipeDataRetriever: RecipeDataRetriever) {
    this._dataRetriever = recipeDataRetriever;
  }

  loadRecipe(): Promise<void> {

    const promise = new Promise<void>((resolve) => {
      // Liskov sustitution principle broken
      if (this._dataRetriever instanceof RemoteRecipeDataRetriever) {
        this._dataRetriever.retrieve().then((data) => {
          this.mapData(data);
          resolve();
        });
      } else {
        const recipeData = this._dataRetriever.retrieve().recipe;
        this.mapData(recipeData);
        resolve();
      }

    });

    return promise;
  }

  private mapData(recipeData: any) {
    this._recipe = new Recipe();
    this._recipe.currency = recipeData.currency;
    this._recipe.name = recipeData.name;
    this._recipe.ingredients = new Array<Ingredient>();

    recipeData.ingredients.forEach(function (i: Ingredient, index: number) {
      var ingredient = new Ingredient();
      ingredient.id = index;
      ingredient.brand = i.brand;
      ingredient.items = i.items;
      ingredient.price = i.price;
      ingredient.product = i.product;
      ingredient.quantity = i.quantity;
      this._recipe.ingredients.push(ingredient);
    }, this);
  }

  get recipe(): Recipe {
    return this._recipe;
  }
}