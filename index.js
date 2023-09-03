const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json()); //middleware
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`)
);
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});
app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.lenght - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send("Done");
});

app.listen(5000, () => {
  console.log("App is running on port number 5000");
});
