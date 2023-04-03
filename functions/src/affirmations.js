import e from "express";
import dbConnect from "./dbConnect.js";

const db = dbConnect();
// post
export function addAffirmation(req, res) {
  const { text, author } = req.body;
  const newAffirmation = {
    text,
    author,
  };
  db.collection("affirmations")
    .add(newAffirmation)
    .then((doc) => {
      res
        .status(201)
        .send({ success: true, affirmation: { text, author, id: doc.id } });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
}
// getAll

export async function getAllAffirmations(req, res) {
  const collection = await db.collection("affirmations").get();
  const affirmations = collection.docs.map((doc) => doc.data());
  res.send(affirmations);
}
// get one
export async function getOneAffirmation(req, res) {
  const { author } = req.params;
  const collection = await db
    .collection("affirmations")
    .where("author", "==", author)
    .get();

  const affirmations = collection.docs.map((doc) => doc.data());
  res.send(affirmations);
}

// delete one
export async function deleteAffirmation(req, res) {
  const { id } = req.params;
  const collection = await db
    .collection("affirmations")
    .doc(id)
    .delete()
    .then(() => getAllAffirmations(req, res))
    .catch((err) => res.status(500).send({ error: err.message }));
}

//update
// export async function updateAffirmation(req, res) {
//     const { author } = req.body;
//     const { id } = req.params;
//     const c
// }
