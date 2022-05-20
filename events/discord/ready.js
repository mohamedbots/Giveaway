const register = require('../../utils/slashsync');
module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });
  // Register slash commands - ( If you are one of those people who read the codes I highly suggest ignoring this because I am very bad at what I am doing, thanks LMAO )
  console.log(`[ / | Slash Command ] - ✅ Loaded all slash commands!`)
  let invite = `https://discord.com/api/oauth2/authorize?client_id=711056269699448863&permissions=8&scope=applications.commands%20bot`;
  console.log(`LOGGED IN AS ${client.user} BY MOHAMEDDDDDDD`);
  const activities = [`/help`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "PLAYING" });
  }, 20000);

};
