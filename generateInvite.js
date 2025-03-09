// generateInvite.js
const channelId = process.env.DISCORD_CHANNEL_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

// Discord API endpoint for creating channel invites
const url = `https://discord.com/api/v10/channels/${channelId}/invites`;

// Customize your invite options here
const data = {
    max_age: 86400,      // Invite link valid for 24 hours (in seconds)
    max_uses: 0,         // Unlimited uses
    temporary: false,    // Not a temporary invite
    validate: null,
};

(async () => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${botToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const invite = await response.json();
        console.log('Generated Invite Link: https://discord.gg/' + invite.code);
    } catch (error) {
        console.error('Error generating invite:', error);
        process.exit(1);
    }
})();
