import { RecipeDataRetriever } from "./recipeDataRetriever";

const data = {
    recipe: {
        name: "Risotto de setas (vegano)",
        "shipping-cost": 7,
        currency: "€",
        ingredients: [
            {
                product: "Margarina de maíz",
                brand: "Artua",
                items: 1,
                quantity: "600 gr.",
                price: 2.95
            },
            {
                product: "Arroz de Valencia",
                brand: "De Nuestra Tierra",
                items: 1,
                quantity: "1 kg.",
                price: 2.4
            },
            {
                product: "Caldo de verduras natural",
                brand: "Aneto",
                items: 1,
                quantity: "1 l.",
                price: 3.6
            },
            {
                product: "Seta Shiitake ecológica",
                items: 1,
                quantity: "200 gr.",
                price: 3.55
            },
            {
                product: "Paragoce, vino blanco",
                brand: "Verdejo D.O. Rueda",
                items: 1,
                quantity: "0,57 cl.",
                price: 5.85
            },
            {
                product: "Ajo",
                items: 1,
                quantity: "270 gr.",
                price: 1.49
            },
            {
                product: "Cebolla chalotas",
                items: 1,
                quantity: "200 gr.",
                price: 2.99
            }
        ]
    }
};

export class StaticRecipeDataRetriever extends RecipeDataRetriever {

    connect(): boolean {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super();
    }

    retrieve(): any {
        return data;
    }
}