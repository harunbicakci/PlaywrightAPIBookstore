// Load Playwright module
const { test, expect } = require('@playwright/test');

// Write a test
test('Create POST api reqeust using static request body', async ({ request }) => {

    await request.post('/booking', {
        // here you can pass headers, request body and parameters as an object
        data:{
            "firstname": "userOne",
            "lastname": "userLastnameOne",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2025-06-01",
                "checkout": "2025-12-01"
            },
            "additionalneeds": "super bowls"
        }
    })
});

// Create POST api request

// Validate status code

// Validate JSON api response

// Validate nested JSON objects