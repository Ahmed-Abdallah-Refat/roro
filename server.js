const Discord = require("discord.js");
const client = new Discord.Client();
const http = require("http");
const express = require("express");
const app = express();
const math = require("mathjs");
const roundTo = require("round-to");
const opus = require("node-opus");
const sodium = require("sodium");
const box = new sodium.Box();
const request = require("request");
var fs = require("fs");
var prefix = "!";
/*
{addr:"",
 name:""
}
*/
  let embed = new Discord.RichEmbed();
client.on("message", message => {
 if (message.content.startsWith(prefix + "invite")){
    embed.setAuthor(`Invite Radio BOT to your Server`);
    embed.setDescription('Enjoy wit Radio ``BOT``')
    embed.setURL('https://discord.com/oauth2/authorize?client_id=696381385568419931&permissions=36756736&scope=bot')
    embed.setTitle('Invite Link')
    embed.setColor('#36cfec')
    embed.setFooter('Created by Ahmed Fury#7700');
    message.author.send(embed)
}
});

var streamList = {
  quran: [
    {
      addr: "http://66.45.232.131:9994/;stream.mp3",
      name: "``إذاعة القرآن الكريم 🎙``"
    }
      ],
 q: [
    {
      addr: "http://www.emanlive.com:8000/",
      name: "إذاعة صوت الإيمان"
    }
  ],
  q1: [
    {
      addr: "http://live.mp3quran.net:9956/",
      name: "إذاعة الشيخ صديق المنشاوي"
    }
  ],
  q2: [
    {
      addr: "http://live.mp3quran.net:9858/",
      name: "إذاعة الشيخ عبدالله المطرود"
    }
  ],
  q3: [
    {
      addr: "http://live.mp3quran.net:9988/",
      name: "إذاعة الشيخ عبدالرحمن السديس"
    }
    ],
  q4: [
    {
      addr: "http://live.mp3quran.net:9726/",
      name: "إذاعة الشيخ عبدالرحمن المجد"
    }
  ],
  nogoum: [
    {
      addr: "http://ice31.securenetsystems.net/NOGOUM",
      name: "``Nogoum FM``"
    }
  ],
  "9090": [
    {
      addr: "http://9090streaming2.mobtada.com/9090FMEGYPT",
      name: "``Radio 9090``"
    }
  ],
  q5: [
    {
      addr: "http://live.mp3quran.net:9868/",
      name: "الشيخ عبدالبارئ محمد``د``"
    }
  ],
  q6: [
    {
      addr: "http://178.33.178.204:9322/;",
      name: "``Cairo Quran Kareem``"
    }
  ],
  q7: [
    {
      addr: "http://www.quraan.us:9916/;",
      name:"``اذاعة الشيخ عبدالباسط عبد الصمد``"
    }
  ],
  q8: [
    {
      addr: "http://www.quraan.us:9914/;",
      name: "``Abdul Azeez Al-Ahmad Quran``"
    }
  ],
  q9: [
    {
      addr: "http://www.quraan.us:9896/;",
      name: "``Muhammad Ayyub Quran``"
    }
  ],
  q10: [
    {
      addr: "http://www.quraan.us:9920/;",
      name: "``Mahmoud Khalil Al-Husary``"
    }
  ],
  q11: [
    {
      addr: "http://www.quraan.us:9848/;",
      name: "``Saoud el Sharem Quran``"
    }
  ],
  q12: [
    {
      addr: "http://184.173.185.71:9972/;",
      name: "``Fares Abbad Quran``"
    }
  ],
  q13: [
    {
      add: "http://radio.alukah.net/quran",
      name: "Saudia Quran Radio"
    }
  ],
  zaman: [
    {
      addr: "http://s2.voscast.com:8612/;",
      name: "``Radio Misrphone``"
    }
  ],
  tiba: [
    {
      addr: "http://s1.voscast.com:10026/;",
      name: "``Radio Tiba E``"
    }
  ],
  moga: [
    {
      addr: "http://eu4.fastcast4u.com:5458/;",
      name: "``Radio Moga``"
    }
  ],
  shabab: [
    {
      addr: "http://ample-09.radiojar.com/a3qsqz9h2ewtv",
      name: "``Radio Shabab E``"
    }
  ],
  air: [
    {
      addr: "http://www.hostmyradio.com:8010/;stream.mp3",
      name: "E``G On Air``"
    }
  ],
  new: [
    {
      addr: "http://streaming.radio.co/scc13a6b96/listen",
      name: "``Radio Masr el Gdida``"
    }
  ],
  "95": [
    {
     addr:
        "http://soundicradio.radioca.st:9010/;",
      name: "``Radio 95``"
    }
  ]
};

var randarray = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};
client.on("message", async message => {
  if (message.content.toLowerCase() === prefix + "radio") {
    try {
      const connection = await message.member.voiceChannel.join();
      var keyArray = Object.keys(streamList),
        genre = streamList[randarray(keyArray)],
        station = randarray(genre);
      playSong(connection, station.addr);

      message.channel.send("**Playing** : " + station.name);
    } catch (err) {
      message.channel.send(
        ":x: You need to be in a voice channel to play radio."
      );
    }
  } else if (message.content.startsWith(prefix + "radio")) {
    try {
      if (message.content.split(prefix + "radio ")[1]) {
        var selectedGenre = message.content.split(prefix + "radio ")[1];
        if (streamList[selectedGenre]) {
          var station = randarray(streamList[selectedGenre]);

          const connection = await message.member.voiceChannel.join();
          playSong(connection, station.addr);

          message.channel.send("**Playing** : " + station.name);
        } else if (selectedGenre == "help") {
          message.channel.send({
            embed: {
              title: "Help",
              description: `Ways to use this bot: \n\n **Note: You need to be in a voice channel to use these commands. Also, I do not control radio ads.**\n\n **!radio** \n Selects random station\n **!radio [genre]** \nPlay a station from this genre. Currently there are [ **q** - **quran** - **q1** - **q2** - **q3** - **q4** - **q5** - **q6** - **q7** - **q8** -**q9** - **q10** - **q11** - **q12** - **q13** - **9090** - **nogoum** - **95** - **tiba** - **shabab** - **air** - **zaman** - **new** - **moga** ] and news stations.\n**!radio stop** \n For Stop & Leave \`BOT\` `,
              color: 42881,
              footer: {
                text: "for help DM Ahmed Fury#7700"
              },
              thumbnail: {
                url:
                  "https://cdn.discordapp.com/attachments/709470077300375593/726375357170712616/Preview.png"
              }
            }
          });
        } else if (selectedGenre == "stop") {
          message.member.voiceChannel.leave();
          message.channel.send(":white_check_mark: Radio stopped.");
        } else {
          message.channel.send("No station found/Invalid Command");
        }
      }
    } catch (err) {
      message.channel.send(
        ":x: You need to be in a voice channel to play radio."
      );
    }
  }
}); //song
function playSong(connection, song) {
  return new Promise((resolve, reject) => {
    const dispatcher = connection.playArbitraryInput(song);
    dispatcher.on("end", () => {
      resolve();
    });
  });
} //song function

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
    console.log("Radio Ready");
 response.sendStatus(200);
  client.user.setActivity("!radio")
client.user.setStatus("online")
});
 //forever run code

app.listen(process.env.PORT); //forever run code
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 120000); //forever run code

client.login(process.env.TOKEN);
