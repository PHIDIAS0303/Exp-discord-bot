const {Role} = require("discord.js");

module.exports = {
    name: 'del',
    aka: ['delete', 'dels'],
    description: 'delete posts (Admin/Mod only command)',
    guildOnly: true,
    args: true,
    helpLevel: 'role.admin',
    required_role: role.admin,
    usage: `<num of posts>`,
    async execute(msg, args, _, internal_error) {
        const bulknum = Math.floor(Number(args[0]));
        if (!bulknum) {
            msg.channel.send('please pick a number first');
            console.log(`wanted to delete but did not tell us how many posts`);
            return;
        }
        
        // Checks if the `amount` parameter is a number. If not, the command throws an error
        if (isNaN(bulknum)) { 
            msg.reply('The amount parameter isn`t a number!');
            console.log(`Not a number`);
            return;
        }

        // makes sure less than 20 posts
        if (bulknum > 20) {
            msg.reply('You can`t delete more than 20 messages at once!'); 
            return;
        }

        // makes sure 1 or more posts  
        if (bulknum < 1) {
            msg.reply('You have to delete at least 1 message!'); 
            return;
        }

        // finds (feteches) messages
        msg.channel.messages.fetch({ limit: bulknum }).then(messages => { 
            msg.channel.bulkDelete(messages).catch((err) => {internal_error(err); return});
        }).catch((err) => {internal_error(err); return});
    },
};