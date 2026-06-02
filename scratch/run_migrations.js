const { initializeTables } = require('../src/config/database');

async function main() {
    try {
        console.log("Running table initialization and migrations...");
        await initializeTables();
        console.log("Done!");
    } catch (err) {
        console.error("Migration error:", err);
    }
}

main();
