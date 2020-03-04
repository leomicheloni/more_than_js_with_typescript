import { Recipe } from "./recipe";
import { Ingredient } from "./ingredient";

export class Invoice {
    private _recipe: Recipe;
    private _shippingCost: number;

    constructor(recipe: Recipe, shippingCost: number) {
        this._recipe = recipe;
        this._shippingCost = shippingCost;
    }

    private get selectedItems(): Array<Ingredient> {
        return this._recipe.ingredients.filter((i) => i.selected);
    }

    get totalItems(): number {
        let total: number = 0;
        this.selectedItems.forEach((i) => total += parseInt(i.quantity));
        return total;
    }

    get subTotal(): number {
        return this._recipe.totalPrice;
    }

    // Invoice know the total is result of the recipe total (in the current state) + the shipping cost
    get total(): number {
        if (this.selectedItems.length === 0) return 0;
        return this._recipe.totalPrice + this._shippingCost;
    }
}