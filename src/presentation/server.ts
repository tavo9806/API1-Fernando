import express, { Router } from 'express';
import path from 'path';

interface Options{
  port: number,
  publicPath?: string,
  routes: Router
}

export class Server {

  private app = express();
  private readonly port: number;
  private readonly  publicPath: string;
  private readonly routes: Router;

  constructor(options: Options){

    const {port, publicPath = "public", routes} = options;

    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }


  async start() {
    
    // Middlewares -> software que se ejecuta en cada ruta
    //* Public Folder
    this.app.use(express.static( this.publicPath ));


    //* Routes
    this.app.use( this.routes );


    // * Ruta no definida debe pasar por aqui
    // * SPA
    //Comodin en caso de usar app que usen algo similar a react router
    this.app.get('/{*splat}', (req,res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    })


    this.app.listen(this.port, () => {

      console.log(`Server running on port: http://localhost:${this.port}`);

    });

  }
};