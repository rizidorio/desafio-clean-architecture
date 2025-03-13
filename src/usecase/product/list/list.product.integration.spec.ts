import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe('Test list products use case', () => {
  let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should list products', async () => {
        const productRepository = new ProductRepository();
        const listUsecase = new ListProductUseCase(productRepository);
        const createUsecase = new CreateProductUseCase(productRepository);

        const product1 = await createUsecase.execute({
            type: 'a',
            name: 'Product 1',
            price: 100,
        });
        const product2 = await createUsecase.execute({
            type: 'b',
            name: 'Product 2',
            price: 200,
        });

        const output = await listUsecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
});
