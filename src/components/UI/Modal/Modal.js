import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.scss";

class Modal extends Component {
  //Check to update only if the show props changed or content in the Modal changed
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop
          show={this.props.show}
          onclick={this.props.handleBackdropClick}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;