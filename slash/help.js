const Discord = require('discord.js');
const disbut = require("discord.js");
const { MessageMenuOption, MessageMenu, MessageActionRow, MessageSelectMenu} = require("discord.js");


module.exports = {
  name: "help",
  description: 'Onex Help menu',
  run: async (client, interaction) => {
      //--------------------------------------S T A R T---------------------------------------
      const embed = new Discord.MessageEmbed()
      .setTitle('Onex Help Menu.')
       .setURL(
         `https://discord.com/api/oauth2/authorize?client_id=711056269699448863&permissions=8&scope=applications.commands%20bot`)
       .setThumbnail(client.user.displayAvatarURL())
       .setFooter(client.user.username, client.user.displayAvatarURL())
       .setImage(``)
       .setDescription(`**Onex. Help List
       Click Below For the help menu!**`)
       .setColor('#03ffa0')

        const embed1 = new Discord.MessageEmbed()
        .setTitle('Public Commands Commands')
                              .addField(`**$support**`,"`/` Onex. Support Server")
                              .addField(`**$user**`,"`/` Shows user's Info")
                              .addField(`**$invite**`,"`/` Invite Onex.")
                              .addField(`**$botinfo**`,"`/` Shows Onex. Info")
                              .addField(`**$ping**`,"`/` Shows the bot latency")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(`#03ffa0`);

        const embed2 = new Discord.MessageEmbed()
      .setTitle('Giveaway Commands')
                    .addField(`**$start**`,"`/` starts a giveaway")
                    .addField(`**$reroll**`,"`/` rerolls the winners")
                    .addField(`**$edit**`,"`/` edits a giveaway")
                    .addField(`**$end**`,"`/` ends a giveway")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(`#03ffa0`);


      const embed3 = new Discord.MessageEmbed()
      .setTitle('Adminstration Commands')
      .addField(`**$lock**`, "`/`locks a channel")
      .addField(`**$unlock**`, "`/`unlocks a channel")
      .addField(`**$hide**`, "`/`hides a channel")
      .addField(`**$show**`, "`/`shows a channel")
      .addField(`**$hideall**`, "`/`hides all channels")
      .addField(`**$showall**`, "`/`shows all channels")

      .setThumbnail(client.user.displayAvatarURL())
      .setColor(`#03ffa0`);

      const embed4 = new Discord.MessageEmbed()
      .setTitle('About Us')
      .addField(`**Onex. is a Bot thats helps you by hosting giveaways!
Support Server: https://discord.gg/pUCZTUNyNx**`, "Onex.")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(`#03ffa0`);


        //-----------------------------OPTIONS----------------------


        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('selector')
                .setPlaceholder('Onex help menu.')
                .addOptions([
                    {
                        label: 'Public Commands',
                        value: 'option1',
                        emoji: '<:OnexPPL:976944298337652806>',
                    },
                    {
                        label: 'Giveaway Commands',
                        value: 'option2',
                        emoji: '<:OnexGive:976887503233642547>',
                        
                                    },
                    { 
                        label: 'Adminstration Commands',
                        value: 'option3',
                        emoji: '<:OnexSystem:976989416046354522>',
                    },
                    {
                        label: 'About',
                        description: 'About us',
                        value: 'option4',
                        emoji: '<:OnexAbout:976944672800931930>',
                    },
                ]),
        );

        const row2 = new MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel('Support Server')
            .setStyle('LINK')
           .setURL('https://discord.gg/X3GZz2aYEw'),

           new Discord.MessageButton()
           .setLabel('Invite Onex.')
            .setStyle('LINK')
           .setURL('https://discord.com/api/oauth2/authorize?client_id=711056269699448863&permissions=8&scope=applications.commands%20bot')
        )

        

  const Sendmenu = await interaction.reply({embeds: [embed], components: [row, row2]})
    
        //-----------------------------OPTIONS----------------------

        client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
        
            if (interaction.values[0] === "option1") {
                await interaction.update({ embeds: [embed1], components: [row, row2] });
            }
        });

        
        client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
        
            if (interaction.values[0] === "option2") {
                await interaction.update({ embeds: [embed2], components: [row, row2] });
            }
        });

        
        client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
        
            if (interaction.values[0] === "option3") {
                await interaction.update({ embeds: [embed3], components: [row, row2] });
            }
        });

        
        client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
        
            if (interaction.values[0] === "option4") {
                await interaction.update({ embeds: [embed4], components: [row, row2] });
            }
        });


    }
  };  