import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(
        input: InputCreateProductDto
    ): Promise<OutputCreateProductDto> {
        const productInterface = ProductFactory.create(
            input.type,
            input.name,
            input.price
        );

        await this.productRepository.create(productInterface);

        return {
            id: productInterface.id,
            name: productInterface.name,
            price: productInterface.price,
            type: productInterface.constructor.name === "ProductB" ? "b" : "a",
        };
    }
}