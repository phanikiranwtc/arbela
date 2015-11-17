var PUBNUB_demo = PUBNUB.init({
    publish_key: 'pub-c-12a0e504-b46c-4c9c-ba5d-089ae589b37e',
    subscribe_key: 'sub-c-7c052466-04ea-11e5-aefa-0619f8945a4f'
});

// PUBNUB_demo.subscribe({
//     channel: 'TEMP',
//     message: function(m){console.log(m)}
// });

PUBNUB_demo.publish({
    channel: 'TEMP',
    message: {"temp":"41.5"}
});