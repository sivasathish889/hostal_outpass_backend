var admin = require("firebase-admin");

const notificationSend = async (title, body, fcmToken) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: fcmToken,
  };
  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log({ error: "Failed to send notification" });
  }
};

module.exports = notificationSend;
