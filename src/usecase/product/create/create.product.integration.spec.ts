import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {

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

    it("should create a product A", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const product = {
            type: "a",
            name: "Product",
            price: 10,
        };
        const output = await usecase.execute(product);

        expect(output.id).toBeDefined();
        expect(output.name).toBe("Product");
        expect(output.price).toBe(10);
        expect(output.type).toBe("a");
    });

    it("should create a product B", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const product = {
            type: "b",
            name: "Product B",
            price: 100,
        };
        const output = await usecase.execute(product);

        expect(output.id).toBeDefined();
        expect(output.name).toBe("Product B");
        expect(output.price).toBe(200);
        expect(output.type).toBe("b");
    });
        
});