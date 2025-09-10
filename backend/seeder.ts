import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import Room from './models/Room';
import User from './models/User';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Create a demo admin user if not exists
    let demoUser = await User.findOne({ email: 'admin@demo.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo Admin',
        email: 'admin@demo.com',
        password: 'password123',
        isAdmin: true,
      });
      console.log('Demo user created');
    }

    // Sample rooms data
    const rooms = [
      {
        name: 'Deluxe King Room',
        description: 'A spacious king room with city view, perfect for couples.',
        images: [{ image: '/uploads/default-room.jpeg' }],
        pricePerNight: 250,
        address: '123 Main St, New York, NY 10001',
        guestCapacity: 2,
        numOfBeds: 1,
        internet: true,
        breakfast: true,
        airConditioned: true,
        petsAllowed: false,
        roomCleaning: true,
        category: 'King' as const,
        user: demoUser._id,
      },
      {
        name: 'Standard Single Room',
        description: 'Comfortable single room ideal for solo travelers.',
        images: [{ image: '/uploads/default-room.jpeg' }],
        pricePerNight: 120,
        address: '456 Elm St, Los Angeles, CA 90210',
        guestCapacity: 1,
        numOfBeds: 1,
        internet: true,
        breakfast: false,
        airConditioned: true,
        petsAllowed: false,
        roomCleaning: true,
        category: 'Single' as const,
        user: demoUser._id,
      },
      {
        name: 'Twin Room with Balcony',
        description: 'Two twin beds room with a private balcony overlooking the garden.',
        images: [{ image: '/uploads/default-room.jpeg' }],
        pricePerNight: 180,
        address: '789 Oak Ave, Chicago, IL 60601',
        guestCapacity: 2,
        numOfBeds: 2,
        internet: true,
        breakfast: true,
        airConditioned: true,
        petsAllowed: true,
        roomCleaning: true,
        category: 'Twins' as const,
        user: demoUser._id,
      },
      {
        name: 'Executive King Suite',
        description: 'Luxurious suite with king bed, living area, and premium amenities.',
        images: [{ image: '/uploads/default-room.jpeg' }],
        pricePerNight: 350,
        address: '321 Pine Rd, Miami, FL 33101',
        guestCapacity: 2,
        numOfBeds: 1,
        internet: true,
        breakfast: true,
        airConditioned: true,
        petsAllowed: false,
        roomCleaning: true,
        category: 'King' as const,
        user: demoUser._id,
      },
      {
        name: 'Budget Single Room',
        description: 'Affordable single room for budget-conscious travelers.',
        images: [{ image: '/uploads/default-room.jpeg' }],
        pricePerNight: 80,
        address: '654 Maple St, Houston, TX 77001',
        guestCapacity: 1,
        numOfBeds: 1,
        internet: false,
        breakfast: false,
        airConditioned: false,
        petsAllowed: false,
        roomCleaning: true,
        category: 'Single' as const,
        user: demoUser._id,
      },
      {
        name: 'Family Twin Room',
        description: 'Spacious room with two twin beds, suitable for families.',
        images: [{ image: '/uploads/default-room.jpeg' }],
        pricePerNight: 200,
        address: '987 Cedar Ln, Seattle, WA 98101',
        guestCapacity: 3,
        numOfBeds: 2,
        internet: true,
        breakfast: true,
        airConditioned: true,
        petsAllowed: true,
        roomCleaning: true,
        category: 'Twins' as const,
        user: demoUser._id,
      },
      {
        name: 'Premium King Room',
        description: 'High-end king room with ocean view and spa access.',
        images: [{ image: '/uploads/default-room.jpeg' }],
        pricePerNight: 400,
        address: '147 Beach Blvd, San Diego, CA 92101',
        guestCapacity: 2,
        numOfBeds: 1,
        internet: true,
        breakfast: true,
        airConditioned: true,
        petsAllowed: false,
        roomCleaning: true,
        category: 'King' as const,
        user: demoUser._id,
      },
    ];

    await Room.insertMany(rooms);
    console.log('Demo rooms imported successfully');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Room.deleteMany();
    await User.deleteMany({ email: 'admin@demo.com' });
    console.log('Demo data destroyed');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
