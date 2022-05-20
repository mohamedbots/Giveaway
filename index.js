const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});
const fs = require("fs");
const config = require("./config.json");
const disbut = require('discord.js')
client.config = config;

// Initialise discord giveaways
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./storage/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#03ffa0",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `**🛑 Last chance to enter**`,
      threshold: 5000,
      embedColor: '#FF0000'
    }
  }
});
//Coded by ZeroSync on yt

/* Load all events (discord based) */


fs.readdir("./events/discord", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/discord/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]   ✅  Loaded: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
});

/* Load all events (giveaways based) */


// Let commands be a new collection ( message commands )
client.commands = new Discord.Collection();
/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props
    });
    console.log(`[Command] ✅  Loaded: ${commandName}`);
  });
});

// let interactions be a new collection ( slash commands  )
client.interactions = new Discord.Collection();
// creating an empty array for registering slash commands
client.register_arr = []
/* Load all slash commands */
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props)
  });
});


// Login through the client
client.login(config.token);
