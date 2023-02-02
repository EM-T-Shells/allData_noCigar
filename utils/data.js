const characters = [
  'Mickey Mouse',
  'Minnie Mouse',
  'Donald Duck',
  'Goofy',
  'Pluto',
  'Daisy Duck',
]

const reactions = [
  'Love',
  'Like',
  'Haha',
  'Wow',
  'Sad',
  'Angry',
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random Disney character
const getRandomCharacter = () => getRandomArrItem(characters);

// Function to generate random friends and reactions that we can add to user object.
const getRandomFriendsAndReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      friend: getRandomCharacter(),
      reaction: getRandomArrItem(reactions),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomCharacter, getRandomFriendsAndReactions };

