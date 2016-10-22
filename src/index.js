const resocket = {
  socket: null,
  connect: (params) => {
    resocket.socket.connect(params, { reconnect: true });
  },
  emit: (event, payload) => {
    if (resocket.socket) {
      resocket.socket.emit(event, payload);
    }
  },
  on: (event, next) => {
    if (resocket.socket) {
      resocket.socket.on(event, payload => { // eslint-disable-line arrow-parens
        next(payload);
      });
    }
  },
  removeListener: (event) => {
    if (resocket.socket) {
      resocket.socket.removeListener(event);
    }
  },
};

export default resocket;
