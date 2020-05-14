import React, { Component } from "react";
import PropTypes from "prop-types";
//从props获取数据
class CommentInput extends Component {
  static propTypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func,
  };
  static defaultProps = {
    username: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      username: props.username, //从props上获取username字段
      content: "",
    };
  }
  componentDidMount() {
    this.textarea.focus();
  }
  //用户名的输入框 blur的时候需要保存 username 到 LocalStorage 的行为
  //也通过 props.onUserNameInputBlur 传递到上层去做。
  handleUsernameBlur(e) {
    if (this.props.onUserNameInputBlur) {
      //e.target.value 为输入的信息
      this.props.onUserNameInputBlur(e.target.value);
    }
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  handleContentChange(e) {
    this.setState({
      content: e.target.value,
    });
  }
  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date(),
      });
    }
    this.setState({ content: "" });
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容</span>
          <div className="comment-field-input">
            <textarea
              ref={(textarea) => (this.textarea = textarea)}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>提交</button>
        </div>
      </div>
    );
  }
}
export default CommentInput;
