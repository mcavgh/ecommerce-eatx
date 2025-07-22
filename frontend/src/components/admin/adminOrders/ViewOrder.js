import React, { useState, useEffect } from "react";
import s from "./ViewOrder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { cleanCart, putOrderById, getOrderById } from '../../../store/order/order.action';

export default function ViewOrder() {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({ state: "", address: "", });
  const orderId = useSelector((state) => state.orderReducer.orderId)

  useEffect(() => {
    dispatch(getOrderById(id))
  }, [dispatch,id])

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = function () {
    const data = {
      state: input.state === "" ? orderId.state : input.state,
      address: input.address === "" ? orderId.address : input.address,
    };
    dispatch(putOrderById(parseInt(orderId.id), data));
    setEdit(false)
  };

  const onClose = function () {
    history.push("/PageCheckoutOrders")
  };

  const onClean = function () {
    dispatch(cleanCart(id))
    history.push("/PageCheckoutOrders")

  };

  if (!orderId) {
    return (
      <div className={s.viewOrder}>
        <div className={s.content}>
          <h3>Cargando datos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={s.viewOrder}>
      <div className={s.content}>
        <h3>Panel de ordenes</h3>
        <div className={[s.info, s.topShadow].join(" ")}>
          <p>
            <span>Email: </span>
            {orderId.user && orderId.user.email}
          </p>
          <p>
            <span>Rol: </span>
            {orderId.user && orderId.user.access}
          </p>
        </div>
        <div className={[s.info, s.botShadow].join(" ")}>
          <p>
            <span>ID: </span>
            {orderId && orderId.id}
          </p>
          <p>
            <span>Estado: </span>
            {edit === true ? (
              <select
                required
                onChange={handleInputChange}
                name="state"
                id="state"
              >
                <option value="">Seleccione el nuevo estado</option>
                <option value="carrito">Carrito</option>
                <option value="procesando">Procesando</option>
                <option value="cancelada">Cancelada</option>
                <option value="completa">Completa</option>
              </select>
            ) : (
              orderId.state
            )}
          </p>
          <p>
            <span>Direccion: </span>
            {edit === true ? (
              <input
                onChange={handleInputChange}
                name="address"
                value={input.address}
                type="text"
              />
            ) : (
              orderId.address
            )}
          </p>
        </div>
        <table className={s.itemsTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
            </tr>
          </thead>
          <tbody>
            {orderId.products && orderId.products.map(function (product) {
              return (
                <tr key={product.id} id={product.id}>
                  <td align="center">{product.name}</td>
                  <td align="center">{product.stock}</td>
                  <td align="center">{product.order_line.quantity}</td>
                  <td align="center" >{product.price}</td>
                </tr>
              );
            })}
            <tr className={s.total}>
              <td></td>
              <td>Total:</td>
              <td>${parseFloat(orderId.price)}</td>
            </tr>
          </tbody>
        </table>
        <div className={s.actions}>
          <div className={s.editar}>
            <p>Editar</p>
            <label className={s.switch}>
              <input type="checkbox" onChange={() => setEdit(!edit)} />
              <span className={[s.slider, s.round].join(" ")}></span>
            </label>
          </div>
          <div>
            <button
              onClick={() => onSave()}
              className={[s.btn].join(" ")}
              disabled={!edit}
            >
              Guardar Cambios
            </button>
          </div>
          <div>
            {orderId.state && orderId.state === "carrito" && orderId.products?.length > 0 && (
              <button onClick={onClean} className={[s.btn].join(" ")}>
                Vaciar orden
              </button>
            )}
          </div>
          <div>
            <button
              className={[s.btn].join(" ")} onClick={onClose}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
