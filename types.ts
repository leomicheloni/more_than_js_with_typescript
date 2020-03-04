// boolean
let isDone: boolean = false;

// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
let color: string = "blue";
color = 'red';

// array
let list: number[] = [1, 2, 3];

// generic
let glist: Array<number> = [1, 2, 3];

// tuple
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK

// Initialize it incorrectly
// x = [10, "hello"]; // Error

console.log(x[0].substring(1)); // OK
// console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'

// enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// void
function warnUser(): void {
    console.log("This is my warning message");
}

// type assertions
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// let strLength: number = (someValue as string).length;
