const Discord = require("discord.js");
const client = require('../index')
const fs = require("fs");
const express = require("express");
const db = require("quick.db");
const app = express();
const { setTimeout } = require('timers-promises');


module.exports = {
  name: "hideall",
  aliases: [],
  usage: "",
  example: "",
  botperms: ['EMBED_LINKS', "MANAGE_CHANNELS"],
  group: "info",
  description: "Hides all channels",
  guildOnly: true
};


module.exports.run = async (client, message, args) => { 


    message.delete()
    if (message.member.permissions.has("MANAGE_CHANNELS")) {
        message.guild.channels.cache.each((channel) => { 
           channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                    });
        });
      
        const embed = new Discord.MessageEmbed()
        .setTitle('**- Channels Hided**')
        .setDescription(`**Hided by : ${message.author.username}**`)
        .setColor('#03ffa0')
        .setFooter('Onex.')
        message.channel.send({ embeds: [embed] })


        }
        else {
          return message.reply({ content: "you don't have permissions" })
        }
        }
  