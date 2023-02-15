const { EmbedBuilder } = require("discord.js");
const smsBomber = require("../modules/sms.js");

module.exports = { 
      name: "fastbomber",
      usage: "/fastbomber <numara> <miktar>",
      options: [
        {
            name: "numara",
            description: "Numara (Örn: 5321234567)",
            type: 3,
            required: true
        },
        {
            name: "miktar",
            description: "Miktar",
            type: 4,
            required: true
        }
      ],
      category: "Bot", 
      description: "Fast Bomber",
      run: async (client, interaction) => {
        interaction.deferReply();
        let numara = interaction.options.getString("numara");
        let miktar = interaction.options.getInteger("miktar");
        if (isNaN(numara)) return interaction.editReply({ content: "Lütfen bir numara giriniz.", ephemeral: true });
        if (numara.length > 10) return interaction.editReply({ content: "Lütfen geçerli bir numara giriniz.", ephemeral: true });
        if (isNaN(miktar)) return interaction.editReply({ content: "Lütfen bir miktar giriniz.", ephemeral: true });
        
        if (miktar > 100) return interaction.editReply({ content: "Maksimum 100 mesaj gönderebilirsiniz.", ephemeral: true });
        if (miktar < 1) return interaction.editReply({ content: "Minimum 1 mesaj gönderebilirsiniz.", ephemeral: true });

        let embed = new EmbedBuilder()
        .setTitle("Fast Bomber")
        .setDescription(`**${miktar * 10}** adet mesaj **${numara}** numarasına gönderiliyor.`)
        .setFooter({ text: "Fast Bomber", iconURL: client.user.avatarURL() })
        .setTimestamp()

        setTimeout(async () => {
            smsBomber(numara, miktar);
            try {
                await interaction.editReply({ embeds: [embed] });
            } catch (e) {
                console.log(e);
            }
        }, 5000);
    }
} 