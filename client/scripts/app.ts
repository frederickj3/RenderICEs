"use strict";
/**
 * Name: Josh Frederick
 * Date: January, 31 2023
 * File Name: app.ts
 * File Description: JavaScript file that holds functions
 */
//IIFE - Immediately Invoked Function Expressions
//AKA - Anonymous Self-Executing Function

(function(){

    /**
     * Instantiates a contact and stores in localStorage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName : string, contactNumber : string, emailAddress : string){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }


    function DisplayHomePage(){
        console.log("Home Page Called");

        let xhr = new XMLHttpRequest();

        $("#AboutUsBtn").on("click", () => {
           location.href = "about";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3" >This is the main paragraph</p>`);

        $("body").append(`<article>
                    <p id="ArticleParagraph" class="mt-3"> This is my article paragraph</p></article>`)


    }


    function DisplayProductPage(){
        console.log("Products Page Called");
    }
    function DisplayServicesPage(){
        console.log("Services Page Called");
    }
    function DisplayAboutUsPage(){
        console.log("About Us Page Called");
    }


    /**
     * This function will validate an input provided based on a given regular expression
     * @param {string} input_field_id
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function validateField(input_field_id : string, regular_expression : RegExp, error_message : string){
        let fullNamePattern = regular_expression;
        let messageArea = $("#messageArea");

        $(input_field_id).on("blur", function(){

            let fullNameText = $(this).val() as string;
            if(!fullNamePattern.test(fullNameText)) {
                // Fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else{
                // Pass validation
                messageArea.removeAttr("class").hide();

            }

        });
    }

    function ContactFormValidation(){
        validateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid first and last name"); // fullName
        validateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid contact number"); // contactNumber
        validateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address"); // emailAddress
    }

    function DisplayContactPage(){
        console.log("Contact Us Page Called");

        $(`a[data="contact-list"]`).off("click");
        $(`a[data="contact-list"]`).on("click", function(){
            location.href = "/contact-list";
        });


        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function(event){
            if(subscribeCheckbox.checked){

                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;

                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if(contact.serialize()){
                    let key = contact.FullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });

    }
    function DisplayContactListPage(){
        console.log("Contact List Page Called");

        $("a.delete").on("click", function(e){
            if(!confirm("Delete contact, are you sure?")){
                e.preventDefault();
                location.href = "/contact-list";
            }
        });
    }

    function DisplayEditPage(){
        console.log("Edit Page");
        ContactFormValidation();
    }

    function DisplayLoginPage(){
        console.log("Loading Login Page");


        let messageArea = $("#messageArea");
        messageArea.hide();



        $("#loginButton").on("click", function (){

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){

                for(const user of data.user){

                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;

                    if(username === user.Username && password === user.Password){
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    location.href = "/contact-list";
                }
                else{
                    // Failed the authentication
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid credentials");
                }
            });

            $("#cancelButton").on("click", function() {
                document.forms[0].reset();
                location.href = "/home";
            })


        });
    }

    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" data="logout">
            <i class="fas fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function(){
            $("#login").html(`<a class="nav-link" data="login">
            <i class="fas fa-sign-in-alt"></i> Login</a>`);

           sessionStorage.clear();

           // Redirect to login page
           location.href = "/login";
        });
    }

    function DisplayRegisterPage(){
        console.log("Loading Registry Page");
    }

    function Display404Page(){
        console.log("404 Page");
    }





    // Start function to call the methods listed above in a switch case on start up
    function Start(){
        console.log("App Started!")

        let page_id = $("body")[0].getAttribute("id");


        CheckLogin();

        switch(page_id){
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutUsPage();
                break;
            case "services":
                DisplayServicesPage()
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":

                DisplayContactListPage();
                break;
            case "products":
                DisplayProductPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "add":
                DisplayEditPage();
                break;
            case "edit":
                DisplayEditPage();
                break;
            case "404":
                Display404Page();
                break;
        }
    }
    window.addEventListener("load", Start)
    
})();