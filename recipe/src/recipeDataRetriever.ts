import { IRecipeDataRetriever } from "./IRecipeDataRetriever";

export abstract class RecipeDataRetriever implements IRecipeDataRetriever {
    abstract connect(): boolean;
    abstract retrieve(): any;
}
