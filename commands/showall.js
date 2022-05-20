const Discord = require("discord.js");
const client = require('../index')
const fs = require("fs");
const express = require("express");
const db = require("quick.db");
const app = express();
const { setTimeout } = require('timers-promises');

module.exports = {
  name: "showall",
  aliases: [],
  usage: "",
  example: "",
  botperms: ['EMBED_LINKS', "MANAGE_CHANNELS"],
  group: "info",
  description: "Shows all channels",
  guildOnly: true
};


module.exports.run = async (client, message, args) => { 

    if (message.member.permissions.has("MANAGE_CHANNELS")) {
        message.guild.channels.cache.each((channel) => { 
           channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                    VIEW_CHANNEL: true
                    });
        });
      
        const embed = new Discord.MessageEmbed()
        .setTitle('**- Channels Showed**')
        .setDescription(`**Showed by : ${message.author.username}**`)
        .setColor('#03ffa0')
        .setFooter('Onex.')
        message.channel.send({ embeds: [embed] })
        


        }
        else {
          return message.reply({ content: "you don't have permissions" })
        }
        }
  