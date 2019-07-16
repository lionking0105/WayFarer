import jwt from 'jsonwebtoken';
import Trip from '../models/tripModel';

export default {
  async createTrip(req, res) {
    try {
      const { body } = req;
       if (!body.bus_id || !body.origin || !body.destination || !body.trip_date || !body.fare || !body.status) {
        return res.status(400).json({ status: 'error', error: 'Please provide all trips info' });
      }

      const trip = new Trip(req.body);
      const newTrip = await trip.save();
      newTrip.trip_id = newTrip.id;

      return res.status(201).json({ status: 'Success', data: newTrip });
    } catch (error) {
      throw error;
    }
  },

  async getAllTrips(req, res) {
    try {
      const allTrips = await Trip.findAll();
      if (!allTrips.length) {
        return res.status(200).send({ status: 'No Trips yet', data: [] });
      }
      return res.status(200).json({ status: 'Success', data: allTrips });
    } catch (error) {
      throw error;
    }
  },

  async getOneTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);
    try {
      const oneTrip = await Trip.findById(tripId);
      return res.status(200).json({ status: 'Success', data: oneTrip });
    } catch (error) {
      throw error;
    }
  },

  async updateTrip(req, res) {
    const { tripId } = req.params;
    if (tripId == null) {
      res.status(400).send({ status: 'error', error: 'A valid trip Id is required' });
    }

    try {
      const trip = await Trip.findById(tripId);
      if (!trip.id) {
        res.status(200).send({ status: 'error', error: 'trip not found' });
      }

      trip.bus_id = req.body.bus_id;
      trip.origin = req.body.origin;
      trip.destination = req.body.destination;
      trip.trip_date = req.body.trip_date;
      trip.fare = req.body.fare;
      trip.status = req.body.status;
      const updatedTrip = await trip.update();

      res.status(200).json({ status: 'Trip updated successfully', data: updatedTrip });
    } catch (error) {
      throw error;
    }
  },

  async deleteTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);

    if (!tripId || Number.isNaN(tripId)) {
      return res.status(400).send({ status: 'error', error: 'A valid trip Id is required' });
    }

    try {
      await Trip.delete(tripId);
      return res.status(200).json({ status: 'Trip deleted successfully', data: [] });
    } catch (error) {
      throw error;
    }
  },
};
