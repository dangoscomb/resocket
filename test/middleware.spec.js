import configureStore from 'redux-mock-store';
import chai, { expect } from 'chai';
import noop from 'lodash.noop';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SocketMock from 'socket-io-mock';
import createResocketMiddleware from '../src/middleware';
import Resocket from '../src/resocket';

chai.use(sinonChai);

/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

describe('createResocketMiddleware', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when passed invalid arguments for emit list', () => {
    it('should throw a console error', () => {
      Resocket.socket = {};

      sandbox.spy(console, 'error');

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, 'string');
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const removeListener = { type: 'action' };
      store.dispatch(removeListener);

      expect(console.error).to.have.been.calledWith('Event names should be an array of strings');
    });
  });

  describe('when REMOVE_LISTENER_FROM action is triggered', () => {
    it('should remove listening from event', () => {
      Resocket.socket = {
        removeListener: sandbox.spy(),
        on: noop,
        emit: noop,
      };

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, ['EVENTS']);
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const removeListener = { type: 'REMOVE_LISTENER_FROM', payload: 'EVENT' };

      store.dispatch(removeListener);
      expect(Resocket.socket.removeListener).to.have.been.calledWith('EVENT');
    });
  });

  describe('when REMOVE_LISTENERS_FROM action is triggered', () => {
    it('should remove listening from events', () => {
      Resocket.socket = {
        removeListener: sandbox.spy(),
        on: noop,
        emit: noop,
      };

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, ['message', 'update']);
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const removeListeners = { type: 'REMOVE_LISTENERS_FROM', payload: ['message', 'update'] };

      store.dispatch(removeListeners);

      expect(Resocket.socket.removeListener.callCount).to.equal(2);
    });
  });

  describe('when payload is of invalid type and REMOVE_LISTENERS_FROM or REMOVE_LISTENER_FROM is dispatched', () => {
    it('should throw', () => {
      Resocket.socket = {};

      sandbox.spy(console, 'error');

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, 'string');
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const removeListener = { type: 'REMOVE_LISTENER_FROM', payload: {} };

      store.dispatch(removeListener);
      expect(console.error).to.have.been.calledWith('Event names should be an array of strings');

      const removeListeners = { type: 'REMOVE_LISTENERS_FROM', payload: {} };

      store.dispatch(removeListeners);
      expect(console.error).to.have.been.calledWith('Event names should be an array of strings');
    });
  });


  describe('when ADD_LISTENER_TO action is triggered', () => {
    it('should call socket on method', (done) => {
      Resocket.socket = new SocketMock();
      Resocket.socket = Object.assign({}, Resocket.socket, { removeListener: noop });
      const spy = sandbox.spy(Resocket.socket, 'on');

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, ['event']);
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const addListener = { type: 'ADD_LISTENER_TO', payload: 'event' };
      store.dispatch(addListener);

      expect(spy).to.have.been.called;

      done();
    });
  });


  describe('when ADD_LISTENERS_TO action is triggered', () => {
    it('call socket on method', (done) => {
      Resocket.socket = new SocketMock();
      Resocket.socket = Object.assign({}, Resocket.socket, { removeListener: noop });
      const spy = sandbox.spy(Resocket.socket, 'on');

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, ['event', 'message']);
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const addListener = { type: 'ADD_LISTENERS_TO', payload: ['event', 'message'] };
      store.dispatch(addListener);

      expect(spy.callCount).to.equal(2);

      done();
    });
  });

  describe('when payload is of invalid type and ADD_LISTENERS_TO or ADD_LISTENERS_TO is dispatched', () => {
    it('should throw', () => {
      Resocket.socket = {};

      sandbox.spy(console, 'error');

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, 'string');
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const addListener = { type: 'ADD_LISTENER_TO', payload: {} };

      store.dispatch(addListener);
      expect(console.error).to.have.been.calledWith('Event names should be an array of strings');

      const addListeners = { type: 'ADD_LISTENERS_TO', payload: {} };

      store.dispatch(addListeners);

      expect(console.error).to.have.been.calledWith('Event names should be an array of strings');
    });
  });

  describe('when REMOVE_ALL_LISTENERS action is triggered', () => {
    it('should remove listening from every single event', () => {
      const socket = {
        removeAllListeners: sandbox.spy(),
        on: noop,
        emit: noop,
      };

      const resocketMiddleware = createResocketMiddleware(socket, ['events']);
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      const removeListeners = { type: 'REMOVE_ALL_LISTENERS' };

      store.dispatch(removeListeners);
      expect(socket.removeAllListeners).to.have.been.called;
    });
  });

  describe('when an action is performed that matches an event in the list of events to emit passed as the second argument', () => {
    it('should not call emit if events list in not an array', () => {
      Resocket.socket = new SocketMock();
      sandbox.spy(Resocket.socket, 'emit');

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, 'event as string');
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      store.dispatch({ type: 'event as string' });
      expect(Resocket.socket.emit).to.not.have.been.called;
    });

    it('should call emit if dispatched action type matches the events list', () => {
      Resocket.socket = new SocketMock();
      sandbox.spy(Resocket.socket, 'emit');

      const resocketMiddleware = createResocketMiddleware(Resocket.socket, ['emit', 'emit again']);
      const middlewares = [resocketMiddleware];
      const mockStore = configureStore(middlewares);

      const store = mockStore({});
      store.dispatch({ type: 'emit' });
      store.dispatch({ type: 'emit again' });

      expect(Resocket.socket.emit).to.have.been.called;
      expect(Resocket.socket.emit.callCount).to.equal(2);
    });
  });
});
