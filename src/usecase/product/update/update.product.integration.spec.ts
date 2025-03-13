import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

    it("should update a product A", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const product = {
            type: "a",
            name: "Product",
            price: 10,
        };
        const createdProduct = await createProductUseCase.execute(product);

        const updatedProduct = {
            id: createdProduct.id,
            type: "a",
            name: "Product Updated",
            price: 20,
        };
        const output = await updateProductUseCase.execute(updatedProduct);

        expect(output.id).toBeDefined();
        expect(output.name).toBe("Product Updated");
        expect(output.price).toBe(20);
        expect(output.type).toBe("a");
    });

    it("should update a product B", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const product = {
            type: "b",
            name: "Product B",
            price: 100,
        };
        const createdProduct = await createProductUseCase.execute(product);

        const updatedProduct = {
            id: createdProduct.id,
            type: "b",
            name: "Product B Updated",
            price: 200,
        };
        const output = await updateProductUseCase.execute(updatedProduct);

        expect(output.id).toBeDefined();
        expect(output.name).toBe("Product B Updated");
        expect(output.price).toBe(400);
        expect(output.type).toBe("b");
    });       
});
