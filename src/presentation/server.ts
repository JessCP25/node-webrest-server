import express, { Router } from 'express';
import path from 'path';

export interface Options {
  port: number,
  routes: Router,
  public_path?: string,
}

export class Server {
  private app = express();
  private port: number;
  private public_path: string;
  private routes: Router;

  constructor(private options: Options){
    const {port,routes, public_path = 'public'} = options;
    this.port = port;
    this.routes = routes;
    this.public_path = public_path;
  }

  async start(){
    //* Middlewares

    //* PublicFolder

    this.app.use(express.static(this.public_path));

    // ROUTES
    this.app.use(this.routes);

    // SPA
    this.app.get('*', (req, res)=>{
      const filePath = path.join(__dirname, `../../${this.public_path}/index.html`)
      res.sendFile(filePath);
    })

    this.app.listen(this.port, ()=>{
      console.log(`Server running on port ${this.port}`)
    })
  }
}