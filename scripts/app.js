"use strict";
(function () {
    function AddContact(fullName, contactNumber, emailAddress) {
        var contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            var key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage() {
        console.log("Home Page Called");
        var xhr = new XMLHttpRequest();
        $("#AboutUsBtn").on("click", function () {
            LoadLink("about");
        });
        $("main").append("<p id=\"MainParagraph\" class=\"mt-3\" >This is the main paragraph</p>");
        $("body").append("<article>\n                    <p id=\"ArticleParagraph\" class=\"mt-3\"> This is my article paragraph</p></article>");
    }
    function DisplayProductPage() {
        console.log("Products Page Called");
    }
    function DisplayServicesPage() {
        console.log("Services Page Called");
    }
    function DisplayAboutUsPage() {
        console.log("About Us Page Called");
    }
    function validateField(input_field_id, regular_expression, error_message) {
        var fullNamePattern = regular_expression;
        var messageArea = $("#messageArea");
        $(input_field_id).on("blur", function () {
            var fullNameText = $(this).val();
            if (!fullNamePattern.test(fullNameText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        validateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid first and last name");
        validateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid contact number");
        validateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page Called");
        $("a[data=\"contact-list\"]").off("click");
        $("a[data=\"contact-list\"]").on("click", function () {
            LoadLink("contact-list");
        });
        ContactFormValidation();
        var sendButton = document.getElementById("sendButton");
        var subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckbox.checked) {
                var fullName = document.forms[0].fullName.value;
                var contactNumber = document.forms[0].contactNumber.value;
                var emailAddress = document.forms[0].emailAddress.value;
                var contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    var key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact List Page Called");
        if (localStorage.length > 0) {
            var contactList = document.getElementById("contactList");
            var data = "";
            var keys = Object.keys(localStorage);
            var index = 1;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var contactData = localStorage.getItem(key);
                var contact = new core.Contact();
                contact.deserialize(contactData);
                data += "<tr><th scope=\"row\" class=\"text-center\">".concat(index, "</th>\n                         <td>").concat(contact.FullName, "</td>\n                         <td>").concat(contact.ContactNumber, "</td>\n                         <td>").concat(contact.EmailAddress, "</td>\n                         \n                         <td class=\"text-center\">\n                            <button value=\"").concat(key, "\" class=\"btn btn-primary btn-sm edit\">\n                                <i class=\"fas fa-edit fa-sm\"></i> Edit\n                            </button>\n                         </td>\n                         \n                         <td class=\"text-center\">\n                            <button value=\"").concat(key, "\" class=\"btn btn-danger btn-sm delete\">\n                                <i class=\"fas fa-trash-alt fa-sm\"></i> Delete\n                            </button>\n                         </td>\n                         \n                         </tr>");
                index++;
            }
            contactList.innerHTML = data;
            $("#addButton").on("click", function () {
                LoadLink("edit", "add");
            });
            $("button.delete").on("click", function () {
                if (confirm("Delete contact, are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                LoadLink("contact-list");
            });
            $("button.edit").on("click", function () {
                LoadLink("edit", $(this).val());
            });
        }
    }
    function DisplayEditPage() {
        console.log("Edit Page");
        var page = router.LinkData;
        ContactFormValidation();
        switch (page) {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html("<i class=\"fas fa-plus-circle fa-sm\"></i> Add");
                $("#editButton").on("click", function (event) {
                    event.preventDefault();
                    var fullName = document.forms[0].fullName.value;
                    var contactNumber = document.forms[0].contactNumber.value;
                    var emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    LoadLink("contact-list");
                });
                $("#cancelButton").on("click", function () {
                    LoadLink("contact-list");
                });
                break;
            default:
                {
                    var contact_1 = new core.Contact();
                    contact_1.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact_1.FullName);
                    $("#contactNumber").val(contact_1.ContactNumber);
                    $("#emailAddress").val(contact_1.EmailAddress);
                    $("#editButton").on("click", function (event) {
                        event.preventDefault();
                        contact_1.FullName = $("#fullName").val();
                        contact_1.ContactNumber = $("#contactNumber").val();
                        contact_1.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact_1.serialize());
                        LoadLink("contact-list");
                    });
                }
                break;
        }
    }
    function DisplayLoginPage() {
        console.log("Loading Login Page");
        var messageArea = $("#messageArea");
        messageArea.hide();
        AddLinkEvents("register");
        $("#loginButton").on("click", function () {
            var success = false;
            var newUser = new core.User();
            $.get("./data/user.json", function (data) {
                for (var _i = 0, _a = data.user; _i < _a.length; _i++) {
                    var user = _a[_i];
                    var username = document.forms[0].username.value;
                    var password = document.forms[0].password.value;
                    if (username === user.Username && password === user.Password) {
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid credentials");
                }
            });
            $("#cancelButton").on("click", function () {
                document.forms[0].reset();
                LoadLink("home");
            });
        });
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html("<a id=\"logout\" class=\"nav-link\" data=\"logout\">\n            <i class=\"fas fa-sign-out-alt\"></i> Logout</a>");
        }
        $("#logout").on("click", function () {
            $("#login").html("<a class=\"nav-link\" data=\"login\">\n            <i class=\"fas fa-sign-in-alt\"></i> Login</a>");
            sessionStorage.clear();
            AddNavigationEvents();
            LoadLink("login");
        });
    }
    function DisplayRegisterPage() {
        console.log("Loading Registry Page");
        AddLinkEvents("login");
    }
    function Display404Page() {
        console.log("404 Page");
    }
    function ActiveLinkCallback() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutUsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "products": return DisplayProductPage;
            case "register": return DisplayRegisterPage;
            case "login": return DisplayLoginPage;
            case "edit": return DisplayEditPage;
            case "404": return Display404Page;
            default:
                console.error("Error: callback does not exist" + router.ActiveLink);
                return new Function;
        }
    }
    function CapitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function AuthGuard() {
        var protected_routes = ["contact-list"];
        if (protected_routes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }
    function LoadLink(link, data) {
        if (data === void 0) { data = ""; }
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = CapitalizeFirstLetter(router.ActiveLink);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $("li > a:contains(".concat(document.title, ")")).addClass("active");
        LoadContent();
    }
    function AddNavigationEvents() {
        var navlinks = $("ul>li>a");
        navlinks.off("click");
        navlinks.off("mouseover");
        navlinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        navlinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function AddLinkEvents(link) {
        var linkQuery = $("a.link[data=".concat(link, "]"));
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.on("click", function () {
            LoadLink("".concat(link));
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }
    function LoadHeader() {
        $.get("/views/components/header.html", function (html_data) {
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() {
        var page_name = router.ActiveLink;
        var Callback = ActiveLinkCallback();
        $.get("./views/content/".concat(page_name, ".html"), function (html_data) {
            $("main").html(html_data);
            CheckLogin();
            Callback();
        });
    }
    function LoadFooter() {
        $.get("/views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
        });
    }
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map