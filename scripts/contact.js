"use strict";
var core;
(function (core) {
    var Contact = (function () {
        function Contact(fullName, contactNumber, emailAddress) {
            if (fullName === void 0) { fullName = ""; }
            if (contactNumber === void 0) { contactNumber = ""; }
            if (emailAddress === void 0) { emailAddress = ""; }
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }
        Object.defineProperty(Contact.prototype, "FullName", {
            get: function () {
                return this.m_fullName;
            },
            set: function (fullName) {
                this.m_fullName = fullName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "ContactNumber", {
            get: function () {
                return this.m_contactNumber;
            },
            set: function (contactNumber) {
                this.m_contactNumber = contactNumber;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "EmailAddress", {
            get: function () {
                return this.m_emailAddress;
            },
            set: function (emailAddress) {
                this.m_emailAddress = emailAddress;
            },
            enumerable: false,
            configurable: true
        });
        Contact.prototype.toString = function () {
            return "Full Name: ".concat(this.FullName, "\n Contact Number: ").concat(this.ContactNumber, "\n Email Address: ").concat(this.EmailAddress);
        };
        Contact.prototype.serialize = function () {
            if (this.FullName != "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return "".concat(this.FullName, ", ").concat(this.ContactNumber, ", ").concat(this.EmailAddress);
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        };
        Contact.prototype.deserialize = function (data) {
            var propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
        };
        return Contact;
    }());
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map