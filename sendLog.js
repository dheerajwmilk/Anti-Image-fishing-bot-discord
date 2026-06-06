import dotenv from 'dotenv';
dotenv.config();
import { EmbedBuilder } from 'discord.js';

export default async function sendLog(client, userId, detectedKeyword, channelId) {

    const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
    const user = await client.users.fetch(userId);

    const embed = new EmbedBuilder()
        .setTitle('🚨 Scam Detected')
        .setColor(0xFF0000)
        .addFields(
            { name: '👤 User', value: `<@${userId}> (${user.tag})`, inline: true },
            { name: '🆔 User ID', value: userId, inline: true },
            { name: '📌 Violated In', value: `<#${channelId}>`, inline: true },
            { name: '🔑 Keyword Matched', value: detectedKeyword, inline: true },
            { name: '⏰ Time', value: new Date().toLocaleString(), inline: true },
        )
        .setThumbnail(user.displayAvatarURL())
        .setFooter({ text: 'Anti-Scam Bot' })
        .setTimestamp();

    await logChannel.send({ embeds: [embed] });
}
