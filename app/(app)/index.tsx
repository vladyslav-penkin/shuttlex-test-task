import { FC, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Box, Center, Spinner } from '@gluestack-ui/themed';
import { ChatList } from '@components/ChatList';
import { useAuth } from '@hooks/useAuth';
import { User } from '@shared/types/User';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '@/firebaseConfig';

const HomeScreen: FC = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const getUsers = async () => {
    if (!user?.uid) return;
    
    const q = query(usersRef, where('userId', '!=', user.uid));
    const querySnapshot = await getDocs(q);

    const data: User[] = [];
    querySnapshot.forEach(doc => {
      data.push(doc.data() as User);
    });

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, [user?.uid]);

  return (
    <Box>
      {users.length > 0 ? (
        <ChatList users={users} currentUser={user} />
      ) : (
        <Center h="100%">
          <Spinner size="large" color="$indigo500" />
        </Center>
      )}
    </Box>
  );
};

export default HomeScreen;
