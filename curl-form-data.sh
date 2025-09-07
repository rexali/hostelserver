# curl -b curl-cookie.txt -F "name=room 1" -F "roomNumber=1" -F "roomType=single room" \
#  -F "type=Self-contained" -F "price=1000" -F "location=Dala" -F "bedrooms= 2" \
#  -F "bathrooms= 1" -F "capacity=2" -F "amenities=['WiFi','water']" \
#  -F "description=Good accomodation" -F "availability=true" -F "rating=5" -F "featured=true" \
#  -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
#  -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
#  -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
#  -F "popular=true" -F "newlyAdded=true" -F "recentlySold=true" -F "recommended=true" \
#  -F "_csrf=8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" -F "agentName=Boss Mustapha" \
#  -F "agentPhone=08065899144" -F "HostelId=1" \
#  -H "X-CSRF-Token:8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" \
#  -H "Content-Type: multipart/form-data" -X POST localhost:3000/api/v1/rooms

#  curl -b curl-cookie.txt -F "name=Ramat 1" -F "roomNumber=1" -F "roomType=single room" \
#  -F "type=Self-contained" -F "price=1000" -F "location=Dala" -F "bedrooms= 2" \
#  -F "bathrooms= 1" -F "capacity=2" -F "amenities=['WiFi','water']" \
#  -F "description=Good accomodation to have" -F "availability=true" -F "rating=5" -F "featured=true" \
#  -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
#  -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
#  -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\Zakat.jpeg" \
#  -F "popular=true" -F "newlyAdded=true" -F "recentlySold=true" -F "recommended=true" \
#  -F "_csrf=8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" -F "agentName=Boss Mustapha" \
#  -F "agentPhone=08065899144" -F "HostelId=1" \
#  -H "X-CSRF-Token:8ozRP6cU-IkAdU1blZkGgYTbKksL87kTvf8I" \
#  -H "Content-Type: multipart/form-data" -X PATCH localhost:3000/api/v1/rooms/1

# curl -b curl-cookie.txt -d @curl-data.json -H "Content-Type:application/json" -X POST localhost:3000/api/v1/bookings | json

# curl -b curl-cookie.txt -d @curl-data/update-booking.json -H "Content-Type:application/json" -X PATCH localhost:3000/api/v1/bookings/1 | json

# curl -b curl-cookie.txt -d '{ "title":"testing","message":"How are you?","read":false,"_csrf":"jS7TYciT-ggIY4KQNCBfMmLJCqsTnWZR7zPQ"}' \
#  -H "Content-Type:application/json" -X POST localhost:3000/api/v1/notifications | json

# curl -b curl-cookie.txt -d '{ "title":"testing","message":"How are you?","read":true, "_csrf":"qHxhZ76O-aPvVjmXAI2mFWoVAR20sgn3YGec"}' \
#  -H "Content-Type:application/json" -X PATCH localhost:3000/api/v1/notifications/1 | json

# curl -b curl-cookie.txt -d '{ "subject":"testing","content":"How are you?","read":false, "senderId":1, "recipientId":1, "_csrf":"ydNYtvIB-Zd3WBCL8MAYxzQ4-FdB5KbNWPZ0"}' \
#  -H "Content-Type:application/json" -X POST localhost:3000/api/v1/messages | json

curl -b curl-cookie.txt -d '{ "subject":"testing","content":"How are you?","read":true, "senderId":1, "recipientId":1, "_csrf":"ydNYtvIB-Zd3WBCL8MAYxzQ4-FdB5KbNWPZ0"}' \
 -H "Content-Type:application/json" -X PATCH localhost:3000/api/v1/messages/1 | json