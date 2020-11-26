/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  cases: [],

  // Insert values here

  user: {
      "cell": "0750-552-056",
      "dob": {
        "age": 31,
        "date": "1989-11-17T21:56:57.779Z"
      },
      "email": "manish.sharma@example.com",
      "gender": "female",
      "id": {
        "name": "NINO",
        "value": "AX 82 52 01 E"
      },
      "location": {
        "city": "Maidstone",
        "coordinates": {
          "latitude": "17.2334",
          "longitude": "88.9196"
        },
        "country": "United Kingdom",
        "postcode": "XM26 7YS",
        "state": "Warwickshire",
        "street": {
          "name": "The Avenue",
          "number": 9617
        },
        "timezone": {
          "description": "Kabul",
          "offset": "+4:30"
        }
      },
      "login": {
        "md5": "5724c4fbd97e5155d19f71a44f12cc48",
        "password": "ccccccc",
        "salt": "uJHyJ9ZL",
        "sha1": "85dff52890cee9977409fc6ae332a7e2326d6aa4",
        "sha256": "ab62d511f943bfca48935cb4620b3b2007f8d1b9c1e04a04ea76ea95cd099d5f",
        "username": "blueelephant921",
        "uuid": "2d5afd5e-a598-469f-9933-4edba18bcefb"
      },
      "name": {
        "first": "Manish",
        "last": "Sharma",
        "title": "Miss"
      },
      "nat": "GB",
      "phone": "016977 50180",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/62.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/62.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/62.jpg"
      },
      "registered": {
        "age": 6,
        "date": "2014-05-20T20:54:39.692Z"
      }
    },
    "alt-sections-completed-text": "Application incomplete",
    "alt-your-details-completed": "govuk-tag--grey",
    "alt-your-details-completed-text": "Not started",
    "alt-contact-details-completed": "govuk-tag--grey",
    "alt-contact-details-completed-text": "Not started",
    "alt-applicant-name-completed": "govuk-tag--grey",
    "alt-applicant-name-completed-text": "Not started",
    "alt-appeal-statement-completed": "govuk-tag--grey",
    "alt-appeal-statement-completed-text": "Not started",
    "alt-upload-appeal-docs-completed": "govuk-tag--grey",
    "alt-upload-appeal-docs-completed-text": "Not started",
    "alt-other-appeal-completed": "govuk-tag--grey",
    "alt-other-appeal-completed-text": "Not started",
    "alt-application-upload-completed": "govuk-tag--grey",
    "alt-application-upload-completed-text": "Not started",
    "alt-decision-notice-completed": "govuk-tag--grey",
    "alt-decision-notice-completed-text": "Not started",
    "alt-site-location-completed": "govuk-tag--grey",
    "alt-site-location-completed-text": "Not started",
    "alt-site-access-completed": "govuk-tag--grey",
    "alt-site-access-completed-text": "Not started",
    "alt-site-access-info-completed": "govuk-tag--grey",
    "alt-site-access-info-completed-text": "Not started",
    "alt-safety-access-completed": "govuk-tag--grey",
    "alt-safety-access-completed-text": "Not started",
    "alt-site-ownership-completed": "govuk-tag--grey",
    "alt-site-ownership-completed-text": "Not started",
    "alt-application-number-completed": "govuk-tag--grey",
    "alt-application-number-completed-text": "Not started",
    "alt-application-completed": "govuk-tag--grey",
    "alt-application-completed-link": "Check your answers",
    "alt-application-completed-text": "Cannot start yet",
    planningDetails: {
      "Name": "Manish Sharma",
      "Address": "Old Orchard 22 Townsend Lane Almondsbury South Gloucestershire BS32 4EQ",
      "Alternative Reference": "PP-08794252",
      "Appeal Decision": "Not Available",
      "Appeal Status": "Unknown",
      "Application Received": "18 Jun 2020",
      "Application Validated": "18 Jun 2020",
      "Decision": "Refusal",
      "Decision Issued Date": "12 Oct 2020",
      "Proposal": "Demolition of existing dwelling and outbuildings. Erection of 1 no. dwelling with associated works.",
      "Reference": "P20/12345/F",
      "Status": "Decided",
      "documents": [
        "downloads/P20-10658-F.zip"
      ]
    }

}
