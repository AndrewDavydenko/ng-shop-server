import * as fs from 'fs';
import * as util from 'util';

const fileName = 'db-base.json';

main();

async function main() {
  try {
    const asyncFileReader = util.promisify(fs.readFile);
    const buffer: Buffer = await asyncFileReader(`${__dirname}/${fileName}`);
    const json = JSON.parse(buffer.toString());
    json.categories?.map((category: any) => {
      console.log(category);
    });
  } catch (err) {
    console.log(err);
  }
}

