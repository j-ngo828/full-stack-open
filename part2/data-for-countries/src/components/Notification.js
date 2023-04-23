import React from 'react';
import './Notification.css';

const Notification = ({ message }) => message && <div className="errorNotification">{message}</div>;

export default Notification;
