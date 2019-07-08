import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){

    }

    @Post()
    addProduct(
        @Body('name') prodName: string,
        @Body('price') prodPrice: number,
        @Body('available') prodAvailable: boolean,
        @Body('dateCreated') prodDate: Date,
        ): any {

        const generatedId = this.productsService.insertProduct(prodName, prodPrice, prodAvailable, prodDate);

        return{id: generatedId};

    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string,) {
        return this.productsService.getOneProduct(prodId);

    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('name') prodName: string,
        @Body('price') prodPrice: number,
        @Body('available') prodAvailable: boolean,
        @Body('dateCreated') prodDate: Date)

        {
            this.productsService.updateProduct(prodId, prodName, prodPrice, prodAvailable, prodDate)
            return null;
        }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string, ){
        this.productsService.deleteProduct(prodId);
    }

}
