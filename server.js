const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

// Function to send a push notification
function sendPushNotification(token, message) {
    const payload = {
        notification: {
            title: 'My App',
            body: message,
        },
    };

    admin.messaging().sendToDevice(token, payload)
        .then(response => {
            console.log('Notification sent:', response);
        })
        .catch(error => {
            console.error('Error sending notification:', error);
        });
}

app.post('/send-notification', (req, res) => {
    // Replace 'AAAAkzq0puM:APA91bEaTJ0LDcXHMH6d5LmsLci8DrugUq-uBS1Zj4LChX_9Q3OoSXBqMRuVxtq3C7FhfS2kqzNe3rdRW_C3gZZPrvGe52VSSztJIuMBAXPAL0L7Uf7M1iCGQPSn60iB1qQJKfgWFepv' with the actual device token to send the notification.
    const token = 'YOUR_TOKEN';
    const { message } = req.body;
    sendPushNotification(token, message);
    res.status(200).json({ success: true });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
