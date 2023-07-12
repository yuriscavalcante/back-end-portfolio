process.on('message', msg => {
  if (!msg) return;

  console.log(msg)

  for (let i = 0; i < msg.length; i++) {
    const listen = msg[i];
    if (listen.messagem[0].id == msg.length) {
      console.log(listen.messagem.splice(1, i))
    }
  }

  process.send({
    teste: msg.length,
  });
});
