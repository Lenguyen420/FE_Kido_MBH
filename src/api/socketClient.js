import { io } from "socket.io-client";
import { getAccessToken } from "./authSession";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

let socket;
let dashboardRefreshTimer;
const dashboardSubscribers = new Set();

export const SOCKET_EVENTS = {
  ORDER_CREATED: "order:created",
  ORDER_UPDATED: "order:updated",
  ORDER_STATUS_CHANGED: "order:status-changed",
  ORDER_DELETED: "order:deleted",
  DASHBOARD_UPDATED: "dashboard:updated",
};

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }

  socket.auth = { token: getAccessToken() };
  return socket;
};

export const connectSocket = () => {
  const activeSocket = getSocket();

  if (!activeSocket.connected) {
    activeSocket.connect();
  }

  return activeSocket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};

export const joinOrders = (payload = {}) => {
  connectSocket().emit("orders:join", payload);
};

export const leaveOrders = (payload = {}) => {
  getSocket().emit("orders:leave", payload);
};

export const joinDashboard = (payload = {}) => {
  connectSocket().emit("dashboard:join", payload);
};

export const leaveDashboard = (payload = {}) => {
  getSocket().emit("dashboard:leave", payload);
};

const notifyDashboardSubscribers = () => {
  clearTimeout(dashboardRefreshTimer);
  dashboardRefreshTimer = setTimeout(() => {
    dashboardSubscribers.forEach((listener) => listener());
  }, 250);
};

export const subscribeDashboardUpdates = (listener) => {
  const activeSocket = getSocket();
  const isFirstSubscriber = dashboardSubscribers.size === 0;
  dashboardSubscribers.add(listener);

  if (isFirstSubscriber) {
    activeSocket.on(SOCKET_EVENTS.DASHBOARD_UPDATED, notifyDashboardSubscribers);
    joinDashboard();
  }

  return () => {
    dashboardSubscribers.delete(listener);

    if (dashboardSubscribers.size === 0) {
      clearTimeout(dashboardRefreshTimer);
      activeSocket.off(
        SOCKET_EVENTS.DASHBOARD_UPDATED,
        notifyDashboardSubscribers
      );
    }
  };
};
