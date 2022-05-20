const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'start',
  description: '🎉 Starts a giveaway',

  options: [
    {
      name: 'duration',
      description: 'Provide the duration for the giveaway!',
      type: 'STRING',
      required: true
    },
    {
      name: 'winners',
      description: 'Provide the winners for the giveaway!',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'prize',
      description: 'Provide the prize for the giveaway!',
      type: 'STRING',
      required: true
    },
    {
      name: 'channel',
      description: 'Provide the channel to start the giveaway at!',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'bonusrole',
      description: 'Provide a role that will recieve a bonus!',
      type: 'ROLE',
      required: false
    },
    {
      name: 'bonusamount',
      description: 'Provide the amount of the bonus!',
      type: 'INTEGER',
      required: false
    },
    {
      name: 'invite',
      description: 'Provide the requirement server to enter the giveaway!',
      type: 'STRING',
      required: false
    },
    {
      name: 'role',
      description: 'Provide the requirement role to enter the giveaway!',
      type: 'ROLE',
      required: false
    },
  ],

  run: async (client, interaction) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_CHANNELS') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: "you don't have permissions",
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: 'Please select a channel!',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: 'Please select a valid duration!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: 'Please select a valid number of winners between `1-10`',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `you must specify ${bonusrole}`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.editReply({
          embeds: [{
            color: "#03ffa0",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Server Check!",
            url: "https://discord.gg/7MpdHUuX",
            description:
              "Join the server to do the Requirment",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Server Check"
            }
          }]
        })
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Only members has ${rolereq} are allowed to participate in the giveaway!`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Only members has ${rolereq} are allowed to participate in this giveaway!\n- Members are required to join [this server](${invite}) to participate in the giveaway!`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Members are required to join [this server](${invite}) to participate in this giveaway!`
    }


    // start giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayWinnerCount),
      // BonusEntries If Provided
      bonusEntries: [
        {
          // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      // Messages
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `Giveaway started in ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.MessageEmbed()
        .setAuthor(`Bonus Entries Alert!`)
        .setDescription(
          `**${bonusRole}** Has **${bonusEntries}** Extra Entries in this giveaway!`
        )
        .setColor("#03ffa0")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};
