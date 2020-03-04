import { RecipeDataRetriever } from "./recipeDataRetriever";

export class RemoteRecipeDataRetriever extends RecipeDataRetriever {
  connect(): boolean {
    throw new Error("Method not implemented.");
  }
  retrieve(): Promise<any> {
    return this.getData();
  }

  async getData(): Promise<any> {
    let recipe = await fetch(
      "https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json"
    );
    return await recipe.json();
  }
}