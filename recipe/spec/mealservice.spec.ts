import { MealService } from "../src/mealservice";
import { StaticRecipeDataRetriever } from "../src/staticRecipeDataRetriever";

describe("meal service behaviour", function(){
    it("should load ingredients", function(){
        var a = new MealService(new StaticRecipeDataRetriever());
        a.loadRecipe();
        expect(a.recipe).not.toBeNull();
        expect(a.recipe.ingredients.length).toBe(7);
    })
});