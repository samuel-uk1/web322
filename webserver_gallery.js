
/*
   WEB 322 Ass1 : Gallery
   
   Samuel Iloo

   
        

*/




var HTTP_PORT = process.env.PORT || 3000;

//app.use(express.urlencoded({ extended: false }));                                
var express = require('express') ;
var hbs = require('hbs') ;
var app = express() ;
const fs = require('fs');  


app.set('view engine', 'hbs')

app.use(express.json());                                                         
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 
app.use('/images', express.static('images'));


app.get('/', (req, res)=>{
    
    var current_images = './images';
    var images_names = [] ;

    fs.readdirSync(current_images).forEach(file => {
      console.log(file);
      images_names.push(file);
        
   });
    var curr_image = '/images/' +images_names[0] ;
    var image_source = {curr_image:curr_image, images_names:images_names } ;
 
    
    res.render('home_page', {image_data : image_source});
    
})

app.post("/", (req, res) => {                                                   
    var curr_image = "/images/" + JSON.parse(JSON.stringify(req.body.rdoImage));  // or use string() over json.parse to remove quotes                                 
    var current_images = './images/';
    var images_names = [] ;

    fs.readdirSync(current_images).forEach(file => {
      images_names.push(file);
   });
    console.log(curr_image)
    var image_source = {curr_image:curr_image, images_names:images_names ,image_paths:[] } ;
  
    res.render('response_page', {image_data : image_source});
    
     });

const server = app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});