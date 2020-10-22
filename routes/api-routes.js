const fs = require('fs');


module.exports = function (app) {
    //the server reads the json file and logs the data
    app.get("/api/notes", function(req, res) {

        const data = fs.readFileSync("./db/db.json", "utf8", function (err) {
            console.log(err);
        })
        const notes = JSON.parse(data);
        res.json(notes);
      });
    //the server reads the json file, adds the object, then writes the file again
    app.post("/api/notes", function (req, res) {
        const jsonData = fs.readFileSync("./db/db.json");
        const obj = JSON.parse(jsonData);
        obj.push(req.body);
        json = JSON.stringify(obj);
        fs.writeFileSync("./db/db.json", json);
        res.json(true);
    })
}