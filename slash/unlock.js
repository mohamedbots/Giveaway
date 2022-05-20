const Discord = require("discord.js");
const client = require('../index')
const fs = require("fs");
const express = require("express");
const db = require("quick.db");
const app = express();
const { setTimeout } = require('timers-promises');

module.exports = {
  name: "unlock",
  description: "Unlocks a channel",
};



module.exports.run = async (client, interaction) => { 
    
  if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
    return interaction.reply({
      content: "you don't have permissions",
      ephemeral: true
    });
  }

  const embed = new Discord.MessageEmbed()
  .setTitle('**- Channel Hided**')
  .setDescription(`**Hided by  ${interaction.user}**`)
  .setColor('#03ffa0')
  .setFooter('Onex.')

  let men = interaction.guild.roles.cache.find(role => role.name === '@everyone');
  if(!men) return;

  await interaction.channel.permissionOverwrites.edit(men,{ 'SEND_MESSAGE': true });
  await interaction.reply({ embeds: [embed] });


}  