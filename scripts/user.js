"use strict";
var core;
(function (core) {
    var User = (function () {
        function User(displayName, emailAddress, username, password) {
            if (displayName === void 0) { displayName = ""; }
            if (emailAddress === void 0) { emailAddress = ""; }
            if (username === void 0) { username = ""; }
            if (password === void 0) { password = ""; }
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }
        Object.defineProperty(User.prototype, "DisplayName", {
            get: function () {
                return this.m_displayName;
            },
            set: function (displayName) {
                this.m_displayName = displayName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "EmailAddress", {
            get: function () {
                return this.m_emailAddress;
            },
            set: function (emailAddress) {
                this.m_emailAddress = emailAddress;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "Username", {
            get: function () {
                return this.m_username;
            },
            set: function (username) {
                this.m_username = username;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "Password", {
            get: function () {
                return this.m_password;
            },
            set: function (password) {
                this.m_password = password;
            },
            enumerable: false,
            configurable: true
        });
        User.prototype.toString = function () {
            return "Display Name: ".concat(this.DisplayName, "\n Email Address: ").concat(this.EmailAddress, "\n \n            Username: ").concat(this.Username);
        };
        User.prototype.toJSON = function () {
            return {
                "DisplayName": this.m_displayName,
                "EmailAddress": this.m_emailAddress,
                "Username": this.m_username
            };
        };
        User.prototype.fromJSON = function (data) {
            this.m_displayName = data.DisplayName;
            this.m_emailAddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        };
        User.prototype.serialize = function () {
            if (this.DisplayName != "" && this.EmailAddress != "" && this.Username != "" && this.Password) {
                return "".concat(this.DisplayName, ", ").concat(this.EmailAddress, ", ").concat(this.Username, ", ").concat(this.Password);
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        };
        User.prototype.deserialize = function (data) {
            var propertyArray = data.split(",");
            this.m_displayName = propertyArray[0];
            this.m_emailAddress = propertyArray[1];
            this.m_username = propertyArray[2];
            this.m_password = propertyArray[3];
        };
        return User;
    }());
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map