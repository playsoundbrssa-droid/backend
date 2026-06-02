// IMPORTANT: Configure dotenv first before importing database / model
require('dotenv').config({ path: '/Users/danilomedeiros/Documents/GitHub/IPTVExpert/backend/.env' });

const User = require('../src/models/User');

async function main() {
    try {
        console.log("Database type isPostgres:", require('../src/config/database').isPostgres);
        console.log("Finding user with PK 3...");
        let user = await User.findByPk(3);
        console.log("User 3:", user);
        
        if (!user) {
            console.log("User 3 not found in Postgres, listing all users...");
            const allUsers = await User.findAll();
            console.log("All users length:", allUsers.length);
            if (allUsers.length === 0) {
                console.log("No users found");
                return;
            }
            user = allUsers[0];
            console.log("Using user:", user);
        }

        const newStatus = !user.can_download;
        console.log(`Toggling download permission to ${newStatus} for user ${user.id}...`);
        
        const result = await User.update({ can_download: newStatus }, { where: { id: user.id } });
        console.log("Update result:", result);
    } catch (err) {
        console.error("Error during update execution:", err);
    }
}

main();
