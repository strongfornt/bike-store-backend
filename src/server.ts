import { Server } from 'http';
import app from './app';

import mongoose from 'mongoose';
import config from './app/config';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
   server = app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
      // console.log("Timestamp:", Math.floor(Date.now() / 1000));
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

main();


process.on('unhandledRejection', (reason,promise)=> {
  // console.log('unhandledRejection is detected, shutting down the server');
  console.log('unhandled rejection at',promise,'reason', reason)
  if(server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () =>  {
  console.log('uncaughtException is detected, shutting down the server');
  process.exit(1)
})



