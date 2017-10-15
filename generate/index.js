import fs from "fs";

import React from "react";
import { renderToString } from "react-dom/server";


import {generate} from "./generate";

import {App} from "./client/App";

async function main() {
    const data = await generate();

    fs.writeFileSync("./src/data/theme-coloniallife-default.json", JSON.stringify(data));
}


main();

