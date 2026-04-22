"use client";
import { useEffect } from "react";
import { useSocket } from "./use-socket";

export function useEvent<T>(topic: string, handler: (data: T) => void) {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on(topic, handler);
    return () => {
      socket.off(topic, handler);
    };
  }, [socket, topic, handler]);
}
