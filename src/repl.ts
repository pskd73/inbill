import * as repl from "repl";
import {transform} from "babel-core";
import {NestFactory} from "@nestjs/core";
import {ApplicationModule} from "./modules/app.module";
import {Module} from "@nestjs/core/injector/module";
import {InvoiceService} from "./invoice/InvoiceService";
import {StoreService} from "./store/StoreService";
import {ProductService} from "./product/ProductService";

function preprocess(input) {
    const awaitMatcher = /^(?:\s*(?:(?:let|var|const)\s)?\s*([^=]+)=\s*|^\s*)(await\s[\s\S]*)/;
    const asyncWrapper = (code, binder) => {
        let assign = binder ? `global.${binder} = ` : '';
        return `(function(){ async function _wrap() { return ${assign}${code} } return _wrap();})()`;
    };

    // match & transform
    const match = input.match(awaitMatcher);
    if (match) {
        input = `${asyncWrapper(match[2], match[1])}`;
    }
    return input;
}

function myEval(cmd, context, filename, callback) {
  const code = transform(preprocess(cmd), {
      presets: ['es2015', 'stage-0'],
      plugins: ["transform-runtime"]
  }).code;
  _eval(code, context, filename, callback);
}

const replInstance = repl.start({prompt: 'inbill> '});
const _eval = (replInstance as any).eval;
(replInstance as any).eval = myEval;
replInstance.context.init = async () => {
  const app = await NestFactory.create(ApplicationModule);
  const modules: Set<Module> = (app as any).container.modules;
  const serviceNames: string[] = [InvoiceService.name, StoreService.name, ProductService.name];
  modules.forEach(module => {
    module.components.forEach(component => {
      if(serviceNames.indexOf(component.name) !== -1) {
        replInstance.context[component.name] = component.instance;
      }
    });
  });
};