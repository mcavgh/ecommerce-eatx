import React, { useEffect } from 'react';
import { Button, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { DestroyUsuario, getUsers, postAdmin, postUserAccess } from '../../store/user/user.action';
import Title from '../admin/adminOrders/Title';
import { Link } from 'react-router-dom'

export default function FormAdmin() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userReducer?.users);

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);

  function PromoverAdmin(row) {
     dispatch(postAdmin(row.id))
  }

  function PromoverUser(row) {
     dispatch(postUserAccess(row.id))
  }

  function BorrarUsuario(row) {
     dispatch( DestroyUsuario(row.id))
  }

  return (
    <React.Fragment>
      <Title>Usuarios</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Access</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users[0] ?

            (users.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name} {row.surname} </TableCell>
                <TableCell>{row.access}</TableCell>
                <TableCell>{row.email}</TableCell>
                <Button variant="contained" color="primary" onClick={(e) => PromoverAdmin(row)}>
                  Promover a Admin
              </Button>
              <Button variant="contained"  onClick={(e) => PromoverUser(row)}>
                  Promover a User
              </Button>
              <Button variant="contained" color="primary" onClick={(e) => BorrarUsuario(row)}>
                  Borrar Usuario
              </Button>
              </TableRow>
            ))
            ) : ("no hay usuarios")
          }
        </TableBody>
      </Table>
      <ListItem button to="/" component={Link}>
                        <ListItemText  primary="Volver a Home" />
                    </ListItem>
    </React.Fragment>
  );
}



