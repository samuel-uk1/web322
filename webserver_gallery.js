
/*
   WEB 322 Ass1 : Gallery
   
   Samuel Iloo

   
        

*/




var HTTP_PORT = process.env.PORT || 3000;

//app.use(express.urlencoded({ extended: false }));                                
var express = require('express') ;
const exphbs = require('express-handlebars');
const path = require("path");
//var hbs = require('hbs') ;
var app = express() ;
const fs = require('fs');  


//app.set('view engine', 'hbs')
app.engine(".hbs", exphbs.engine({											
    extname: ".hbs",                                                   
    defaultLayout: false,
    layoutsDir: path.join(__dirname, "/views")
}));
app.set("view engine", ".hbs");   

app.use(express.json());                                                         
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 
app.use('/css', express.static('css')    );
app.use('/images', express.static('images')  );

const readline = require("linebyline");
const rl = readline("./images/images.txt");

var images_names = [] ;
var images_path = {};
var size=0;


 rl.on("line", (line, lineCount, byteCount) => {
        let cut = line.indexOf(".");
        let without_extentension=line.substr(0,cut)
        console.log(without_extentension);
        images_names.push(without_extentension);
        images_path[without_extentension]=line;
        size+=1;
     
    })
    .on("error", (err) => {
        console.error(err);
    });




app.get('/', (req, res)=>{
    
    
    var curr_image = '/images/' +images_path[images_names[0]] ;
    var image_source = {curr_image:curr_image, images_names:images_names } ;
 
    
    res.render('home_page', {image_data : image_source});
    
})

app.post("/", (req, res) => {      
   
    
     try {           // error parsing ; most likely no radio button selection
        var curr_image = "/images/" + images_path[JSON.parse(JSON.stringify(req.body.rdoImage)).trim()];  // or use string() over json.parse to remove quotes              
    }
     catch(err) {
        var curr_image = '/images/' +images_path[images_names[0]] ;

       }
  
   
    var image_source = {curr_image:curr_image, images_names:images_names } ;
  
    res.render('response_page', {image_data : image_source});
    
     });

const server = app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});