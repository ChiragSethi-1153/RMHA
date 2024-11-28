import 'reflect-metadata';
import { dataSource } from 'src/common/data-source';
import { runSeeders } from 'typeorm-extension';
const run = async () => {
  try {
    await dataSource.initialize();
    await runSeeders(dataSource);
    console.log('Seeders executed successfully');
  } catch (error) {
    console.log('error: ', error);
    console.error('Error executing seeders:', (error as Error).message);
  } finally {
    await dataSource.destroy();
  }
};

run().catch(error => console.error(error));
