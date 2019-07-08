import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(name: string, price: number, available: boolean, dateCreated: Date){

        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, name, price, available, dateCreated);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getOneProduct(productId: string){

        const product = this.findProduct(productId)[0];
        return {...product };

    }

    updateProduct(productId: string, name: string, price: number, available: boolean, dateCreated: Date){

        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if (name) {
            updatedProduct.name = name;

        }

        if (price) {
            updatedProduct.price = price;

        }

        if (available) {
            updatedProduct.available = available;

        }

        if (dateCreated) {
            updatedProduct.dateCreated = dateCreated;

        }

        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
        return null;
    }



    private findProduct(id: string): [Product, number] {

        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];

        if (!product) {
            throw new NotFoundException('Ta izdelek ne obstaja.');
        }

        return [product, productIndex];

    }


}