//action types
const INIT_COMMENTS = "INIT_COMMENTS";
const ADD_COMMENTS = "ADD_COMMENTS";
const DELETE_COMMENTS = "DELETE_COMMENTS";
//reducer
export default function (state, action) {
  if (!state) {
    state = { comments: [] };
  }
  switch (action.type) {
    //初始化评论
    case INIT_COMMENTS:
      return { comments: action.comments };
    //新增评论
    case ADD_COMMENTS:
      return {
        coments: [...state.comments, action.comment],
      };
    case DELETE_COMMENTS:
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1),
        ],
      };
    default:
      //返回的数据状态state
      return state;
  }
}
//action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments };
};

export const addComment = (comment) => {
  return {
    type: ADD_COMMENTS,
    comment,
  };
};

export const deleteComment = (commentIndex) => {
  return {
    type: DELETE_COMMENTS,
    commentIndex,
  };
};
