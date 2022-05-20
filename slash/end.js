module.exports = {
    name: "end",
    description: '🎉 Ends a Giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to end! (message ID or giveaway prize)',
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

        const query = interaction.options.getString('giveaway');

        // fetching the giveaway with message Id or prize
        const giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway Id
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found with the corresponding input
        if (!giveaway) {
            return interaction.reply({
                content: 'unable to find giveaway for `' + query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'Giveawy has Already ended!',
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply(`**Giveaway has ended!**`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};