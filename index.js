import server from './server';

const PORT = process.env.PORT || 2345;

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
