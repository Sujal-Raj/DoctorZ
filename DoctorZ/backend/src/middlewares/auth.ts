import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import doctorModel from '../models/doctor.model.js';
import patientModel from '../models/patient.model.js';


/// Doctor token verification
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Check if token is actually present
    if (!token) {
      return res.status(401).json({ message: 'Token is undefined or missing' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    const doctor = await doctorModel.findById(decoded.id).select('-password');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    req.body.doctor = doctor;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};



// patient verificatuion 
export const verifyPatientToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token is undefined or missing' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    const patient = await patientModel.findById(decoded.id).select('-password');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    req.body.patient = patient;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};