const fs = require("fs");

//create a file synchronously using fs fn
// fs.writeFileSync("./TextFile.txt", "Hello File");

//async file create
// fs.writeFile("./TextFile.txt", "Hello File Async", (err) => {});


//sync file read
// const readFileSync = fs.readFileSync("./contacts.js", "utf-8");
// console.log(readFileSync)

//async file read
// fs.readFile("./contacts.js", "utf-8", (err, result) => {
//     if(err){
//         console.error("Error:", err)
//     }else{
//         console.log("result===>>", result)
//     }
// })


//append the changes to existing file
fs.appendFileSync("./TextFile.txt", `${Date.now()} Hey, There \n`)