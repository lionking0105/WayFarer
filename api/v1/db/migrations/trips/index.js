
export default {
  dropTripsTable: () => {
    const queryString = 'DROP TABLE IF EXISTS trips';
    return queryString;
  },

  createTripsTable: () => {
    const queryString = `CREATE TABLE trips ( id SERIAL PRIMARY KEY,
                                              bus_id INTEGER,
                                              origin varchar(255),
                                              destination varchar(255),
                                              trip_date DATE,
                                              fare DOUBLE PRECISION,
                                              status DOUBLE PRECISION,
                                              CONSTRAINT trips_pkey PRIMARY KEY (id),
                                              CONSTRAINT trips_bus_id_fkey FOREIGN KEY (bus_id)
                                              REFERENCES buses (id) MATCH SIMPLE
                                              ON UPDATE CASCADE
                                              ON DELETE CASCADE)`;
    return queryString;
  },
};
