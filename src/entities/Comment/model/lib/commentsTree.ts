import { ExtendedComment } from '../types/comment';

export interface CommentWithChildren extends ExtendedComment {
  children: CommentWithChildren[];
}

export const commentsTree = (comments: ExtendedComment[]) => {
  const commentMap: { [id: string]: CommentWithChildren } = {};
  const tree: CommentWithChildren[] = [];

  comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, children: [] };
  });

  comments.forEach((comment) => {
    const parentComment = comment.replyToId
      ? commentMap[comment.replyToId]
      : undefined;
    if (parentComment) {
      parentComment.children.push(commentMap[comment.id]);
    } else {
      tree.push(commentMap[comment.id]);
    }
  });

  return { tree };
};
