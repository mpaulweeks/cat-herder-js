import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('todo');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server started on port', port);
});
