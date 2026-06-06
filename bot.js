import dotenv from 'dotenv';
dotenv.config();
import sendLog from "./sendLog.js"
import { Client, Events, GatewayIntentBits } from 'discord.js';
import recognizeImage from './imageUtil.js';
const token = process.env.BOT_TOKEN;
// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.attachments.size === 0) return;
    const imageUrls = message.attachments.map((attachment) => {
        // console.log(`📎 File name : ${attachment.name}`);
        return attachment.url;
    });

    if (imageUrls.length > 0) {
        try {
            for (let i = 0; i < imageUrls.length; i++) {
                console.log(`Image uploaded: ${imageUrls[i]}`);
                const text = await recognizeImage(imageUrls[i]);
                console.log(`Text: ${text}`);

                const scamKeywords = ['heodux.com', 'withdrawal success', 'claim your reward', 'Mr Beast', 'Crypto'];
                const matchedKeyword = scamKeywords.find(keyword => 
                    text.toLowerCase().includes(keyword.toLowerCase())
                  );
                if (matchedKeyword) {
                    await sendLog(client, message.author.id,matchedKeyword,message.channel.id )
        
                    await message.delete().catch(_ => console.error)
                }
            }
        } catch (error) {
            console.error(`Error recognizing image: ${error.message}`);
        }
    }
});


// Log in to Discord with your client's token
client.login(token);