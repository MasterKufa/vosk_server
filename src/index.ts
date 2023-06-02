import { Server, Socket } from 'socket.io';
import { ACTIONS } from './constants';
import { WorkersPool } from '@master_kufa/tools';
import { SRConfig, SRTask, SRTaskResult } from './types';
import * as path from 'path';

const processPath = path.resolve('.', 'process.js');

const io = new Server(3000);

const pool = new WorkersPool<SRTask, SRTaskResult>();

export const reply = (socket: Socket) => (res: SRTaskResult) =>
  socket.emit(ACTIONS.recognize, res);

io.on('connection', (socket: Socket) => {
  socket.on(ACTIONS.recognize, (config: SRConfig) =>
    pool.planTask({ processPath, callback: reply(socket), ...config }),
  );
});
