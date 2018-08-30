import {Button} from "reactstrap";
import {toggle_menu} from "../redux/actions/index";
import {connect} from "react-redux";
import React from 'react';

const MenuButton = props => {
    return <Button onClick={props.toggleMenu}>Menu</Button>
};

const mapDispatchToProps = (dispatch) => {
  return {
      toggleMenu: () => dispatch(toggle_menu())
  }
};

export default connect(null, mapDispatchToProps)(MenuButton);