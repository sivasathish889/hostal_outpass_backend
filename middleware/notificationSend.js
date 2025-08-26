var admin = require("firebase-admin");

const notificationSend = async (fcmToken, dataPayload) => {

  try {
    const response = await admin.messaging().sendEachForMulticast({
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
    });
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log(error);
    console.log({ error: "Failed to send notification" });
  }
};

module.exports = notificationSend;
