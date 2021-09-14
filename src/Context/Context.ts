import * as fs from 'fs';
import * as afs from 'fs/promises';

const optionDefinitions = [
    { name: 'browser', alias: 'b', type: String },
    { name: 'hub', type: String },
    { name: 'environment', alias: 'e', type: String },
    { name: 'confroot', alias: 'c', type: String }
]
const commandLineArgs = require('command-line-args')


export class Context {
    static instnce: any;
    timestmp: number;
    options = commandLineArgs(optionDefinitions);
    confRoot: string;


    private constructor() {
        this.timestmp = Date.now();
        if (['dev', 'qa', 'uat'].indexOf(this.options.environment) < 0)
            throw new Error("Please provide environment: dev, qa or uat");
        if (this.options.confRoot === undefined) {
            this.confRoot = process.cwd() + "/etc/envs";
        }
        else {
            this.confRoot = this.options.root;
        }
        console.log(this.confRoot)
        this.loadConfig();


    };

    static getContext() {
        if (Context.instnce == null) {
            Context.instnce = new Context();
        }
        return Context.instnce;
    }

    showOptions() {
        console.log(this.options);
    }

    getOptions() {
        return this.options;
    }

    private mergeObjects(obj1:any, obj2:any) {
        let result:any  = {};
        Object.keys(obj1)
            .forEach(key => result[key] = obj1[key]);

        Object.keys(obj2)
            .forEach(key => result[key] = obj2[key]);
        return result
    }


    private loadConfsInFolder(folder: string):any {
        let filesList: string[];
        filesList = [];
        let list = fs.readdirSync(folder);
        let result = {};
        list.forEach(f => {
            let path = folder + "/" + f;
            if (fs.statSync(path).isFile()) {
                let jsonString = fs.readFileSync(path).toString();
                let obj = JSON.parse(jsonString);
                result = this.mergeObjects(result,obj);
            }
        });
        return result;

    }

    private loadConfig() {
        let envFlolder = this.confRoot + "/" + this.options.environment;
        let result = this.loadConfsInFolder(this.confRoot);
        result = this.loadConfsInFolder(envFlolder);
        result = this.mergeObjects(result, this.options);
        this.options = result;
        console.log(this.options);
    }
}

