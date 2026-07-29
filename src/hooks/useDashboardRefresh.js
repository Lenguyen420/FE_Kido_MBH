import { useSyncExternalStore } from "react";
import { subscribeDashboardUpdates } from "../api/socketClient";

let revision = 0;
const revisionSubscribers = new Set();
let unsubscribeSocket;

const handleDashboardUpdated = () => {
  revision += 1;
  revisionSubscribers.forEach((listener) => listener());
};

const subscribe = (listener) => {
  revisionSubscribers.add(listener);

  if (revisionSubscribers.size === 1) {
    unsubscribeSocket = subscribeDashboardUpdates(handleDashboardUpdated);
  }

  return () => {
    revisionSubscribers.delete(listener);

    if (revisionSubscribers.size === 0) {
      unsubscribeSocket?.();
      unsubscribeSocket = undefined;
    }
  };
};

const getSnapshot = () => revision;

export const useDashboardRefresh = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
