const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful!\n');
    
    // Test query execution
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query execution successful!');
    console.log('   Result:', result);
    console.log('');
    
    // Check if tables exist
    console.log('📊 Checking database tables...\n');
    
    try {
      const userCount = await prisma.user.count();
      const climateCount = await prisma.climateReading.count();
      const groupCount = await prisma.group.count();
      
      console.log('✅ Tables found:');
      console.log(`   - Users: ${userCount} records`);
      console.log(`   - Climate Readings: ${climateCount} records`);
      console.log(`   - Groups: ${groupCount} records`);
      console.log('');
      
      if (userCount === 0) {
        console.log('💡 Database is empty. Run: npm run db:seed');
      } else {
        console.log('✅ Database has data!');
      }
      
    } catch (tableError) {
      console.log('⚠️  Tables not found. Run: npm run db:push');
      console.log('   This will create all database tables.');
      console.log('');
    }
    
    console.log('\n🎉 Database setup verified!\n');
    
  } catch (error) {
    console.error('❌ Database connection failed!\n');
    console.error('Error:', error.message);
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('   1. Check your DATABASE_URL in .env file');
    console.log('   2. Make sure the database server is running');
    console.log('   3. Verify credentials (username/password)');
    console.log('   4. Check firewall/network settings');
    console.log('');
    console.log('📖 See DATABASE_QUICKSTART.md for setup instructions');
    console.log('');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
