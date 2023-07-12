import { describe, it } from 'node:test';
import assert from 'node:assert';
import { fork } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

describe('worker_thread tests', () => {
  it('Should be able to execute worker thread with child_process', (t) => {
    const currentDirectory = dirname(fileURLToPath(import.meta.url));
    const cp = fork(`${currentDirectory}/child.js`);

    cp.send('Test');

    process.on('message', msg => {
      assert.equal(msg, 'Test')
    });
    t.skip()
  })
})
