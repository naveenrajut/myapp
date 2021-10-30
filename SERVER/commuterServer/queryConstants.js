module.exports = {
    passengerQuery : `select user_name,email,mobile
                      from passenger
                      where email = $1;`,
    postTicket : `insert into ticket (ticket_id,
                                      booked_time,
                                      boarding_point,
                                      destination_point,
                                      bus_type,
                                      price,
                                      passenger_id,
                                      status) values ($1,$2,$3,$4,$5,$6,$7,$8) 
                                      returning *;`,
    postPassenger : `insert into passenger (passenger_id,
                                            user_name,
                                            hashed_psswd,
                                            email,
                                            mobile,
                                            gender
                                            ,age) values ($1,$2,$3,$4,$5,$6,$7) returning *;`,
    postBus : `insert into bus (bus_no,
                                route_no,
                                bus_type,
                                no_seats,
                                conductor_id) values ($1,$2,$3,$4,$5) 
                                returning *;`,
    postConductor : `insert into conductor (conductor_name,
                                            gender,
                                            age) values ($1,$2,$3) 
                                            returning *;`,
    authUser: `select email from passenger where email = $1`,
    checkId : `select passenger_id from passenger where passenger_id = $1`,
    validPassword: `select  hashed_psswd,
                            user_name,
                            email,
                            mobile,
                            gender,
                            passenger_id
                            from passenger 
                            where email = $1;`,
    getUserKey: `select passenger_id from passenger where email = $1`,
    apikeypost: `insert into Auth_API(authAPIkey,Passenger_ID) values($1,$2);`,
    apikeyput: `update Auth_API 
                set authAPIkey = $1 
                where passenger_id = $2;`,
    apikeyget: `select * from Auth_API where passenger_id = $1;`,
    getpassengerid: `select passenger_id from passenger where email = $1;`,
    apikeyremove: `update Auth_API
                   set authAPIkey = null
                   where passenger_id = $1`,
    ticketQuery: `select * from ticket where passenger_id = $1;`,

};