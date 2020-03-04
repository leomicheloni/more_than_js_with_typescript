import { Invoice } from "../src/invoice";
import { Recipe } from "../src/recipe";
import { Ingredient } from "../src/ingredient";


describe("invoice behavior", function () {
    it("should consider shipping cost in total", function () {
        let recipe = new Recipe();
        var a = new Invoice(recipe, 7);
        let ingredient = new Ingredient();
        ingredient.price = 7;
        ingredient.items = 3;
        ingredient.selected = true;
        recipe.addIngredient(ingredient);

        expect(a.total).toBe(28);
    })
});