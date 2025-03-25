import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductB from "../entity/product-b";
import ProductBYupValidator from "../validator/productB.yup.validtor";

export default class ProductBValidatorFactory {
  static create(): ValidatorInterface<ProductB> {
    return new ProductBYupValidator();
  }
}