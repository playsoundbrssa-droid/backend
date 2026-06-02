const User = require('../src/models/User');

async function main() {
    try {
        console.log("Database type isPostgres:", require('../src/config/database').isPostgres);
        
        console.log("Listing all users in local SQLite...");
        const allUsers = await User.findAll();
        console.log("All users length:", allUsers.length);
        if (allUsers.length === 0) {
            console.log("No users found");
            return;
        }
        
        let user = allUsers[0];
        console.log("Using user:", user);

        const newStatus = !user.can_download;
        console.log(`Toggling download permission to ${newStatus} for user ${user.id}...`);
        
        const result = await User.update({ can_download: newStatus }, { where: { id: user.id } });
        console.log("Update result:", result);
        
        // Fetch again to verify
        const updatedUser = await User.findByPk(user.id);
        console.log("Updated user from database:", updatedUser);
    } catch (err) {
        console.error("Error during update execution:", err);
    }
}

main();
