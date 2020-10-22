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
        let i=1;
        obj.forEach(function(element){
            element.id=i;
            i++;
        });
        const json = JSON.stringify(obj);
        fs.writeFileSync("./db/db.json", json);
        res.json(true);
    });
    // the id is retrieved and used to splice the note from the json file, then the file is created again
    app.delete("/api/notes/:id", function (req, res) {
        const noteId = req.params.id-1; //the id is one more than the actual index
        console.log(noteId);
        const jsonData = fs.readFileSync("./db/db.json");
        const obj = JSON.parse(jsonData);
        console.log(obj);
        obj.splice(noteId, 1);
        console.log(obj);
        const json = JSON.stringify(obj);
        fs.writeFileSync("./db/db.json", json);
        res.json(true);
    })
}