/*Type = [
    types of products
    ]
*/

class Product{
    constructor(name , price , stock , type){
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.type = type; 
    };

    static createProduct(name , price , stock , typeP){
        if (price <= 0 || typeof price !== "number"){
            throw new Error("Precio menor a 0, solo pueden ingresarse cantidades mayores 0");
        }
        if (stock < 0 || typeof stock !== "number"){
            throw new Error("Stock menor a 0, solo pueden ingresarse cantidades mayores a 0");
        }
        if (name.length <= 0 || typeof name !== "string"){ 
            throw new Error("Nombre vacio, debe al menos existir un caracter en el nombre");     
        }
        if (typeof typeP !== "string"){
            throw new Error("Tipo no valido");
        }
        return new Product(
            name, 
            price, 
            stock, 
            typeP 
        );
    };
}