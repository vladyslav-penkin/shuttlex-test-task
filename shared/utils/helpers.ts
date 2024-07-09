export const getRoomId = (userId1: string, userId2: string) => {
  const sortedIds = [userId1, userId2].sort();
  const roomId = sortedIds.join('-');
  return roomId;
};

export const sliceLastMessage = (message: string) => {
  const maxLength = 20;
  return message.length > maxLength
    ? message.slice(0, maxLength) + '...'
    : message;
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const formattedData = day + ' ' + month;
  return formattedData;
};