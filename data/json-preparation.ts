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
}

interface IJsonData {
  categories: IBaseCategory[];
  subcategories: IBaseSubcategory[];
}

const fileName = 'db-base.json';

main();

async function main() {
  try {
    const asyncFileReader = util.promisify(fs.readFile);
    const buffer: Buffer = await asyncFileReader(`${__dirname}/${fileName}`);
    const json: IJsonData = JSON.parse(buffer.toString()) as IJsonData;
    let subCategories: ISubCategory[] = [];
    const products: IProduct[] = [];
    const categories: ICategory[] = json.categories.map(
      ({ title, id }: IBaseCategory): ICategory => {
        const categoryId: mongoose.Types.ObjectId = mongoose.Types.ObjectId();
        // subCategories
        const subcategories = json.subcategories
          .filter(({ category }) => id === category)
          .map(({ title: subTitle }: IBaseSubcategory) => {
            const _subId: mongoose.Types.ObjectId = mongoose.Types.ObjectId();
            return { name: subTitle, _id: _subId, category: categoryId };
          });
        subCategories = [...subCategories, ...subcategories];
        return { name: title, _id: categoryId };
      }
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
