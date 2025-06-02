// Load Playwright module
const { test, expect } = require('@playwright/test');

// These two lines will provide testing with dynamic data
import { faker } from '@faker-js/faker'
const { DateTime } = require('luxon');

// Write a test
test('Create POST api reqeust using dynamic request body', async ({ request }) => {

    // These here are generating random strings and integer numbers
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);

    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    
    // plus({day:5}) --> means get todays date and add 5 days for checkout date
    const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');

    // Create POST API request
    const postAPIResponse = await request.post('/booking', {
        // here you can pass headers, request body and parameters as an object
        data:{
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
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
    expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName);
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);

        // 2nd way to validate data from JSON response - Store in a Variable
        const responseFirstName = postAPIResponseBody.booking.firstname;
        console.log("responseFirstName is------> " + responseFirstName + " --- and it should be ----> " + firstName);

    // Validate Nested JSON Objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
        "checkin",
        checkInDate
    );
    console.log("Checkin Date --> " + postAPIResponseBody.booking.bookingdates.checkin);

    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
        "checkout",
        checkOutDate
    );


});

   

    