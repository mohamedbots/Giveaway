module.exports = {
    name: 'edit',
    description: '🎉 Edit a giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to edit! (message ID)',
            type: 'STRING',
            required: true
        },
        {
            name: 'duration',
            description: 'The duration for the Giveaway!',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'How many winners for the new Giveaway!',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'Provide the Prize for the new Giveaway!',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_CHANNELS') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: "you don't have permissions",
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('giveaway');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        
        await interaction.deferReply({
         ephemeral: true
        })
        // Edit the giveaway
        try {
        await client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `unable to find giveaway for \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `Giveaway edited!`,
            ephemeral: true
        });
    }

};
