import express from 'express';
import path from 'path';

export interface Options {
  port: number,
  public_path?: string,
}

export class Server {
  private app = express();
  private port: number;
  private public_path: string;

  constructor(private options: Options){
    const {port, public_path = 'public'} = options;
    this.port = port;
    this.public_path = public_path;
  }

  async start(){
    //* Middlewares

    //* PublicFolder

    this.app.use(express.static(this.public_path));

    this.app.get('*', (req, res)=>{
      const filePath = path.join(__dirname, `../../${this.public_path}/index.html`)
      res.sendFile(filePath);
    })

    this.app.listen(this.port, ()=>{
      console.log(`Server running in port ${this.port}`)
    })
  }
}