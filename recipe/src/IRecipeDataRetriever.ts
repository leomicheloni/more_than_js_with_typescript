
// Interface segregation
export interface IRecipeDataRetriever {
    retrieve(): Promise<any>;
    connect(): boolean;
}