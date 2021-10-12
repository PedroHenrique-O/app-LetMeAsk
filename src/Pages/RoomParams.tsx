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
    likeId: string | undefined;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
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
  likeCount: number;
  likeId: string | undefined;
};
