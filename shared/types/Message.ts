export interface Message {
  id: string;
  senderName: string;
  userId: string;
  text: string;
  createdAt: { nanoseconds: number, seconds: number };
}