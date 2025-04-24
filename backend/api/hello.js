// api/hello.js
module.exports = (req, res) => {
  console.log('📬 hello.js hit');
  res.status(200).send('Hello from pure Vercel function');
};
