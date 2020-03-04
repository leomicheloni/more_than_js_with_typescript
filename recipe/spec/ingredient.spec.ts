import { Ingredient } from "../src/ingredient";

describe("ingredient behavior", function(){
    it("should be created pending", function(){
        var a = new Ingredient();
        a.price = 13;
        a.items = 2;

        expect(a.total()).toBe(26);
    })
});