import io, { Socket } from "socket.io-client";

const API_URL: string = `http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost'}:${process.env.NEXT_PUBLIC_API_PORT || '3000'}`;
export const socket: typeof Socket = io(API_URL);