import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "../create/create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe ("Test find product use case", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const findUsecase = new FindProductUseCase(productRepository);
        const createUsecase = new CreateProductUseCase(productRepository);

        const input = {
            type: "a",
            name: "Product",
            price: 100,
        };

        const product = await createUsecase.execute(input);
        const output = await findUsecase.execute({ id: product.id });

        expect(output).toEqual({
            id: product.id,
            type: product.type,
            name: product.name,
            price: product.price
        });
    });
});