module.exports = {
    name: "reroll",
    description: '🎉 Rerolls a giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to reroll (message ID or prize)',
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

        // try to find the giveaway with the provided prize OR with the ID
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

        if (!giveaway.ended) {
            return interaction.reply({
                content: `**Giveaway isn't ended yet!**`,
                ephemeral: true
            });
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageId)
            .then(() => {
                // Success message
                interaction.reply(`**Giveaway Rerolled!**`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};