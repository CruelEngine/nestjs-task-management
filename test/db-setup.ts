import { StartedTestContainer, TestContainer } from 'testcontainers';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

let startedTestContainer: StartedTestContainer;
export const dbSetup = async () => {
  const username = 'postgres';
  const password = 'postgres';
  const databseName = 'taskmanagement';

  const IMAGE = 'postgres:14.17';

  const container: TestContainer = new PostgreSqlContainer(IMAGE)
    .withExposedPorts({
      container: 5432,
      host: 5432,
    })
    .withUsername(username)
    .withPassword(password)
    .withDatabase(databseName);

  try {
    startedTestContainer = await container.start();
  } catch (err) {
    await startedTestContainer.stop();
  }
};

export const stopDb = async () => {
  await startedTestContainer.stop();
};
