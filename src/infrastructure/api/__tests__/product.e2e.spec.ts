import ProductModel from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(100);
    expect(response.body.type).toBe("a");
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product A",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 100,
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Product B",
        price: 200,
      });
    expect(response2.status).toBe(200);

    const response3 = await request(app).get("/product");
    expect(response3.status).toBe(200);
    expect(response3.body.products.length).toBe(2);

    expect(response3.body.products[0].name).toBe("Product A");
    expect(response3.body.products[0].price).toBe(100);
    expect(response3.body.products[1].name).toBe("Product B");
    expect(response3.body.products[1].price).toBe(400);
  });
});
