const fs = require("fs");
/**
 *
 * @param {Array} fileNames
 * @param {{file: string; key: string; value: any;}[]} data
 * @returns
 */
function generateIndex(fileNames){
    const imports =fileNames.map((file)=>{
        return `const ${file}Routes = require("./${file}")`
    })
    const routes=fileNames.map((file)=>{
        return `app.use("/${file}s", ${file}Routes)`
    })
    const indexFile=`const express=require("express")
${imports.join("\n")}
const app=express()
${routes.join("\n")}
module.exports=router`
    fs.writeFileSync("index.js",indexFile)
}
generateIndex(["user","product"])