// template strings
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;


// array destructuring
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

// tuple destructuring
let tuple: [number, string, boolean] = [7, "hello", true];
let [aa, bb, cc] = tuple; // aa: number, bb: string, cc: boolean

// object destructuring
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;

// spread
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };