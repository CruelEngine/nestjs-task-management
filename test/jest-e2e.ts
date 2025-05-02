import { Config, runCLI } from 'jest';
import { dbSetup, stopDb } from './db-setup';

const jestConfig: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testEnvironment: 'node',
  testRegex: '(.*)?(test|spec|e2e-spec)\\.ts?$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  roots: ['<rootDir>/test'],
  modulePaths: ['<rootDir>'],
  coverageDirectory: './coverage/e2e',
  collectCoverage: true,
  maxWorkers: 1,
};

dbSetup().then(async () => {
    const { results } = await runCLI(jestConfig as any, ['.']);
    await stopDb();
}).catch(async (err) => {
  console.log(err);
  await stopDb();
});
