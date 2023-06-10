import { Server, Socket } from 'socket.io';
import { ACTIONS } from './constants';
import { WorkersPool } from '@master_kufa/tools';
import { SRConfig, SRTask, SRTaskResult } from './types';
import * as path from 'path';

const processPath = path.resolve('src', 'process.js');

console.log(processPath);

const io = new Server(3000);

const pool = new WorkersPool<SRTask, SRTaskResult>();

export const reply = (socket: Socket) => (res: SRTaskResult) => {
  console.log('reply', res);
  socket.emit(ACTIONS.recognize, res);
};

pool.planTask({
  processPath,
  callback: (config) => console.log(config),
  inputName: '1_srcCaller_tmp.wav',
  id: 'hSh0XTVm3b6woP_o-V2xa',
});

io.on('connection', (socket: Socket) => {
  socket.on(ACTIONS.recognize, (config: SRConfig) => {
    console.log('recognize', config);
    pool.planTask({ processPath, callback: reply(socket), ...config });
  });
});
