import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { readConfig } from '../src/config.js';
import { createApp } from '../src/server.js';

test('health identifies the deployed environment and unknown routes return 404', async (t) => {
  const server = createApp('test');
  t.after(
    () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  );
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const baseUrl = `http://127.0.0.1:${address.port}`;

  const health = await fetch(`${baseUrl}/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok', environment: 'test' });
  assert.equal((await fetch(`${baseUrl}/missing`)).status, 404);
});

test('invalid deployment configuration fails before the service starts', () => {
  assert.throws(() => readConfig({ APP_ENV: 'typo' }), /APP_ENV/);
  for (const port of ['', 'abc', '0', '65536', '3000.5']) {
    assert.throws(() => readConfig({ PORT: port }), /PORT/);
  }
  assert.throws(() => readConfig({ HOST: ' ' }), /HOST/);
});
