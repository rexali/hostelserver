
1. Create hostel

Send this curl command first: curl -c curl-cookie.txt localhost:3000/api/v1/hostels

Request: 

curl -b curl-cookie.txt -F "name=HAMCO" -F "photo=@C:/Users/almub/Downloads/Copilot_20250717_173923.png" -F "email=aybaba@yahoo.com" -F "phone=08065788144" -F "address=Idogi" -F "description=Good one to patronise" -F "localGovt=Kumbotso" -F "state=Kano" -F "country=Nigeria" -F "document=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\googl-meet.png" -F "_csrf=jI8IEv15-QRr85HBU2geNS52Fcx4tBkcUfoY" -H "Content-Type: multipart/form-data" -H "X-CSRF-Token:jI8IEv15-QRr85HBU2geNS52Fcx4tBkcUfoY" -X POST localhost:3000/api/v1/hostels

Response:

{"status":"success","data":{"hotel":{"id":1,"name":"HAMCO","email":"aybaba@yahoo.com","phone":"08065788144","address":"Idogi","description":"Good one to patronise","localGovt":"Kumbotso","state":"Kano","country":"Nigeria","photo":"photo-1756883535452-884541491.png","document":"document-1756883535461-718099108.png","updatedAt":"2025-09-03T07:12:15.467Z","createdAt":"2025-09-03T07:12:15.467Z","UserId":null}},"message":"Hotel created"}

2. Get all hostels

Send this curl command first: curl -c curl-cookie.txt localhost:3000/api/v1/hostels

Request:

curl -X GET localhost:3000/api/v1/hostels

Response:

{
  "status": "success",
  "data": {
    "hotels": [
      {
        "id": 2,
        "photo": "photo-1756888749330-689486902.png",
        "name": "HAMCO",
        "email": "aybaba@yahoo.com",
        "phone": "08065788144",
        "address": "Idogi",
        "description": "Good one to patronise",
        "localGovt": "Kumbotso",
        "state": "Kano",
        "country": "Nigeria",
        "document": "document-1756888749337-957319428.png",
        "createdAt": "2025-09-03T08:39:09.340Z",
        "updatedAt": "2025-09-03T08:39:09.340Z",
        "UserId": null,
        "User": null
      },
      {
        "id": 1,
        "photo": "photo-1756883535452-884541491.png",
        "name": "HAMCO",
        "email": "aybaba@yahoo.com",
        "phone": "08065788144",
        "address": "Idogi",
        "description": "Good one to patronise",
        "localGovt": "Kumbotso",
        "state": "Kano",
        "country": "Nigeria",
        "document": "document-1756883535461-718099108.png",
        "createdAt": "2025-09-03T07:12:15.467Z",
        "updatedAt": "2025-09-03T07:12:15.467Z",
        "UserId": null,
        "User": null
      }
    ]
  },
  "message": "Hotel found"
}

3. Update Hostel

Send this curl command first: curl -c curl-cookie.txt localhost:3000/api/v1/hostels

Request:

curl -F "name=HAMCO" -F "photo=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\googl-meet.png" -F "email=aybaba@yahoo.com" -F "phone=08065788144" -F "address=Idogi" -F "description=Good one to patronise" -F "localGovt=Kumbotso" -F "state=Kano" -F "country=Nigeria" -F "document=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\subscribe-comment-share.png" -F "UserId=1" -H "Content-Type: multipart/form-data" -X PATCH localhost:3030/hotels/1 | json

Response:

curl -b cookie.txt -F "name=HAMCO" -F "photo=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\googl-meet.png" -F "email=aybaba@yahoo.com" -F "phone=08065788144" -F "address=Idogi" -F "description=Good one to patronise" -F "localGovt=Kumbotso" -F "state=Kano" -F "country=Nigeria" -F "document=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\subscribe-comment-share.png" -F "UserId=1" -F "_csrf=R4NQxOhb-qWbuujSikhvo6aOXyuhg-qOqSd8" -H "Content-Type: multipart/form-data" -H "X-CSRF-Token:R4NQxOhb-qWbuujSikhvo6aOXyuhg-qOqSd8" -X PATCH localhost:3000/api/v1/hostels/1


4. Delete hostel

Send this curl command first: curl -c curl-cookie.txt localhost:3000/api/v1/hostels/1

Request:

* curl -b cookie.txt -X DELETE localhost:3000/api/v1/hostels/1

Response: 


5. Create room

Send this curl command first: curl -c curl-cookie.txt localhost:3000/api/v1/rooms

Request:

* curl -b curl-cookie.txt -F "name=room 1" -F "roomNumber=1" -F "roomType=single room" \
 -F "type=Self-contained" -F "price=1000" -F "location=Dala" -F "bedrooms= 2" \
 -F "bathrooms= 1" -F "capacity=2" -F "amenities=['WiFi','water']" \
 -F "description=Good accomodation" -F "availability=true" -F "rating=5" -F "featured=true" \
 -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
 -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
 -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
 -F "popular=true" -F "newlyAdded=true" -F "recentlySold=true" -F "recommended=true" \
 -F "_csrf=8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" -F "agentName=Boss Mustapha" \
 -F "agentPhone=08065899144" -F "HostelId=1" \
 -H "X-CSRF-Token:8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" \
 -H "Content-Type: multipart/form-data" -X POST localhost:3000/api/v1/rooms

Response:

{"status":"success","data":{"room":{"id":1,"name":"room 1","roomNumber":1,"roomType":"single room","type":"Self-contained","price":1000,"location":"Dala","bedrooms":2,"bathrooms":1,"capacity":2,"amenities":["WiFi,water"],"description":"Good accomodation","availability":true,"rating":5,"featured":true,"popular":true,"newlyAdded":true,"recentlySold":true,"recommended":true,"agentName":"Boss Mustapha","agentPhone":"08065899144","HostelId":1,"photos":["photos-1756977746989-649309711.jpeg","photos-1756977746990-41300317.jpeg","photos-1756977746990-367592209.jpeg"],"updatedAt":"2025-09-04T09:22:27.010Z","createdAt":"2025-09-04T09:22:27.010Z"}},"message":"Room created"}


6. Read rooms

Request: 

curl http://localhost:3000/api/v1/rooms

Response:

{
  "status": "success",
  "data": {
    "rooms": [
      {
        "id": 1,
        "name": "room 1",
        "roomNumber": 1,
        "roomType": "single room",
        "type": "Self-contained",
        "price": 1000,
        "location": "Dala",
        "bedrooms": 2,
        "bathrooms": 1,
        "capacity": 2,
        "amenities": [
          "WiFi,water"
        ],
        "photos": [
          "photos-1756977746989-649309711.jpeg",
          "photos-1756977746990-41300317.jpeg",
          "photos-1756977746990-367592209.jpeg"
        ],
        "description": "Good accomodation",
        "availability": true,
        "rating": 5,
        "featured": true,
        "popular": true,
        "newlyAdded": true,
        "recentlySold": true,
        "recommended": true,
        "agentName": "Boss Mustapha",
        "agentPhone": "08065899144",
        "createdAt": "2025-09-04T09:22:27.010Z",
        "updatedAt": "2025-09-04T09:22:27.010Z",
        "HostelId": 1
      }
    ]
  },
  "message": "Room(s) found"
}

7. Read a room

Request:

curl http://localhost:3000/api/v1/rooms/1

Response:


{
  "status": "success",
  "data": {
    "rooms": {
      "id": 1,
      "name": "room 1",
      "roomNumber": 1,
      "roomType": "single room",
      "type": "Self-contained",
      "price": 1000,
      "location": "Dala",
      "bedrooms": 2,
      "bathrooms": 1,
      "capacity": 2,
      "amenities": [
        "WiFi,water"
      ],
      "photos": [
        "photos-1756977746989-649309711.jpeg",
        "photos-1756977746990-41300317.jpeg",
        "photos-1756977746990-367592209.jpeg"
      ],
      "description": "Good accomodation",
      "availability": true,
      "rating": 5,
      "featured": true,
      "popular": true,
      "newlyAdded": true,
      "recentlySold": true,
      "recommended": true,
      "agentName": "Boss Mustapha",
      "agentPhone": "08065899144",
      "createdAt": "2025-09-04T09:22:27.010Z",
      "updatedAt": "2025-09-04T09:22:27.010Z",
      "HostelId": 1
    }
  },
  "message": "Room found"
}


8. Update a room

Request: 

curl -b curl-cookie.txt -F "name=Ramat 1" -F "roomNumber=1" -F "roomType=single room" \
 -F "type=Self-contained" -F "price=1000" -F "location=Dala" -F "bedrooms= 2" \
 -F "bathrooms= 1" -F "capacity=2" -F "amenities=['WiFi','water']" \
 -F "description=Good accomodation to have" -F "availability=true" -F "rating=5" -F "featured=true" \
 -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
 -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
 -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
 -F "popular=true" -F "newlyAdded=true" -F "recentlySold=true" -F "recommended=true" \
 -F "_csrf=8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" -F "agentName=Boss Mustapha" \
 -F "agentPhone=08065899144" -F "HostelId=1" \
 -H "X-CSRF-Token:8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" \
 -H "Content-Type: multipart/form-data" -X PATCH localhost:3000/api/v1/rooms/1


Response:

{"status":"success","data":{"affectedCount":1},"message":"Room updated"}


9. Delete a room

Request: 


* curl -b cookie.txt -X DELETE localhost:3000/api/v1/rooms/1


Response:




10. Create or saved a favorite
    
Request:

curl -d '{"RoomId":1,"UserId":1}' -H "Content-Type:application/json" -X POST localhost:3030/favorites | json

Response:

{
  "status": "success",
  "data": {
    "favorite": {
      "id": 1,
      "RoomId": 1,
      "UserId": 1,
      "updatedAt": "2025-09-04T13:38:54.614Z",
      "createdAt": "2025-09-04T13:38:54.614Z"
    }
  },
  "message": "Favourtite found"
}

11. Get one or a user's favourites
   
Request:

curl -X GET localhost:3000/api/v1/favorites/1

Response:

{
  "status": "success",
  "data": {
    "favorite": [
      {
        "id": 1,
        "createdAt": "2025-09-04T13:38:54.614Z",
        "updatedAt": "2025-09-04T13:38:54.614Z",
        "UserId": 1,
        "RoomId": 1,
        "Room": {
          "id": 1,
          "name": "Ramat 1",
          "roomNumber": 1,
          "roomType": "single room",
          "type": "Self-contained",
          "price": 1000,
          "location": "Dala",
          "bedrooms": 2,
          "bathrooms": 1,
          "capacity": 2,
          "amenities": [
            "WiFi,water"
          ],
          "photos": [
            "photos-1756990248390-103518523.jpeg",
            "photos-1756990248391-615440349.jpeg",
            "photos-1756990248391-399626122.jpeg"
          ],
          "description": "Good accomodation to have",
          "availability": true,
          "rating": 5,
          "featured": true,
          "popular": true,
          "newlyAdded": true,
          "recentlySold": true,
          "recommended": true,
          "agentName": "Boss Mustapha",
          "agentPhone": "08065899144",
          "createdAt": "2025-09-04T09:22:27.010Z",
          "updatedAt": "2025-09-04T12:50:48.396Z",
          "HostelId": 1,
          "Hostel": {
            "id": 1,
            "photo": "photo-1756908796403-191731070.png",
            "name": "HAMCO",
            "email": "aybaba@yahoo.com",
            "phone": "08065788144",
            "address": "Idogi",
            "description": "Good one to patronise",
            "localGovt": "Kumbotso",
            "state": "Kano",
            "country": "Nigeria",
            "document": "document-1756908796403-817277459.png",
            "createdAt": "2025-09-03T07:12:15.467Z",
            "updatedAt": "2025-09-03T14:13:16.406Z",
            "UserId": 1
          }
        }
      }
    ]
  },
  "message": "Favorites found"
}

12. Delete a user's favourite

Request:

curl -X DELETE localhost:3030/api/v1/<RoomId>/<UserId> | json


Response:



13. Clear a user's favourites  

Request:

curl -X DELETE localhost:3030/api/v1/<UserId> | json

Response:


14. Create a booking

Request:
curl -b curl-cookie.txt -d @curl-data.json -H "Content-Type:application/json" -X POST localhost:3000/api/v1/bookings | json

Response:

{
  "status": "success",
  "data": {
    "booking": {
      "id": 1,
      "checkIn": "2025-06-08T23:00:00.000Z",
      "checkOut": "2025-06-10T23:00:00.000Z",
      "totalPrice": 234000,
      "status": "confirmed",
      "paymentStatus": "paid",
      "RoomId": 1,
      "updatedAt": "2025-09-05T13:36:54.402Z",
      "createdAt": "2025-09-05T13:36:54.402Z"
    }
  },
  "message": "Booking created"
}

15. Get all bbokings

Request:

curl -H "Content-Type:application/json" -X GET localhost:3000/api/v1/bookings | json

Response:

{
  "status": "success",
  "data": {
    "booking": [
      {
        "id": 1,
        "checkIn": "2025-06-08T23:00:00.000Z",
        "checkOut": "2025-06-10T23:00:00.000Z",
        "totalPrice": 234000,
        "paymentStatus": "paid",
        "status": "confirmed",
        "createdAt": "2025-09-05T13:36:54.402Z",
        "updatedAt": "2025-09-05T13:36:54.402Z",
        "RoomId": 1,
        "UserId": null,
        "Room": {
          "id": 1,
          "name": "Ramat 1",
          "roomNumber": 1,
          "roomType": "single room",
          "type": "Self-contained",
          "price": 1000,
          "location": "Dala",
          "bedrooms": 2,
          "bathrooms": 1,
          "capacity": 2,
          "amenities": [
            "WiFi,water"
          ],
          "photos": [
            "photos-1756990248390-103518523.jpeg",
            "photos-1756990248391-615440349.jpeg",
            "photos-1756990248391-399626122.jpeg"
          ],
          "description": "Good accomodation to have",
          "availability": false,
          "rating": 5,
          "featured": true,
          "popular": true,
          "newlyAdded": true,
          "recentlySold": true,
          "recommended": true,
          "agentName": "Boss Mustapha",
          "agentPhone": "08065899144",
          "createdAt": "2025-09-04T09:22:27.010Z",
          "updatedAt": "2025-09-05T13:36:54.422Z",
          "HostelId": 1
        },
        "User": null
      }
    ]
  },
  "message": "Bookings read"
}

15. Update a booking

   Request:
   
   curl -b curl-cookie.txt -d @curl-data/update-booking.json -H "Content-Type:application/json" -X PATCH localhost:3000/api/v1/bookings/1 | json


   Response:

   {
  "status": "success",
  "data": {
    "booking": [
      1
    ]
  },
  "message": "Booking updated"
}
 

17. Create a notification

Get cookie first:

curl -c curl-cookie.txt -X GET localhost:3000/api/v1/notifications

Request: 

 curl -d '{"title":"testing","message":"How are you?","type":"Sch","recipient":["alybaba2009@gmail.com"],"status":"unread"}' -H "Content-Type:application/json" -X POST localhost:3030/notifications | json


Response:

{
  "status": "success",
  "data": {
    "notification": {
      "id": 1,
      "title": "testing",
      "message": "How are you?",
      "read": false,
      "updatedAt": "2025-09-06T12:55:04.319Z",
      "createdAt": "2025-09-06T12:55:04.319Z",
      "UserId": null
    }
  },
  "message": "Notification created"
}


18. Get all notifications:

Request:

curl -X GET localhost:3000/api/v1/notifications

Response:

{
  "status": "success",
  "data": {
    "notifications": [
      {
        "id": 1,
        "UserId": null,
        "title": "testing",
        "message": "How are you?",
        "read": false,
        "createdAt": "2025-09-06T12:55:04.319Z",
        "updatedAt": "2025-09-06T12:55:04.319Z"
      }
    ],
    "sign": true
  },
  "message": "Notifications found"
}


19. Update a notication

Request:

{
  "status": "success",
  "data": {
    "notification": [
      1
    ]
  },
  "message": "Notification created"
}




20. Create a messge

Get cookie first

curl -c curl-cookie.txt -X GET localhost:3000/api/v1/messages


Request:

curl -d '{"title":"testing","message":"How are you?","type":"Sch","recipient":"alybaba2009@gmail.com","sender":"alybaba2009@gmail.com","UserId":1}' -H "Content-Type:application/json" -X POST localhost:3030/messages | json


Response:

{
  "status": "success",
  "data": {
    "message": {
      "id": 1,
      "subject": "testing",
      "content": "How are you?",
      "read": false,
      "senderId": 1,
      "updatedAt": "2025-09-06T13:29:14.536Z",
      "createdAt": "2025-09-06T13:29:14.536Z",
      "recipientId": null
    }
  },
  "message": "Message sent"
}


21. Get all messages

Request:

curl -X GET localhost:3000/api/v1/messages

Response:

{
  "status": "success",
  "data": {
    "messages": [
      {
        "id": 1,
        "subject": "testing",
        "content": "How are you?",
        "recipientId": null,
        "senderId": 1,
        "read": false,
        "createdAt": "2025-09-06T13:29:14.536Z",
        "updatedAt": "2025-09-06T13:29:14.536Z"
      }
    ]
  },
  "message": "Messages found "
}

22. Update a message

Request:


curl -b curl-cookie.txt -d '{ "subject":"testing","content":"How are you?","read":true, "senderId":1, "recipientId":1, "_csrf":"ydNYtvIB-Zd3WBCL8MAYxzQ4-FdB5KbNWPZ0"}' \
 -H "Content-Type:application/json" -X PATCH localhost:3000/api/v1/messages/1 | json

Response:

{
  "status": "success",
  "data": {
    "message": [
      1
    ]
  },
  "message": "Message updated"
}

23. Delete a message:

Request:
Response:

24. Register
25. Login
26. Verify








