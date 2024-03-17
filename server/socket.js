var io = require('socket.io')(server, {
    cors: {
        origin: CLIENT_URL,
    }
});
// eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.nE-BJJcyzYE_fiPYq9y8CufCIilD8YRbzapi1Zbp8ZezgiCjX84L1QoslpYZiw1YJyvgl5MPSOok1URFS5TXFBPMNrY7ylfdgnvEPSUtL4qpsSSLsIbDE_hjwqsSS3Q3xKRZDJ6jltpazhqkhR48DunLF6CzQbNH_nVjEPBwgYy_6j9HToJzXdgoiSHiTGiuvE3E4G_Dbt47rN0-Wkw3vCH-A52TYGrR-3tmnWk7rFopSQSc1eta_IqELt5UvZrJ34IHC5hh-hmEoxyHe_pntUqz6qEJdDQBksP2B8lW77FAaQ46G0ZbDDODbN5uD7jAtBAFdAhMdI_kUoAf2vYrwQ.nbKjgWYXmAPvQS1i4OE20Q.qx4lOsSR7OC31bgiV7DYf9fiGUqsLPZIructD2CAaL7p2usUhk5-tj9kkeWU5gipy2QX0o3UOZLoVSVBDYBpur75RZ04MsNynsD3E71M1QK-ynsEvb6CX2Uk0i00aP6ZFZ0xQ7RTS4h48xUywTeyh5vTMWXXFRtFEO44fUqsORfRBAAruePrWwkYCjiSdjBCD-7631xO72oyfDGysBp8LXeYi1C6FMlmMhJ-DnsJvz2BFJaIO3dZNzWgkWH_vXAe2PceGJcKXzJ76lETUs1ei4swSW1TUrePYfQGxmsX_DpkSGzLfpUJbQ1kx9F6D4Q6eSvjv7hAQ6SuM2dvjW__K52J9hbNPjrN49mhDOeJFZ5dtgDBzt4fkUyzDla6R-g05nT4PM5GyDAbvrywtiR2xf_4OjZ3PMhgYlFp1QfwcCVRdGfIbG6-NWK_Yr6hkc8xFOAK2MtpDuSo_iM1OYp4DsPuDe2GVv9qvdSZ-_WDiRXyZJdTbt7iQB7N3WSHRyTcI_-N9tdxFhqi2fRytfwOEzs-JrU7zUIdlDONUHJeE6QzniLUAD-6e9w-bHJHbpwvOZXJElX4pz8_3B_0N7HiJBWDGeeIZdAltQqej_fzSgpT54cqgQ3Bt4vl_cpFwVPsMKN2NmeEFyzVYOifzufT0G7u_UwaIIoabTU1K2dDwNlzOQxgZrSnACpTqQkkQ5DSHx_W6HWXI82cNlRorek5d3TwQ9vIWLbC59-u-cEGCC4.i_lvD6AkiqwQ0OeixnFv7aX3asngjdaaojCx1prj1To
let messages = [
    {
        "role": "system",
        "content": "Ты бот используемый в чате для развлекания людей, отвечай весело и задорно"
    },
    {
        "role": "user",
        "content": "Привет! Расскажи про Гагарина"
    },
    {
        "role": "assistant",
        "content": "Гагарин это великий человек, который первым полетел в космос"
    },
]

async function test() {
    try {
        if (!accessToken) {
            accessToken = await getAccessToken(AUTH_TOKEN);
        }
        const result = await askAI(accessToken['access_token'], messages, 1000);
        messages.push(result['choices'][0]['message'])
        return result['choices'][0]['message']
    } catch (error) {
        if (error.response && error.response.status === 401) {
            accessToken = await getAccessToken(AUTH_TOKEN);
            const updatedResult = await askAI(accessToken['access_token'], messages, 1000);
            messages.push(updatedResult['choices'][0]['message'])
            return updatedResult['choices'][0]['message']
        } else {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', async (data) => {
        console.log(`Получено сообщение от клиента: ${data}`);
        messages.push({
            "role": "user",
            "content": data
        },)
        const response = await test()
        socket.send(JSON.stringify({ 'data': response, 'messages': messages }));
    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
})