export type RootStackParamList = {
  Root: undefined;
  ChatRoom: { name: string };
  Contacts: { user: string };
  NotFound: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: { status: string, user: string } ;
  Calls: undefined;
};

export type ChatsParamList = {
  ChatsScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: string;
  name: string;
  imageUri: string;
  status: string;
}

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

export type ChatRoom = {
  id: string;
  users: User[];
  lastMessage: Message;
};
