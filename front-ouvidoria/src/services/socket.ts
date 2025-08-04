import io, { Socket } from "socket.io-client";

const API_URL: string = `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT || '3000'}`;
export const socket: typeof Socket = io(API_URL);