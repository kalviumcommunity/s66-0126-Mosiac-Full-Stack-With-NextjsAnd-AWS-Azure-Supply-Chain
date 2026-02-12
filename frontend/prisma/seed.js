const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Clearing existing data...');
  await prisma.auditLog.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.dataSubscription.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.supplyChainAlert.deleteMany();
  await prisma.supplyChainEvent.deleteMany();
  await prisma.supplyChainItem.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.environmentalPledge.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.environmentalAlert.deleteMany();
  await prisma.airGasComposition.deleteMany();
  await prisma.climateReading.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log('👤 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@climatrix.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true,
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      latitude: 28.6139,
      longitude: 77.2090,
      profile: {
        create: {
          bio: 'Climate data administrator and analyst',
          interests: ['climate-science', 'data-analysis', 'sustainability'],
        },
      },
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
      isVerified: true,
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      latitude: 19.0760,
      longitude: 72.8777,
      profile: {
        create: {
          bio: 'Environmental activist and community organizer',
          website: 'https://johndoe.com',
          interests: ['air-quality', 'renewable-energy', 'urban-forestry'],
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      username: 'janesmith',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'ANALYST',
      isVerified: true,
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      latitude: 12.9716,
      longitude: 77.5946,
      profile: {
        create: {
          bio: 'Climate scientist and researcher',
          interests: ['climate-change', 'data-science', 'research'],
        },
      },
    },
  });

  // Create Climate Readings
  console.log('🌡️  Creating climate readings...');
  const cities = [
    { name: 'New Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  ];

  for (const city of cities) {
    for (let i = 0; i < 24; i++) {
      const readingTime = new Date();
      readingTime.setHours(readingTime.getHours() - i);

      await prisma.climateReading.create({
        data: {
          location: `${city.name}, ${city.state}`,
          city: city.name,
          state: city.state,
          country: 'India',
          latitude: city.lat,
          longitude: city.lon,
          temperature: 25 + Math.random() * 10,
          feelsLike: 26 + Math.random() * 10,
          tempMin: 20 + Math.random() * 5,
          tempMax: 30 + Math.random() * 5,
          aqi: Math.floor(50 + Math.random() * 150),
          pm25: 25 + Math.random() * 75,
          pm10: 50 + Math.random() * 100,
          co: 0.5 + Math.random() * 2,
          no2: 20 + Math.random() * 40,
          so2: 10 + Math.random() * 30,
          o3: 40 + Math.random() * 80,
          humidity: 50 + Math.random() * 40,
          pressure: 1010 + Math.random() * 20,
          visibility: 5000 + Math.random() * 5000,
          windSpeed: 2 + Math.random() * 8,
          windDirection: Math.random() * 360,
          rainfall: Math.random() * 10,
          cloudCover: Math.floor(Math.random() * 100),
          uvIndex: 2 + Math.random() * 8,
          source: 'OpenWeatherMap',
          readingTime: readingTime,
        },
      });
    }
  }

  // Create Air Gas Composition Data
  console.log('💨 Creating air gas composition data...');
  for (const city of cities) {
    await prisma.airGasComposition.create({
      data: {
        location: `${city.name}, ${city.state}`,
        latitude: city.lat,
        longitude: city.lon,
        co2: 410 + Math.random() * 20,
        ch4: 1850 + Math.random() * 50,
        n2o: 330 + Math.random() * 10,
        o2: 20.95,
        readingTime: new Date(),
        source: 'NOAA',
      },
    });
  }

  // Create Environmental Alerts
  console.log('⚠️  Creating environmental alerts...');
  await prisma.environmentalAlert.create({
    data: {
      alertType: 'AIR_QUALITY',
      severity: 'HIGH',
      title: 'Poor Air Quality Alert',
      description: 'Air quality has deteriorated to unhealthy levels. Limit outdoor activities.',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      latitude: 28.6139,
      longitude: 77.2090,
      radius: 50,
      startTime: new Date(),
      aqiValue: 180,
      isActive: true,
    },
  });

  await prisma.environmentalAlert.create({
    data: {
      alertType: 'HEAT_WAVE',
      severity: 'MODERATE',
      title: 'Heat Wave Warning',
      description: 'Temperatures expected to reach 42°C. Stay hydrated and avoid sun exposure.',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      latitude: 19.0760,
      longitude: 72.8777,
      radius: 30,
      startTime: new Date(),
      temperatureValue: 42,
      isActive: true,
    },
  });

  // Create Groups
  console.log('👥 Creating community groups...');
  const group1 = await prisma.group.create({
    data: {
      name: 'Delhi Green Warriors',
      slug: 'delhi-green-warriors',
      description: 'Focused on local air quality and urban forestry in Delhi.',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      category: 'air-quality',
      isPublic: true,
      createdById: user1.id,
    },
  });

  const group2 = await prisma.group.create({
    data: {
      name: 'Mumbai Sustainability Network',
      slug: 'mumbai-sustainability-network',
      description: 'Waste management and solar energy initiatives in Mumbai.',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      category: 'waste-management',
      isPublic: true,
      createdById: user1.id,
    },
  });

  // Create Group Members
  console.log('🤝 Adding group members...');
  await prisma.groupMember.createMany({
    data: [
      { groupId: group1.id, userId: user1.id, role: 'ADMIN' },
      { groupId: group1.id, userId: user2.id, role: 'MEMBER' },
      { groupId: group2.id, userId: user1.id, role: 'ADMIN' },
      { groupId: group2.id, userId: admin.id, role: 'MODERATOR' },
    ],
  });

  // Create Posts
  console.log('📝 Creating posts...');
  const post1 = await prisma.post.create({
    data: {
      groupId: group1.id,
      authorId: user1.id,
      title: 'Community Tree Planting Drive This Weekend!',
      content: 'Join us for a tree planting event at Central Park. We aim to plant 500 trees this season. Bring your friends and family!',
      tags: ['tree-planting', 'community', 'event'],
      likes: 45,
      views: 230,
      isPinned: true,
    },
  });

  await prisma.post.create({
    data: {
      groupId: group2.id,
      authorId: user2.id,
      title: 'Solar Panel Installation Workshop',
      content: 'Learn how to install and maintain solar panels for your home. Free workshop next Saturday.',
      tags: ['solar-energy', 'workshop', 'renewable-energy'],
      likes: 32,
      views: 156,
    },
  });

  // Create Comments
  console.log('💬 Creating comments...');
  await prisma.comment.createMany({
    data: [
      {
        postId: post1.id,
        authorId: user2.id,
        content: 'Great initiative! Count me in.',
        likes: 8,
      },
      {
        postId: post1.id,
        authorId: admin.id,
        content: 'We can provide tools and saplings. Let me know what you need.',
        likes: 12,
      },
    ],
  });

  // Create Environmental Pledges
  console.log('🌱 Creating environmental pledges...');
  await prisma.environmentalPledge.createMany({
    data: [
      {
        userId: user1.id,
        pledgeType: 'PLANT_TREES',
        quantity: 50,
        unit: 'trees',
        description: 'Plant 50 trees in my locality this year',
        status: 'ACTIVE',
        startDate: new Date(),
      },
      {
        userId: user2.id,
        pledgeType: 'REDUCE_DRIVING',
        quantity: 100,
        unit: 'km',
        description: 'Use public transport and reduce car usage by 100km per week',
        status: 'ACTIVE',
        startDate: new Date(),
      },
      {
        userId: admin.id,
        pledgeType: 'SAVE_ENERGY',
        quantity: 500,
        unit: 'kWh',
        description: 'Reduce home energy consumption by 500 kWh this month',
        status: 'COMPLETED',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        verifiedAt: new Date(),
      },
    ],
  });

  // Create Supply Chain Items
  console.log('📦 Creating supply chain items...');
  const supplyItem1 = await prisma.supplyChainItem.create({
    data: {
      userId: user1.id,
      productName: 'Organic Cotton T-Shirts',
      productCode: 'PROD-001',
      category: 'Textiles',
      origin: 'Bangalore, Karnataka',
      currentLocation: 'Mumbai, Maharashtra',
      destination: 'New Delhi, Delhi',
      carbonFootprint: 45.5,
      energyUsed: 120,
      waterUsed: 2500,
      wasteGenerated: 5.2,
      status: 'IN_TRANSIT',
      temperature: 25.5,
      humidity: 65,
      estimatedArrival: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  });

  const supplyItem2 = await prisma.supplyChainItem.create({
    data: {
      userId: user2.id,
      productName: 'Solar Panels (200W)',
      productCode: 'PROD-002',
      category: 'Renewable Energy Equipment',
      origin: 'Pune, Maharashtra',
      currentLocation: 'Bangalore, Karnataka',
      destination: 'Bangalore, Karnataka',
      carbonFootprint: 120.8,
      energyUsed: 450,
      waterUsed: 800,
      wasteGenerated: 12.5,
      status: 'ARRIVED',
      actualArrival: new Date(),
    },
  });

  // Create Supply Chain Events
  console.log('🚚 Creating supply chain events...');
  await prisma.supplyChainEvent.createMany({
    data: [
      {
        itemId: supplyItem1.id,
        eventType: 'departure',
        location: 'Bangalore, Karnataka',
        latitude: 12.9716,
        longitude: 77.5946,
        description: 'Package departed from warehouse',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        itemId: supplyItem1.id,
        eventType: 'checkpoint',
        location: 'Mumbai, Maharashtra',
        latitude: 19.0760,
        longitude: 72.8777,
        description: 'Package reached Mumbai distribution center',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        itemId: supplyItem2.id,
        eventType: 'arrival',
        location: 'Bangalore, Karnataka',
        latitude: 12.9716,
        longitude: 77.5946,
        description: 'Package delivered successfully',
        timestamp: new Date(),
      },
    ],
  });

  // Create User Alerts
  console.log('🔔 Creating user alerts...');
  await prisma.alert.createMany({
    data: [
      {
        userId: user1.id,
        type: 'AIR_QUALITY',
        location: 'Mumbai, Maharashtra',
        threshold: 100,
        isActive: true,
      },
      {
        userId: user2.id,
        type: 'HEAT_WAVE',
        location: 'Bangalore, Karnataka',
        threshold: 35,
        isActive: true,
      },
    ],
  });

  // Create Notifications
  console.log('📬 Creating notifications...');
  await prisma.notification.createMany({
    data: [
      {
        userId: user1.id,
        title: 'Air Quality Alert',
        message: 'Air quality in your area has reached unhealthy levels (AQI: 180)',
        type: 'alert',
        isRead: false,
      },
      {
        userId: user2.id,
        title: 'New Member in Your Group',
        message: 'John Doe joined Delhi Green Warriors',
        type: 'community',
        isRead: true,
      },
    ],
  });

  // Create Data Subscriptions
  console.log('📊 Creating data subscriptions...');
  await prisma.dataSubscription.createMany({
    data: [
      {
        userId: user1.id,
        dataType: 'aqi',
        location: 'Mumbai, Maharashtra',
        frequency: 'hourly',
        isActive: true,
      },
      {
        userId: user2.id,
        dataType: 'temperature',
        location: 'Bangalore, Karnataka',
        frequency: 'daily',
        isActive: true,
      },
    ],
  });

  // Create System Settings
  console.log('⚙️  Creating system settings...');
  await prisma.systemSettings.createMany({
    data: [
      { key: 'app_version', value: '1.0.0', category: 'general' },
      { key: 'maintenance_mode', value: 'false', category: 'system' },
      { key: 'default_aqi_threshold', value: '150', category: 'alerts' },
      { key: 'data_retention_days', value: '365', category: 'data' },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   Users: ${await prisma.user.count()}`);
  console.log(`   Climate Readings: ${await prisma.climateReading.count()}`);
  console.log(`   Groups: ${await prisma.group.count()}`);
  console.log(`   Posts: ${await prisma.post.count()}`);
  console.log(`   Supply Chain Items: ${await prisma.supplyChainItem.count()}`);
  console.log('');
  console.log('🔐 Test Users:');
  console.log('   Email: admin@climatrix.com | Password: password123 | Role: ADMIN');
  console.log('   Email: john.doe@example.com | Password: password123 | Role: USER');
  console.log('   Email: jane.smith@example.com | Password: password123 | Role: ANALYST');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
