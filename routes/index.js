"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var contact_1 = __importDefault(require("../models/contact"));
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});
router.get('/contact-list', function (req, res, next) {
    contact_1.default.find().then(function (data) {
        res.render('index', { title: 'Contact List', contacts: data, page: 'contact-list',
            displayName: '' });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the Database " + err);
        res.end();
    });
});
router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    contact_1.default.findById(id).then(function () {
        res.render('index', { title: 'Edit', page: 'edit', contact: contact_1.default, displayName: '' });
    }).catch(function (err) {
        console.error("Encountered an Error reading contact from the Database " + err);
        res.end();
    });
});
router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add', contact: '', page: 'edit', displayName: '' });
});
router.post('/add', function (req, res, next) {
    var newContact = new contact_1.default({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.create(newContact).then(function () {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("Encountered an Error updating contact to the Database " + err);
        res.end();
    });
});
router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    contact_1.default.deleteOne({ _id: id }).then(function () {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("Encountered an Error deleting contact from the Database " + err);
        res.end();
    });
});
router.post('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    var updateContact = new contact_1.default({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.updateOne({ _id: id }, updateContact).then(function () {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("Encountered an Error updating contact to the Database " + err);
        res.end();
    });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', displayName: '' });
});
router.get('/products', function (req, res, next) {
    res.render('index', { title: 'Products', page: 'products', displayName: '' });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: '' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Services', page: 'services', displayName: '' });
});
exports.default = router;
//# sourceMappingURL=index.js.map