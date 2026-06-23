class Order{
    constructor(numOrder , totalQuantity , totalValue , dateOrder){
        this.numOrder = numOrder;
        this.totalQuantity = totalQuantity;
        this.totalValue = totalValue;
        this.dateOrder = new Date();
    };

    static createOrder(num , totalQ , totalV){
        if (num.trim().length === 0){
            throw new Error("Numero de orden vacio");
        }
        if (totalQ < 0 || typeof totalQ !== "number"){
            throw new Error("Total menor a 0 o formato invalido");
        }
        if (totalV < 0 || typeof totalV !== "number"){
            throw new Error("Total menor a 0 o formato invalido");
        }
        return new Orders(
            num , 
            totalQ , 
            totalV
        );
    }
}