import React from "react";
// import { useSelector } from "react-redux";
// import { notificationDataSelector } from "redux-state/selectors/notificationsSelector";
import NOTIFICATION_TYPES  from "constants";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

import "react-notifications/lib/notifications.css";

const NotificationHandler = () => {
  const notification ={}// useSelector(notificationDataSelector);
  const { type, text, description } = notification;

  try {
    switch (type) {
      case NOTIFICATION_TYPES.INFO:
        NotificationManager.info("Info message");
        break;
      case NOTIFICATION_TYPES.SUCCESS:
        NotificationManager.success(text || "Success!", description);
        break;
      case NOTIFICATION_TYPES.WARNING:
        NotificationManager.warning(text || "Warning message", description);
        break;
      case NOTIFICATION_TYPES.ERROR:
        NotificationManager.error(text || "Error", description);
        break;
      default:
        throw new Error("invalid notification");
    }
  } catch (e) {
    console.log("e", e);
  }

  return <NotificationContainer />;
};

export default NotificationHandler;
