var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("IRecipeDataRetriever", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("ingredient", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ingredient {
        // The ingredient know the total cost in this specific moment,
        // so if there was any special price logic it would be here
        total() {
            return this.items * this.price;
        }
    }
    exports.Ingredient = Ingredient;
});
define("recipe", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Recipe {
        set currency(value) {
            this._currency = value;
        }
        get currency() {
            return this._currency;
        }
        set name(value) {
            this._name = value;
        }
        get name() {
            return this._name;
        }
        set ingredients(value) {
            this._ingredients = value;
        }
        get ingredients() {
            return this._ingredients;
        }
        addIngredient(ingredient) {
            if (this._ingredients === undefined)
                this._ingredients = new Array();
            this._ingredients.push(ingredient);
        }
        // The recipe knows the current total based on selected ingredients partial prices x the number of items
        get totalPrice() {
            if (this._ingredients === undefined)
                return 0;
            let total = 0;
            this._ingredients.filter(i => i.selected).forEach((ingredient) => {
                total += ingredient.total();
            });
            return total;
        }
    }
    exports.Recipe = Recipe;
});
define("recipeDataRetriever", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RecipeDataRetriever {
    }
    exports.RecipeDataRetriever = RecipeDataRetriever;
});
define("remoteRecipeDataRetriever", ["require", "exports", "recipeDataRetriever"], function (require, exports, recipeDataRetriever_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RemoteRecipeDataRetriever extends recipeDataRetriever_1.RecipeDataRetriever {
        connect() {
            throw new Error("Method not implemented.");
        }
        retrieve() {
            return this.getData();
        }
        getData() {
            return __awaiter(this, void 0, void 0, function* () {
                let recipe = yield fetch("https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json");
                return yield recipe.json();
            });
        }
    }
    exports.RemoteRecipeDataRetriever = RemoteRecipeDataRetriever;
});
define("mealservice", ["require", "exports", "recipe", "ingredient", "remoteRecipeDataRetriever"], function (require, exports, recipe_1, ingredient_1, remoteRecipeDataRetriever_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MealService {
        // Dependency inversion principle
        constructor(recipeDataRetriever) {
            this._dataRetriever = recipeDataRetriever;
        }
        loadRecipe() {
            const promise = new Promise((resolve) => {
                // Liskov sustitution principle broken
                if (this._dataRetriever instanceof remoteRecipeDataRetriever_1.RemoteRecipeDataRetriever) {
                    this._dataRetriever.retrieve().then((data) => {
                        this.mapData(data);
                        resolve();
                    });
                }
                else {
                    const recipeData = this._dataRetriever.retrieve().recipe;
                    this.mapData(recipeData);
                    resolve();
                }
            });
            return promise;
        }
        mapData(recipeData) {
            this._recipe = new recipe_1.Recipe();
            this._recipe.currency = recipeData.currency;
            this._recipe.name = recipeData.name;
            this._recipe.ingredients = new Array();
            recipeData.ingredients.forEach(function (i, index) {
                var ingredient = new ingredient_1.Ingredient();
                ingredient.id = index;
                ingredient.brand = i.brand;
                ingredient.items = i.items;
                ingredient.price = i.price;
                ingredient.product = i.product;
                ingredient.quantity = i.quantity;
                this._recipe.ingredients.push(ingredient);
            }, this);
        }
        get recipe() {
            return this._recipe;
        }
    }
    exports.MealService = MealService;
});
define("invoice", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Invoice {
        constructor(recipe, shippingCost) {
            this._recipe = recipe;
            this._shippingCost = shippingCost;
        }
        get selectedItems() {
            return this._recipe.ingredients.filter((i) => i.selected);
        }
        get totalItems() {
            let total = 0;
            this.selectedItems.forEach((i) => total += parseInt(i.quantity));
            return total;
        }
        get subTotal() {
            return this._recipe.totalPrice;
        }
        // Invoice know the total is result of the recipe total (in the current state) + the shipping cost
        get total() {
            if (this.selectedItems.length === 0)
                return 0;
            return this._recipe.totalPrice + this._shippingCost;
        }
    }
    exports.Invoice = Invoice;
});
define("staticRecipeDataRetriever", ["require", "exports", "recipeDataRetriever"], function (require, exports, recipeDataRetriever_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    class StaticRecipeDataRetriever extends recipeDataRetriever_2.RecipeDataRetriever {
        connect() {
            throw new Error("Method not implemented.");
        }
        constructor() {
            super();
        }
        retrieve() {
            return data;
        }
    }
    exports.StaticRecipeDataRetriever = StaticRecipeDataRetriever;
});
define("app", ["require", "exports", "mealservice", "invoice", "staticRecipeDataRetriever"], function (require, exports, mealservice_1, invoice_1, staticRecipeDataRetriever_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // The app class represents this application, and it in charge of sending information to the current invoice 
    // and showing the current results
    class App {
        constructor() {
            this.$title = document.querySelector(".header__title");
            this.$subtotal = document.querySelector(".footer__subtotal--number");
            this.$total = document.querySelector(".footer__total--number");
            this.$shippingCosts = document.querySelector(".footer__shippingcosts--number");
            this.$totalBtn = document.querySelector(".footer__btn--span");
            this.$totalItems = document.querySelector(".footer__items--number");
            this.$selectAll = document.querySelector(".header__select--link");
            this.$deselectAll = document.querySelector(".header__deselect--link");
            const recipeDataRetriever = new staticRecipeDataRetriever_1.StaticRecipeDataRetriever();
            this.mealService = new mealservice_1.MealService(recipeDataRetriever);
        }
        static Build(mealService) {
            let app = new App();
            app.mealService = mealService;
            return app;
        }
        static BuildStatic() {
            let app = new App();
            const recipeDataRetriever = new staticRecipeDataRetriever_1.StaticRecipeDataRetriever();
            app.mealService = new mealservice_1.MealService(recipeDataRetriever);
            return app;
        }
        start() {
            this.mealService.loadRecipe().then(() => {
                const $rowTemplate = document.querySelector("#row_template tr");
                const $table = document.querySelector("#tableBody");
                this.mealService.recipe.ingredients.forEach((ingredient) => {
                    const $newRow = $rowTemplate.cloneNode(true);
                    $newRow.classList.add("my_row");
                    $newRow.querySelector("input[type=checkbox]").checked = false;
                    $newRow.querySelector("input[type=number]").value = ingredient.items.toString();
                    $newRow.querySelector(".main__articule--description--price").innerHTML = ingredient.price.toString();
                    $newRow.querySelector(".main__article--currency").innerHTML = this.mealService.recipe.currency;
                    $newRow.querySelector(".main__article--id").innerHTML = ingredient.id.toString();
                    let elementDescription = $newRow.querySelector(".main__article--first--description");
                    elementDescription.querySelector(".main__article--description--title").innerHTML = ingredient.product;
                    elementDescription.querySelector(".main__article--description--brand").innerHTML = ingredient.brand || "";
                    elementDescription.querySelector(".main__article--description--weight").innerHTML = ingredient.quantity;
                    $table.appendChild($newRow);
                });
                this.invoice = new invoice_1.Invoice(this.mealService.recipe, 7);
                this.updateValues();
                this.bindEvents();
            });
        }
        updateValues() {
            document.querySelectorAll(".my_row").forEach((row) => {
                const $checked = row.querySelector("input[type=checkbox]");
                const $quantity = row.querySelector(".items__input");
                const $price = row.querySelector(".main__articule--description--price");
                const $ingredientId = row.querySelector(".main__article--id");
                let price = parseFloat($price.innerHTML);
                let quantity = parseInt($quantity.value);
                let selected = $checked.checked;
                const currentItem = this.mealService.recipe.ingredients.find((ingredient) => {
                    return ingredient.id === parseInt($ingredientId.innerHTML);
                });
                if (currentItem !== undefined) {
                    currentItem.items = parseInt($quantity.value);
                    currentItem.selected = selected;
                    currentItem.price = price;
                    currentItem.quantity = quantity.toString();
                }
            });
            this.$subtotal.innerHTML = `${this.invoice.subTotal.toFixed(2)} ${this.mealService.recipe.currency}`;
            this.$shippingCosts.innerHTML = `${this.invoice.total.toFixed(2)} ${this.mealService.recipe.currency}`;
            this.$total.innerHTML = `${this.invoice.total.toFixed(2)} ${this.mealService.recipe.currency}`;
            this.$totalBtn.innerHTML = `${this.invoice.total.toFixed(2)} ${this.mealService.recipe.currency}`;
            this.$totalItems.innerHTML = this.invoice.totalItems.toString();
            this.$title.innerHTML = this.mealService.recipe.name;
        }
        bindEvents() {
            function updateSelectorValues(newValue) {
                document.querySelectorAll(".my_row input[type=checkbox]").forEach((el) => el.checked = newValue);
            }
            function selectAll() {
                updateSelectorValues(true);
            }
            function deSelectAll() {
                updateSelectorValues(false);
            }
            document.querySelectorAll(".my_row").forEach((el) => {
                el.addEventListener("change", (ev) => {
                    this.updateValues();
                });
            });
            this.$deselectAll.addEventListener("click", (ev) => {
                ev.preventDefault();
                deSelectAll();
                this.updateValues();
            });
            this.$selectAll.addEventListener("click", (ev) => {
                ev.preventDefault();
                selectAll();
                this.updateValues();
            });
        }
    }
    exports.App = App;
});
define("main", ["require", "exports", "app"], function (require, exports, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var app = app_1.App.BuildStatic();
    app.start();
});
//# sourceMappingURL=bundle.js.map