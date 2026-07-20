import express from "express";
// import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

// import userRouter from "./routes/users"
const app = express();
app.use(express.json());

// app.use(express.static("public"))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// app.set("view engine", "ejs");
// app.use(mrLogger)
// app.get("/", mrLogger, (req, res) => {
//   console.log("Here");
//   // res.download("src/index.ts")
//   // res.json({message:"Error"})

//   res.render("index.ejs", { text: "Goje" });
// });

// app.use('/users', userRouter)

interface User {
  name: string;
  password: string;
}

const users: User[] = [
  {
    name: "my dawg",
    password: "passwordthepassword",
  },
];

app.post("/users", async (req, res) => {
  // Authenticate user
  // const user: User = { name: req.body.name, password: req.body.password };
  try {
    // const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(salt)
    // console.log(hashedPassword)
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong"
    })
  }

  // console.log(users)

  // hash(salt + 'password')
});

app.post('/users', (req, res) => {
  res.json(users)
})
// const posts = [
//   {
//     username: "Goje",
//     title: "Post 1"
//   },
//   {
//     username: "Godwin",
//     title: "Post 2"
//   }
// ]

// app.get('/posts', (req, res)=> {res.json(posts)})

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (!user) {
    return res.status(400).send("Cannot find user")
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)){
      res.send('Success')
    }else{
      res.send('Not Allowed')
    }
  } catch (error) {
    res.status(500).send()
  }
});

// function mrLogger(req, res, next){
//   console.log(req.originalUrl)
//   next()
// }
app.listen(3000);
