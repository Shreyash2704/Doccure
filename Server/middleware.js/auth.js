const jwt = require("jsonwebtoken");

const Patient = require("../model/patient");
const Doctor = require("../model/doctor");
const Admin = require("../model/admin");
const Lab = require('../model/lab')

exports.patientAuth = async (req, res, next) => {
    try {
      // Get the token from the header
      const token = req.header("x-auth-token");
      // Check if no token
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }
  
      const decoded = jwt.verify(token, "DoccureSecretKey");
      const user = await Patient.findById(decoded.user_id);
      if (user === null) {
        return res.status(401).json({ msg: "User does not exist" });
      }
      req.user = user;
      res.locals.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ msg: "Authorization failed" });
    }
  };

  exports.doctorAuth = async (req, res, next) => {
    try {
      // Get the token from the header
      const token = req.header("x-auth-token");
     
      // Check if no token
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }
  
      const decoded = jwt.verify(token, "DoccureSecretKey");
      const user = await Doctor.findById(decoded.user_id);
      if (user === null) {
        return res.status(401).json({ msg: "User does not exist" });
      }
      req.user = user;
      res.locals.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ msg: "Authorization failed" });
    }
  };

  exports.adminAuth = async (req, res, next) => {
    try {
      // Get the token from the header
      const token = req.header("x-auth-token");
     
      // Check if no token
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }
  
      const decoded = jwt.verify(token, "DoccureSecretKey");
      const user = await Admin.findById(decoded.user_id);
      if (user === null) {
        return res.status(401).json({ msg: "User does not exist" });
      }
      req.user = user;
      res.locals.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ msg: "Authorization failed" });
    }
  };

  exports.labAuth = async (req, res, next) => {
    try {
      // Get the token from the header
      const token = req.header("x-auth-token");
     
      // Check if no token
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }
  
      const decoded = jwt.verify(token, "DoccureSecretKey");
      const user = await Lab.findById(decoded.user_id);
      if (user === null) {
        return res.status(401).json({ msg: "User does not exist" });
      }
      req.user = user;
      res.locals.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ msg: "Authorization failed" });
    }
  };