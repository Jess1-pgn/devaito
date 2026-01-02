const db = require('./config/database');

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connection successful!');
    console.log('   Test query result:', rows[0].result);
    
    console.log('\n🔍 Checking tables...');
    const [tables] = await db.query('SHOW TABLES');
    console.log('✅ Found', tables.length, 'tables:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log('   -', tableName);
    });
    
    console.log('\n🔍 Checking default admin user...');
    const [users] = await db.query('SELECT id, email, role FROM users WHERE role = "admin"');
    if (users.length > 0) {
      console.log('✅ Default admin user found:');
      console.log('   Email:', users[0].email);
      console.log('   Role:', users[0].role);
    } else {
      console.log('⚠️  No admin user found. Run the schema.sql to create default admin.');
    }
    
    console.log('\n✅ All checks passed! Backend is ready to use.');
    console.log('\n📝 Next steps:');
    console.log('   1. Copy .env.example to .env and configure your settings');
    console.log('   2. Run: npm start');
    console.log('   3. Test the API at http://localhost:3000');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n📝 Troubleshooting:');
    console.error('   1. Make sure MySQL is running');
    console.error('   2. Check your .env configuration');
    console.error('   3. Run: mysql -u root -p < database/schema.sql');
    process.exit(1);
  }
}

testConnection();
