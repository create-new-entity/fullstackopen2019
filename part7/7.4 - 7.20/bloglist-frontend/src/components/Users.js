import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
  let usersComponents = props.users.map((user) => {
    return (
      <TableRow key={user.id}>
        <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
        <TableCell>{user.count}</TableCell>
      </TableRow>
    );
  });
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell>Blogs Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { usersComponents }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default connect(mapStateToProps)(Users);