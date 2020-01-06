import React from 'react';
import { connect } from 'react-redux';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';


const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const Users = (props) => {
  let users = props.users.map((user) => {
    return (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.count}</TableCell>
      </TableRow>
    );
  });
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>Users</TableCell>
          <TableCell>Blogs Count</TableCell>
        </TableHead>
        { users }
      </Table>
    </TableContainer>
  );
};

export default connect(mapStateToProps)(Users);