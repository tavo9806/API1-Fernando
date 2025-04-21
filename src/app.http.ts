import fs from 'fs';
import http from 'http';

const PORT = 3000;

const server = http.createServer( (req,res) => {

  console.log(req.url);


  // res.writeHead(200, {"content-type": "text/html"});
  // res.write(`<h1>${req.url}<h1/>`);
  // res.end();

  // const data = {name: 'John Doe', Age: 30, city: 'New York'};
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify(data));


  if(req.url === "/"){

    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });

    
    res.end(htmlFile)
    return;
  } 


  if(req.url?.endsWith('.js')){
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  } else if(req.url?.endsWith('.css')){
    res.writeHead(200, { 'Content-Type': 'text/css' });
  }

  const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
  res.end(responseContent);

});


server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})