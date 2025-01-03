module.exports = {
  targetProfiles: [
    1, 4, 6, 8, 9, 12, 15, 16, 17, 31, 32, 33, 34, 36, 43, 55, 56, 57, 58, 60,
    63, 66, 67, 68, 72, 73,
  ],
  channelURLs: [], // Channels to subscribe
  likeURLs: [], // Videos to like
  videoURLs: [], // Videos to watch

  //   --- Temp ---
  url: "https://youtu.be/kNDPSKnNT8g?si=jA1cQh5sftzxgK0B", // unknown
  // url: "https://www.youtube.com/shorts/n4BhEaun5jo", // short
  // url: "https://www.youtube.com/watch?v=Luj9R7f5YRM&t=271s", // video
  // url: "https://youtu.be/1y5OBP06RBE?si=KQ-E3dWWzaT3NNxw", // general
  profileTarget: 1,

  //   constants
  //   timeout30Sec: { timeout: 30000 },
};
module.exports.options = {
  profileTarget: process.env.CHORME_TARGET_PROFILE,
  chatURL: process.env.CHORME_CHAT_URL,
  // chatURL: "https://accounts.google.com/signup/v2/webcreateaccount",
  // windowSize: [974, 1047],
  // windowPosition: [953, 0],
  // windowSize: [814, 859],
  // windowPosition: [793, -5],
  // For Office Desktop
  windowSize: [697, 727],
  windowPosition: [676, 0],
  // For acer Laptop
  // windowSize: [782, 831],
  // windowPosition: [761, 0],
};

module.exports.dataToLog = {};
