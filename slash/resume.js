module.exports = {
    name: "resume",
    description: '▶ Resume a paused giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to resume (message ID or giveaway prize)',
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

        // try to find the giveaway with prize alternatively with ID
        const giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return interaction.reply({
                content: 'unable to find a giveaway for `' + query + '`.',
                ephemeral: true
            });
        }

        if (!giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: `**Giveaway isn't Paused**`,
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.unpause(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply(`**Giveaway resumed!**`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};