const { Client } = require('pg');
const fs = require('fs');

const connectionString = 'postgresql://neondb_owner:npg_MiIj2fE1qGZR@ep-plain-pine-adamextq-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function queryDatabase() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    const result = { tables: {} };

    try {
        await client.connect();
        console.log('Connected to Neon database successfully!');

        // Get all tables in the database
        const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

        result.tableNames = tablesResult.rows.map(r => r.table_name);
        console.log('Tables found:', result.tableNames);

        // For each table, get its structure and data
        for (const row of tablesResult.rows) {
            const tableName = row.table_name;
            console.log(`Fetching data from table: ${tableName}`);

            // Get table structure
            const columnsResult = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position;
      `, [tableName]);

            // Get row count
            const countResult = await client.query(`SELECT COUNT(*) FROM "${tableName}"`);

            // Get all data (limit to 100 rows for safety)
            const dataResult = await client.query(`SELECT * FROM "${tableName}" LIMIT 100`);

            result.tables[tableName] = {
                columns: columnsResult.rows,
                rowCount: parseInt(countResult.rows[0].count),
                data: dataResult.rows
            };
        }

        // Write results to JSON file
        fs.writeFileSync('db-data.json', JSON.stringify(result, null, 2));
        console.log('\nDatabase data saved to db-data.json');

    } catch (error) {
        console.error('Database error:', error);
    } finally {
        await client.end();
        console.log('Connection closed.');
    }
}

queryDatabase();
