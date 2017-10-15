import fs from "fs";
import postcss from "postcss";
import sass from "node-sass";
import syntax from 'postcss-scss';
import path from "path";
import glob from "glob";

import {getVariables} from "./postcss-processors/getVariables";
import {getOutputVariables} from "./postcss-processors/getOutputVariables";
import {processToJson} from "./postcss-processors/processToJson";
import {convertRemToPx} from "./postcss-processors/convertRemToPx";

const BASE_PATH = "./node_modules/@unumux/theme-coloniallife-default";
const FILES = glob.sync(BASE_PATH + "/**/*.scss");

const CONVERT_REM_TO_PX = true;

export async function generate(additionalFiles = []) {
    const processedFiles = await Promise.all([...FILES, ...additionalFiles].map(async (FILE) => {
        const scss = fs.readFileSync(FILE);
        
        const variablesScss = await postcss(getVariables({additionalImports: additionalFiles})).process(scss, { syntax: syntax });
        const variablesCss = await compileSass(variablesScss);
        const out = await convertToJson(variablesCss);
        return {
            filename: FILE,
            variables: out
        };
    }));

    return processedFiles;
}

function compileSass(sassData) {
    return new Promise((resolve, reject) => {
        sass.render({ data: sassData.toString() }, (err, result) => {
            if(err || !result || !result.css) return resolve("");

            resolve(result.css.toString());
        });
    });
}

function convertToJson(variablesCss) {
    return new Promise(async (resolve, reject) => {
        await postcss([getOutputVariables, CONVERT_REM_TO_PX && convertRemToPx, processToJson(function(out) {
            resolve(out);
        })]).process(variablesCss);
    })
}