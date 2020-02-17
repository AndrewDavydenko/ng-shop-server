import * as fs from 'fs';
import * as util from 'util';
import * as mongoose from 'mongoose';

interface IBaseCategory {
  id: string;
  title: string;
  count: number;
  weight: number;
}

interface IBaseSubcategory {
  id: string;
  title: string;
  count: number;
  category: string;
  weight: number;
}
interface IBaseImage {
  url: string;
  source: string;
}
interface IBaseProduct {
  id: string;
  title: string;
  description: string;
  quantity: number;
  subcategory: string;
  status: boolean;
  images: IBaseImage[];
  price: number;
  discount: number;
}

interface ICategory {
  _id: mongoose.Types.ObjectId;
  name: string;
}

interface ISubCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
}

interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  subCategory: mongoose.Types.ObjectId;
  images: IBaseImage[];
  price: number;
  status: boolean;
}

interface IJsonData {
  categories: IBaseCategory[];
  subcategories: IBaseSubcategory[];
  products: IBaseProduct[];
}

const fileName = 'db-base.json';

main();

async function main() {
  try {
    const asyncFileReader = util.promisify(fs.readFile);
    const asyncFileWriter = util.promisify(fs.writeFile);

    const buffer: Buffer = await asyncFileReader(`${__dirname}/${fileName}`);
    const json: IJsonData = JSON.parse(buffer.toString()) as IJsonData;
    let subCategories: ISubCategory[] = [];
    let products: IProduct[] = [];
    const categories: ICategory[] = json.categories.map(
      ({ title, id }: IBaseCategory): ICategory => {
        const categoryId: mongoose.Types.ObjectId = mongoose.Types.ObjectId();
        // subCategories
        const subcategories = json.subcategories
          .filter(({ category }) => id === category)
          .map(({ title: subTitle, id: subId }: IBaseSubcategory) => {
            const _subId: mongoose.Types.ObjectId = mongoose.Types.ObjectId();
            const products1 = json.products
              .filter(({ subcategory }) => subcategory === subId)
              .map(
                ({
                  title: prodTitle,
                  price: prodPrice,
                  status: prodStatus,
                  description: prodDescription,
                  images: prodImages,
                }: IBaseProduct): IProduct => {
                  const _productdId: mongoose.Types.ObjectId = mongoose.Types.ObjectId();
                  return {
                    _id: _productdId,
                    description: prodDescription,
                    images: prodImages,
                    name: prodTitle,
                    price: prodPrice,
                    status: prodStatus,
                    subCategory: _subId,
                  };
                }
              );
            products = [...products, ...products1];
            return { name: subTitle, _id: _subId, category: categoryId };
          });
        subCategories = [...subCategories, ...subcategories];
        return { name: title, _id: categoryId };
      }
    );
    await asyncFileWriter(
      `${__dirname}/json-products.json`,
      JSON.stringify(products, null, 4),
      'utf8'
    );
    await asyncFileWriter(
      `${__dirname}/json-categories.json`,
      JSON.stringify(categories, null, 4),
      'utf8'
    );
    await asyncFileWriter(
      `${__dirname}/json-sub-categories.json`,
      JSON.stringify(subCategories, null, 4),
      'utf8'
    );
    // tslint:disable-next-line:no-console
    console.log(categories);
    // tslint:disable-next-line:no-console
    console.log(subCategories);
    // tslint:disable-next-line:no-console
    console.log(products);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}
