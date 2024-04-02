import express from 'express';

export class Server {
  private app = express();

  async start(){
    //* Middlewares

    //* PublicFolder

    this.app.use(express.static('public'));

    this.app.listen(3000, ()=>{
      console.log(`Server running in port ${3000}`)
    })
  }
}