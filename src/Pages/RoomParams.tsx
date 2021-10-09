export type RoomParams = {
  id: string;
};
export type FireBaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: false;
    isHighlighted: false;
  }
>;
export type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: false;

  isHighlighted: false;
};
