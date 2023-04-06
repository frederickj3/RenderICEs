import express from 'express';
const router = express.Router();
import Contact from '../models/contact';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName : '' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName : '' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page: 'about', displayName : '' });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page: 'contact', displayName : '' });
});


router.get('/contact-list', function(req, res, next) {
  Contact.find().then(function(data){
    //console.log(contacts);
    res.render('index', {title: 'Contact List', contacts: data, page: 'contact-list',
                                                                          displayName : ''});
  }).catch(function(err){
    console.error("Encountered an Error reading from the Database " + err);
    res.end();
  });

});



router.get('/edit/:id', function(req, res, next) {

  let id = req.params.id;

  Contact.findById(id).then(function(){
    res.render('index', { title: 'Edit', page: 'edit', contact : Contact ,displayName : '' });
  }).catch(function(err){
    console.error("Encountered an Error reading contact from the Database " + err);
    res.end();
  });


});


router.get('/add', function(req, res, next) {
  res.render('index', { title: 'Add', contact: '', page: 'edit', displayName : '' });
});


router.post('/add', function(req, res, next) {


  let newContact = new Contact({
    "FullName" : req.body.fullName,
    "ContactNumber" : req.body.contactNumber,
    "EmailAddress" : req.body.emailAddress
  });

  Contact.create(newContact).then(function(){
    res.redirect("/contact-list");
  }).catch(function(err){
    console.error("Encountered an Error updating contact to the Database " + err);
    res.end();
  });


});



router.get('/delete/:id', function(req, res, next) {

  let id = req.params.id;

  Contact.deleteOne({_id : id}).then(function(){
    res.redirect("/contact-list");
  }).catch(function(err){
    console.error("Encountered an Error deleting contact from the Database " + err);
    res.end();
  });


});

router.post('/edit/:id', function(req, res, next) {

  let id = req.params.id;

  let updateContact = new Contact({
    "_id" : id,
    "FullName" : req.body.fullName,
    "ContactNumber" : req.body.contactNumber,
    "EmailAddress" : req.body.emailAddress
  });

  Contact.updateOne({_id : id}, updateContact).then(function(){
    res.redirect("/contact-list");
  }).catch(function(err){
    console.error("Encountered an Error updating contact to the Database " + err);
    res.end();
  });


});




router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page: 'login', displayName : '' });
});



router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products', page: 'products', displayName : '' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page: 'register', displayName : '' });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', page: 'services', displayName : '' });
});


export default router;
