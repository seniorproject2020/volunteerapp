import mongoose from 'mongoose';
import express from 'express';
import bodyParser from "body-parser";
import passport from 'passport';
import {Hours} from '../models/hours.schema'


//req.user

exports.hours_logged = function(req, res) {
  console.log('inside hours_logged controller function');
  console.log(req.user);
  if (req.user) {
    var startDate = 
  }
  else {
    
  }

}