import express from "express";
import users from "./MOCK_DATA_USERS.json" assert { type: "json" };
import fs from "fs";

const app = express();
const PORT = 8000;

// Middleware-plugin
app.use(express.urlencoded({ extended: false }));

//this route will return HTML
app.get("/users", (req, res) => {
  const html = `
       <ul>
         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
       </ul>
    `;
  return res.send(html);
});

//REST API ENDPONTS
app.get("/api/users", (req, res) => {
  return res.json(users);
}); //get all users

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  return res.json(user);
});

app.post("/api/users", (req, res) => {
  console.log("requestbody===>>", req.body);
  const body = { ...req.body, id: users.length + 1 };

  users.push({ ...body });

  fs.writeFile("./MOCK_DATA_USERS.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.patch("/api/users/:id", (req, res) => {
  return res.json({ status: "Pending" });
});

app.delete("/api/users/:id", (req, res) => {
    console.log("DELETE", req.params);
    const id = Number(req.params.id);
    const updatedUsers = users.filter((user) => user.id !== id);
  
    fs.writeFile("./MOCK_DATA_USERS.json", JSON.stringify(updatedUsers), (err, data) => {
        console.log("Error===>>>", err)
        return res.json({ status: `Deleted user:${id}` });
      });
});

app.listen(PORT, () => console.log("Server started!!!!"));
