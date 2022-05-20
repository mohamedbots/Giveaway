const Discord = require("discord.js");
const client = require('../index')
const fs = require("fs");
const express = require("express");
const db = require("quick.db");
const app = express();
const { setTimeout } = require('timers-promises');

module.exports = {
  name: "hide",
  description: "Hides a channel",
};


module.exports.run = async (client, message, args) => {   
    
    const embed = new Discord.MessageEmbed()
    .setTitle('**- Channel Hided**')
    .setDescription(`**Hided by : ${message.author.username}**`)
    .setColor('#03ffa0')
    .setFooter('Onex.')

    let men = message.guild.roles.cache.find(role => role.name === '@everyone');
    if(!men) return;

    await interaction.channel.permissionOverwrites.edit(men,{ 'VIEW_CHANNEL': false });
    await interaction.reply({ embeds: [embed] });


}  