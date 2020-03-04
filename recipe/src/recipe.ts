import { Ingredient } from "./ingredient";

export class Recipe {
    private _currency: string;
    private _name: string;
    private _ingredients: Array<Ingredient>;

    set currency(value: string) {
        this._currency = value;
    }

    get currency(): string {
        return this._currency;
    }

    set name(value: string) {
        this._name = value;
    }
    get name(): string {
        return this._name;
    }

    set ingredients(value: Array<Ingredient>) {
        this._ingredients = value;
    }

    get ingredients(): Array<Ingredient> {
        return this._ingredients;
    }

    addIngredient(ingredient: Ingredient) {
        if (this._ingredients === undefined) this._ingredients = new Array<Ingredient>();
        this._ingredients.push(ingredient);
    }

    // The recipe knows the current total based on selected ingredients partial prices x the number of items
    get totalPrice(): number {
        if (this._ingredients === undefined) return 0;
        let total: number = 0;
        this._ingredients.filter(i=>i.selected).forEach((ingredient) => {
            total += ingredient.total();
        });

        return total;
    }
}