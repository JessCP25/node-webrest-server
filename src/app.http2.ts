import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
  key:fs.readFileSync('./keys/server.key'),
  cert:fs.readFileSync('./keys/server.crt'),
},(req, res)=>{
  console.log(req.url);

  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write(`<h1>Hola ${req.url}</h1>`)
  // res.end();

  // const user = {name: 'John Doe', age: 32, city: 'New York'};
  // res.writeHead(200, {'Content-type': 'application/json'});
  // res.end(JSON.stringify(user));

  if(req.url === '/'){
    const data = fs.readFileSync('./public/index.html', 'utf-8')
    res.writeHead(200, {'Content-type':  'text/html'});
    res.end(data);
    return;
  }

  if(req.url?.endsWith('.js')){
    res.writeHead(200, {'Content-type':'application/javascript'});
  }else if(req.url?.endsWith('.css')){
    res.writeHead(200, {'Content-type':'text/css'});
  }

  try {
    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
  } catch (error) {
    res.writeHead(404, {'Content-type': 'text/html'});
    res.end();
  }


})

server.listen(3000, ()=>{
  console.log('Server running on port 3000')
})