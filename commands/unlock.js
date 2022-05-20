const Discord = require("discord.js");
const client = require('../index')
const fs = require("fs");
const express = require("express");
const db = require("quick.db");
const app = express();
const { setTimeout } = require('timers-promises');

module.exports = {
  name: "unlock",
  aliases: [],
  usage: "",
  example: "",
  botperms: ['EMBED_LINKS', "MANAGE_CHANNELS"],
  group: "info",
  description: "Unlocks a channel",
  guildOnly: true
};


module.exports.run = async (client, message, args) => { 

    message.delete();   
    
    const embed = new Discord.MessageEmbed()
    .setTitle('**- Channel Unlocked**')
    .setDescription(`**Unlocked by : ${message.author.username}**`)
    .setColor('#03ffa0')
    .setFooter('Onex.')

    let men = message.guild.roles.cache.find(role => role.name === '@everyone');
    if(!men) return;

    await message.channel.permissionOverwrites.edit(men,{ 'SEND_MESSAGES': true });
    await message.channel.send({ embeds: [embed] });


  } 


  





  