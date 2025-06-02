// Load Playwright module
const { test, expect } = require('@playwright/test');

// Write a test
test('Create POST api reqeust using static request body', async ({ request }) => {

    // Create POST API request
    const postAPIResponse = await request.post('/booking', {
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

    // Validate status code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    // Validate JSON API response - toHaveProperty()
    expect(postAPIResponseBody.booking).toHaveProperty("firstname", "userOne");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "userLastnameOne");

        // 2nd way to validate data from JSON response - Store in a Variable
        const responseFirstName = postAPIResponseBody.booking.firstname;
        console.log("responseFirstName ------> " + responseFirstName);

  

    // Validate Nested JSON Objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
        "checkin",
        "2025-06-01"
    );
    console.log("Checkin Date --> " + postAPIResponseBody.booking.bookingdates.checkin);

    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
        "checkout",
        "2025-12-01"
    );


});

   

    