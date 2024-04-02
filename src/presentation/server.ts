import express from 'express';
import path from 'path';

export class Server {
  private app = express();

  async start(){
    //* Middlewares

    //* PublicFolder

    this.app.use(express.static('public'));

    this.app.get('*', (req, res)=>{
      const filePath = path.join(__dirname, '../../public/index.html')
      res.sendFile(filePath);
    })

    this.app.listen(3000, ()=>{
      console.log(`Server running in port ${3000}`)
    })
  }
}