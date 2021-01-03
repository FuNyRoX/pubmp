const Discord = require("discord.js");
con = console.log;
figlet = require("figlet");
colors = require("colors");
readline = require("readline");
client = new Discord.Client({
  fetchAllMembers: true
});
sleep = require("system-sleep");
client.login(`NzkxMjg3NjcwOTMxNzE4MTY1.X-M-Eg.iAQOqMtJASs07DavPnQGPmgQk4o`);

function getNow(strType) {
  let strReturn = "";
  switch (strType) {
    case "date":
      strReturn = new Date().toLocaleString("fr-FR", {
        timeZone: "Europe/Paris",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      });
      break;
    case "time":
      strReturn = new Date().toLocaleString("fr-FR", {
        timeZone: "Europe/Paris",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      break;
    case "datetime":
      strReturn = new Date()
        .toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
          hour12: false,
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
        .replace(",", "");
      break;
  }
  return strReturn;
}

client.on("ready", () => {
  con(`
Username : ${client.user.username}
Discriminator : ${client.user.discriminator}
Tag : ${client.user.tag}
Date de création : ${client.user.createdAt}

Nombre de serveurs : ${client.guilds.size}
Nombre de membres : ${client.users.size}

Liste des serveurs : 
${client.guilds.map(g => g.name)}
`);
  let mpstreaming = 0;
  setInterval(function() {
    if (mpstreaming === 0) {
      client.user.setActivity(`${client.guilds.size} serveurs・Kiddu `, {
        type: "Streaming",
        url: "https://www.twitch.tv/jlfunyrox"
      });
      mpstreaming = 1;
    } else if (mpstreaming === 1) {
      client.user.setActivity(`${client.users.size} membres・Kiddu`, {
        type: "Streaming",
        url: "https://www.twitch.tv/jlfunyrox"
      });
      mpstreaming = 2;
    } else if (mpstreaming === 2) {
      client.user.setActivity(`${client.user.tag}・Kiddu`, {
        type: "Streaming",
        url: "https://www.twitch.tv/jlfunyrox"
      });
      mpstreaming = 0;
    }
  }, 10 * 1000);
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

var guildnumber = 1;
client.on("message", async message => {
  if(message.author.id != "717748135258226698") return;
  if (message.content === "$serveur") {
    guildnumber = 0;
    const embed = new Discord.RichEmbed()
      .setAuthor(`${client.user.tag}・FuNyRoX`, client.user.displayAvatarURL)
      .setDescription(
        `**Liste des Serveurs :**`)
      .setFooter(
        `Commande réclamé par ${message.author.tag} (${message.author.id})`
      );
      client.guilds.map(
        p => {
          embed.addField("・" +
          p.name +
          " | `" +
          p.id + "`",
          `**Nombre de membre :** ` +
          "`" +
          p.memberCount +
          " membres`\n");
        });

    message.channel.send(embed);
  }
  if (message.content.startsWith("$dm")) {
    const partner = client.emojis.find(emoji => emoji.name === "nerd");
    const star = client.emojis.find(emoji => emoji.name === "nerd");
    const x = client.emojis.find(emoji => emoji.name === "nerd");
    const valid = client.emojis.find(emoji => emoji.name === "nerd");
    var args = message.content.slice(4);
    if (!args)
      return message.channel.send(
        "`" +
          getNow("time") +
          "`" +
          ` ${x} ID non valide, veuillez reformulé votre demande`
      );
    let guild = client.guilds.get(args);
    if (!guild) return;
    var msg =
      `**Join = Free Nitro |** https://discord.gg/KusbJaz5c6` +
      "\n \n `" +
      uuidv4() +
      "`";
    message.channel.send(
      "`" +
        getNow("time") +
        "`" +
        ` :e_mail: Publicité envoyé a **${guild.memberCount} membres** (900 millesecondes/UUID)`
    );
    var pub = 0;
    guild.members.forEach(member => {
      sleep(440);
      if (member.id == client.user.id)
        return (
          pub++ &&
          console.log(
            `[${getNow("time")}][LOGS] Erreur rencontré (Cause : BOT): ${
              member.user.tag
            } (ID : ${member.user.id}) - Avancement : ${pub}/${guild.memberCount}`
              .blue
          )
        );
      member
        .send(`${msg}`)
        .then(m => {
          pub++;
          console.log(
            `[${getNow("time")}][LOGS] Message envoyé à : ${
              member.user.tag
            } (ID : ${member.user.id}) - Avancement : ${pub}/${guild.memberCount}`
              .green
          );
          if (pub === guild.memberCount) {
            message.channel.send(
              "`" +
                getNow("time") +
                "`" +
                ` ${valid} Publicité terminé a un total de **${guild.memberCount} membres**`
            );
          }
        })
        .catch(err => {
          pub++;
          if (pub > guild.memberCount) {
            message.channel.send(`Pub terminé [2]`);
          }
          console.log(
            `[${getNow("time")}][LOGS] Erreur rencontré (Cause : MP CLOSED): ${
              member.user.tag
            } (ID : ${member.user.id}) - Avancement: ${pub}/${guild.memberCount}`
              .red
          );
        });
    });
    return;
  }
});