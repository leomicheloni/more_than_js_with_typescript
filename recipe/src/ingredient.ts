export class Ingredient {
    id: number;
    product: string;
    brand: string;
    items: number;
    quantity: string;
    price: number;
    selected: boolean;

    // The ingredient know the total cost in this specific moment,
    // so if there was any special price logic it would be here
    total(): number {
        return this.items * this.price;
    }
}