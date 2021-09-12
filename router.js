import users from "./users.js";
import express from "express";
import bodyParser from "body-parser";
import user from "./Model/user.js";

function setup(app, port, mongoose) {
  app.use(express.json());
  app.listen(port, () => {
    mongoose;
    console.log(`App listening at http://localhost:${port}.`);
  });

  //Gibt alle Personen aus
  app.get("/", async (req, res) => {
    try {
      res.status(200).send(await user.find());
    } catch (error) {
      res.status(404).send("No Users found");
    }
  });

  //Gibt eine Person mit der jeweiligen ID aus
  app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const ret = await user.findById(id);
      res.status(200).send(ret);
    } catch (error) {
      res.status(404).send("No User found with this ID");
    }
  });

  //Erstelle eine Person
  app.post("/", async (req, res) => {
    const body = req.body;
    try {
      const ret = await user.create(body);
      res.status(201).send(ret);
    } catch (error) {
      res.status(204).send("Hesch öppis falsch gmacht");
    }
  });

  //Überschreibt eine Person
  app.put("/:id", async (req, res) => {
    var id = req.params.id;
    const body = req.body;
  
    // nur prüfung auf leeren Body nicht auf ungültige
    try {
      const ret = await user.findByIdAndUpdate( id ,  body ,{ new: true,overwrite:true} );
      console.log(ret)
      res.status(201).send(ret);
    } catch (error) {
      res.status(200).send(error);
    }
   
  });

  //Aktualisert eine Person
  app.patch("/:id",async (req, res) => {
    const id = req.params.id;
    const body = req.body;

     // nur prüfung auf leeren Body nicht auf ungültige
     try {
        const ret = await user.findByIdAndUpdate( id ,  body ,{ new: true} );
        console.log(ret)
        res.status(201).send(ret);
      } catch (error) {
        res.status(200).send(error);
      }
   
  });

  //Löscht eine Person
  app.delete("/:id",async (req, res) => {
    const id = req.params.id;
    try {
        const ret = await user.deleteOne( {_id: id} );
        console.log(ret)
        res.status(202).send(ret);
      } catch (error) {
        res.status(200).send(error);
      }
  });
}
// Export der funktionen
export default {
  setup,
};
