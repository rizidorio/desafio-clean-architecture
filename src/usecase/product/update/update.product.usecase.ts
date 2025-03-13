import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const productInterface = ProductFactory.create(
      input.type,
      input.name,
      input.price
    );

  await this.productRepository.update(productInterface);

  return {
    id: productInterface.id,
    name: productInterface.name,
    price: productInterface.price,
    type: productInterface.constructor.name === "ProductB" ? "b" : "a",
  };
 }
}