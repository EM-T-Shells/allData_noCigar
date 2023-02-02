const MongoClient = require('mongodb').MongoClient;
const connection = require('../config/db_connection');
const client = new MongoClient(connection, { useNewUrlParser: true });
const { User, Thought } = require('../models');
const { getRandomCharacter, getRandomFriendsAndReactions } = require('./data');

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  const seedData = { name: 'John Doe', age: 25 };
  collection.insertOne(seedData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Seed data inserted successfully');
    }
  });
  client.close();
});


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 10 times -- add users to the users array
  for (let i = 0; i < 10; i++) {
    // Get some random friends and reactions using a helper function that we imported from ./data
    const friendsAndReactions = getRandomFriendsAndReactions(10);

    const username = `${getRandomCharacter()}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
    const email = `${username}@disney.com`;

    users.push({
      username,
      email,
      friendsAndReactions,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: 'Disney is the best!',
    createdAt: Date.now(),
    username: 'Mickey Mouse',
    reactions: [...friendsAndReactions],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});