"use strict";

namespace core {
    export class Router {
        // public properties
        private m_activeLink : string;

        private m_linkData : string;

        private m_routingTable: string[];

        /**
         * @returns {string}
         */
        public get ActiveLink() : string{
            return this.m_activeLink;
        }

        /**
         * @param string
         */
        public set ActiveLink(link : string){
            this.m_activeLink = link;
        }
        public get LinkData() : string{
            return this.m_linkData;
        }

        public set LinkData(data : string){
            this.m_linkData = data;
        }


        // constructor
        public constructor(){
            this.m_activeLink = "";
            this.m_routingTable = [];
            this.m_linkData = "";

        }

        // public methods
        public Add(route : string) : void{
            this.m_routingTable.push(route);
        }

        public AddTable(routeTable : string[]) : void{
            this.m_routingTable = routeTable;
        }

        public Find(route : string) : number{
            return this.m_routingTable.indexOf(route);
        }

        public Remove(route : string) : boolean{
            if(this.Find(route) > -1){
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        // public override methods
        public toString() : string{
            return this.m_routingTable.toString();
        }

    }


}

let router : core.Router = new core.Router();

router.AddTable(
    [
        "/",
        "/home",
        "/about",
        "/services",
        "/contact",
        "/contact-list",
        "/products",
        "/register",
        "/login",
        "/edit"
    ]
)

let route : string = location.pathname;

router.ActiveLink = (router.Find(route) > -1) ? (route == "/")
                    ? "home" : route.substring(1)
                    : ("404");