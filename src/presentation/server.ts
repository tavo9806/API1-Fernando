import express from 'express';
import path from 'path';

interface Options{
  port: number,
  publicPath?: string
}

export class Server {

  private app = express();

  private readonly port: number;
  private readonly  publicPath: string;

  constructor(options: Options){

    const {port, publicPath = "public"} = options;

    this.port = port;
    this.publicPath = publicPath;
  }


  async start() {
    
    // Middlewares -> software que se ejecuta en cada ruta
    // Public folder
    this.app.use(express.static( this.publicPath ));


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