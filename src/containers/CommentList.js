import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentList from "../components/CommentList";
import { initComments, deleteComment } from "../reducers/comments";
class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func,
  };
  componentWillMount() {
    this._loadComments();
  }
  _loadComments() {
    //从localStorage中获取评论数据
    let comments = localStorage.getItem("comments");
    //对评论数据进行初始定义
    comments = comment ? JSON.parse(comments) : [];
    //调用connect传进来的initComments进行初始化数据
    this.props.initComments(comments);
  }
  handleDeleteComment(index) {
    const { comments } = this.props;
    //props是不能修改的
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1),
    ];
    localStorage.setItem("comments", JSON.stringify(comments));
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }
  render() {
    return (
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initComments: (comments) => {
      dispatch(initComments(comments));
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer);
