var admin = require("firebase-admin");

const notificationSend = async (fcmToken, dataPayload) => {
  try {
    const message = {
      token: fcmToken,
      data : dataPayload ,
      android: {
        priority: "high",
        notification: {
          sound: "default",
        },
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
            contentAvailable: true,
          },
        },
      },
    };
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log(error);
    console.log({ error: "Failed to send notification" });
  }
};

module.exports = notificationSend;

