const http = require('http');
const fs = require('fs');
const url = require('url');
const formidable = require('formidable');

const server = http.createServer((req, res) => {
    const baseURL = 'http://' + req.headers.host + '/';
    const reqURL = new URL(req.url, baseURL);

    var pathname = reqURL.pathname;
    console.log(pathname);

    if (pathname == '/atividade') 
    {
        var form = new formidable.IncomingForm();
        form.parse(req,(err,fields,files)=>{
            var x=fields.x;
            var y=fields.y;
            var z= fields.z;
            var modelo=fields.modelo;
            var resultado;
            if(modelo=="A")
            {
                soma = x*1 + y*1 + z*1;
                resultado = soma/3;
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.write("<h1>Resultado media aritimetica : " + resultado +"<h1>");
                res.end();
            } 
            else {
                if(modelo == "P")
                {
                    resultado = (x*1 + y*2 + z*3)/3
                    res.writeHead(200,{'Content-Type': 'text/html'});
                    res.write("<h1>Resultado media ponderada : " + resultado +"<h1>");
                    res.end();
                }
                else{
                    if(modelo == "H")
                    {
                        x1 = 1/x;
                        x2 = 1/y;
                        x3 = 1/z;
                        resultado = 3/(x1 + x2 + x3); 
                        res.writeHead(200,{'Content-Type': 'text/html'});
                        res.write("<h1>Resultado media harmonica : " + resultado +"<h1>");
                        res.end();
                    }
                    else
                    {
                        soma = x*1 + y*1 + z*1;
                        resultado = soma/3;
                        res.writeHead(200,{'Content-Type': 'text/html'});
                        res.write("<h1>Resultado media aritimetica : " + resultado +"<h1>");
                        res.end();
                    }
                }                
            }
        });
    }
    else
    {
        if (pathname == '/exercicio')
        {
            var form = new formidable.IncomingForm();
            form.parse(req,(err,fields,files)=>{
                var divisor = fields.x;
                var cont = 0;
                var resultado = "";
                while(cont < 10)
                {
                    resultado=resultado + divisor * (cont+1);
                    resultado=resultado +", ";
                    cont++;                  
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write("<h1>divisores: " + resultado +"<h1>");
                res.end();
            });
        }
        else
        {
            if (pathname == '/lista') 
            {
                var form = new formidable.IncomingForm();
                form.parse(req,(err,fields,files)=>{
                    var height = fields.height;
                    var lightning = fields.lightning;
                    var PI = 3.14;
                    var AB = 0;
                    var AL = 0;
                    var AT = 0;
                    var VL;

                    AB = PI * lightning * lightning;
                    VL = AB * height;
                    AL = 2 * PI * lightning * height;
                    AT = 2 * AB + AL;

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write("<h1>area total : " + AT +"<br><br> Volume : " + VL + "<h1>");
                    res.end();
                   
                });
            }
            else 
            {
                var dir = __dirname + '/provap1';
        
                fs.readFile(dir + pathname, (erro, content) => 
                {
                    if (erro) 
                    {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.write('Pagina Invalida');
                        res.end();
                    } else 
                    {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(content);
                        res.end();
                    }
                });
            }
        }
        
    } 
});

server.listen(3000);