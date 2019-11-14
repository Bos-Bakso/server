# server

model user
- location, 
- isOwner,
- history[ historyId ]
- username
- password


model history
- bowlQty
- date
- userId (tukang baso id)


model service
- userId (tukang baso id)
- problem
- price
- solve : boolean
- location : { 
    lat, long
}