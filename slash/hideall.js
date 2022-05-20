const Discord = require("discord.js");
const client = require('../index')
const fs = require("fs");
const express = require("express");
const db = require("quick.db");
const app = express();
const { setTimeout } = require('timers-promises');


module.exports = {
  name: "hideall",
  description: "Hides all channels",
};


module.exports.run = async (client, interaction) => { 

  if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
    return interaction.reply({
      content: "you don't have permissions",
      ephemeral: true
    });
  }


        interaction.guild.channels.cache.each((channel) => { 
           channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                    });
        });
      
        const embed = new Discord.MessageEmbed()
        .setTitle('**- Channels Hided**')
        .setDescription(`**Channels Hided by ${interaction.user}**`)
        .setColor('#03ffa0')
        .setFooter('Onex.')
        interaction.reply({ embeds: [embed] })


        }
        
  