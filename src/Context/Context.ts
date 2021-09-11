const optionDefinitions = [
    { name: 'browser', alias: 'b', type: String },
    { name: 'hub', type: String },
    { name: 'environment', alias: 'e', type: String }
  ]
const commandLineArgs = require('command-line-args')


export class Context {
    static instnce: any;
    timestmp: number;
    options = commandLineArgs(optionDefinitions)

    
    private constructor() {
        this.timestmp = Date.now();
        if (['dev','qa','uat'].indexOf(this.options.environment) < 0 ) 
        throw new Error("Please provide environment: dev, qa or uat");
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

    private static loadConfig() {

    }
}

