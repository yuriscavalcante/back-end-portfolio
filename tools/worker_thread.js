import { fork } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const cp = fork(`${currentDirectory}/child.js`);

const mensagem = [{ messagem: [{ id: 1, name: 'Teste' }] }, { messagem: [{ id: 2, name: 'Teste' }] }, { messagem: [{ id: 3, name: 'Teste' }] }]

cp.on('message', msg => console.log('LENDO NO PARENT - ', msg));
cp.send(mensagem);
