"use strict";

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

// Dialogflow Webhook
const { WebhookClient } = require("dialogflow-fulfillment");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
    (request, response) => {
        const agent = new WebhookClient({ request, response });
        console.log("Dialogflow Request body: " + JSON.stringify(request.body));

        function welcome(agent) {
            agent.add(
                `Hi! This is Flamebot, a chatbot to report fires or suspected fires!`
            );
        }

        function fallback(agent) {
                agent.add(`I didn't understand`);
                agent.add(`I'm sorry, can you try again?`);
        }

        function fire(agent) {
                const area = request.body.queryResult.parameters.area;
                const type = request.body.queryResult.parameters.AlertType;
                if (area && type) {
                    const payload =
                        request.body.originalDetectIntentRequest.payload;
                    const reporter =
                        "data" in payload
                            ? payload.data.message_create.sender_id
                            : request.responseId || "noid";

                    return admin
                        .firestore()
                        .collection("public-fire")
                        .doc()
                        .set({
                            reporter,
                            area,
                            type,
                            time: new Date(),
                            count: 1,
                        })
                        .then(() => {
                            agent.add(
                                `Thank you for reporting the incident! Volunteers have been notified.`
                            );
                        })
                        .catch((error) => {
                            agent.add(error.message);
                        });
                } else if (type) {
                    agent.add(
                        `Please repeat the area of the ${type}! I did not recognise that!`
                    );
                    agent.setContext("areamissing");
                } else if (area) {
                    agent.add(
                        `Please repeat the type of emergency in ${area}! I did not recognise that!`
                    );
                    agent.setContext("typemissing");
                }
        }

        // function pics(agent) {
        //     return new Promise((resolve, reject) => {
        //         try {
        //             const media =
        //                 request.body.originalDetectIntentRequest.payload
        //                     .message_create.message_data.attachment.media;
        //             var url = media.media_url_https;
        //             var id = media.id_str;
        //         } catch (e) {
        //             return await fallback(agent);
        //         }
        //     });
        //     // storageRef.child(`${id}.png`).put(img)
        //     // .then(() => {
        //     //     agent.add("Image uploaded!");
        //     // });
        //     // const { error, img, response } = await client.get(url);
        //     // agent.add("Image uploaded!");
        // }

        // Run the proper function handler based on the matched Dialogflow intent name
        let intentMap = new Map();
        intentMap.set("Welcome Intent", welcome);
        intentMap.set("Default Fallback Intent", fallback);
        intentMap.set("Fire Intent", fire);
        return agent.handleRequest(intentMap);
    }
);
