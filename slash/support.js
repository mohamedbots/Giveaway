

const Discord = require("discord.js");
const client = require('../index')
const { MessageActionRow} = require('discord.js')
const fs = require("fs");
const express = require("express");
const db = require("quick.db");
const internal = require("stream");
const app = express();


module.exports = {
  name: "support",
  description: "Support Server",
};


module.exports.run = async (client, message, args) => { 
  
if (!message.guild.member(client.user).hasPermission("EMBED_LINKS"))
return Interaction.reply(
  `**i don't have permissions**`
)
if (message.author.bot || !message.guild) return;
let embed = new Discord.MessageEmbed().setDescription(`**Onex. Support Server
Click Below to join**`).setColor('#03ffa0')

const row2 = new MessageActionRow()
.addComponents(
    new Discord.MessageButton()
    .setLabel('Support Server')
    .setStyle('LINK')
   .setURL('https://discord.gg/X3GZz2aYEw'),
   )
  
  const me = await Interaction.reply({embeds: [embed], components: [row2]})
  
   const filter = async(button) => button.clicker.user.id == message.member.id
                  const collector = me.createButtonCollector(filter)
  
}