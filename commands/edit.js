  module.exports.run = async (client, message) => {
  const Discord = require("discord.js");
  const ms = require("ms");
  let time = "";
  let winnersCount;
  let prize = "";
  let giveawayx = "";
  let embed = new Discord.MessageEmbed()
    .setTitle("Edit A Giveaway!")
    .setColor('#03ffa0')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
  const msg = await message.reply({
    embeds:
      [embed.setDescription(
        "Provide the new Giveaway's Message, within 30 Seconds.**"
      )]
  }
  );
  let xembed = new Discord.MessageEmbed()
    .setTitle("Timeout ended. 🕖")
    .setColor("#03ffa0")
    .setDescription('💥 you took too much time editing, please reuse the edit command.')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();

  const filter = m => m.author.id === message.author.id && !m.author.bot;
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  });

  collector.on("collect", async collect => {

    const response = collect.content;
    let gid = BigInt(response).toString()
    await collect.delete()
    if (!gid) {
      return msg.edit({
        embeds: [
          embed.setDescription(
            "looks like you didn't provide a valid message id!"
          )]
      }
      );
    } else {
      collector.stop(
        msg.edit({
          embeds: [
            embed.setDescription(
              `Provide a new Winners count, within 30 Seconds.**`
            )]
        }
        )
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {

      let mss = ms(collect2.content);
      await collect2.delete()
      if (!mss) {
        return msg.edit({
          embeds: [
            embed.setDescription(
              "Please provide a valid duration!**"
            )]
        }
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit({
            embeds: [
              embed.setDescription(
                `How many winners will be in the giveaway**`
              )]
          }
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {

        const response3 = collect3.content.toLowerCase();
        await collect3.delete()
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit({
            embeds: [
              embed.setDescription(
                "Winners must be a number between `1-10`"
              )]
          }
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Provide the new Prize, within 30 Seconds**`
                )]
            }
            )
          );
        }
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          prize = response4;
          await collect4.delete()
          collector4.stop(
            console.log(giveawayx),
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Edited`
                )]
            }
            )
          );
          client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
          })
        });
      });
    });
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
      message.reply({ embeds: [xembed] });
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.reply({ embeds: [xembed] });

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    })
  } catch (e) { }
}
