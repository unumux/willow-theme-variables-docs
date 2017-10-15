import fs from "fs";

import React from "react";
import { renderToString } from "react-dom/server";


import {generate} from "./generate";

import {App} from "./client/App";

async function main() {
    const data = await generate();
    const reactData = renderToString(<App data={data} />);

    fs.writeFileSync("./index.html", reactData);
}


main();

