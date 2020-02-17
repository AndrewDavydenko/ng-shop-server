import * as fs from 'fs';
import * as util from 'util';
import * as mongoose from 'mongoose';

interface IBaseCategory {
  id: string;
  title: string;
  count: number;
  weight: number;
}

interface ICategory {
  _id: mongoose.Types.ObjectId;
  name: string;
}

const fileName = 'db-base.json';

main();

async function main() {
  try {
    const asyncFileReader = util.promisify(fs.readFile);
    const buffer: Buffer = await asyncFileReader(`${__dirname}/${fileName}`);
    const json = JSON.parse(buffer.toString()) as { categories: IBaseCategory[] };
    // tslint:disable-next-line:no-any
    const categories: ICategory[] =
      json.categories.map(({ title }: IBaseCategory): ICategory => {
        const _id: mongoose.Types.ObjectId = mongoose.Types.ObjectId();
        // TODO work with subcategory
        // json.subcategory
        return { name: title, _id };
      });
    // tslint:disable-next-line:no-console
    console.log(categories);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}
