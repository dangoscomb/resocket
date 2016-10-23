import io from 'socket.io-client';
import chai, { expect } from 'chai';
import noop from 'lodash.noop';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SocketMock from 'socket-io-mock';
import Resocket from '../src/resocket';

chai.use(sinonChai);

/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

describe('Resocket', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#connect', () => {
    it('should establish a connection', () => {
      sandbox.spy(io, 'connect');
      Resocket.connect('url');
      expect(io.connect).to.have.been.calledWith('url');
    });

    it('should not establish a connection if not authenticated', () => {
      sandbox.spy(io, 'connect');
      Resocket.connect('url', { auth: false });
      expect(io.connect).to.not.have.been.called;
    });

    it('should throw if not authenticated', () => {
      sandbox.spy(console, 'error');
      Resocket.connect('url', { auth: false });
      expect(console.error).to.have.been.calledWith('An error has been occurred while creating a connection.');
    });
  });

  describe('#on', () => {
    it('should call on method of socket', (done) => {
      Resocket.socket = new SocketMock();
      sandbox.spy(Resocket.socket, 'on');
      Resocket.on('event', noop);
      expect(Resocket.socket.on).to.have.been.called;
      done();
    });
  });

  describe('#emit', () => {
    it('should call emit method of socket', (done) => {
      Resocket.socket = new SocketMock();
      sandbox.spy(Resocket.socket, 'emit');
      Resocket.emit('event', 'data');
      expect(Resocket.socket.emit).to.have.been.calledWith('event', 'data');
      done();
    });
  });

  describe('#removeListener', () => {
    it('should call removeListener once if event name is a string', (done) => {
      Resocket.socket = new SocketMock();
      Resocket.socket = Object.assign({}, Resocket.socket, { removeListener: sandbox.spy() });
      Resocket.removeListener('event');
      expect(Resocket.socket.removeListener).to.have.been.calledWith('event');
      done();
    });

    it('should call removeListener based on the number of events passed if event name is an array', (done) => {
      Resocket.socket = new SocketMock();
      Resocket.socket = Object.assign({}, Resocket.socket, { removeListener: sandbox.spy() });
      Resocket.removeListener(['event', 'another event']);
      expect(Resocket.socket.removeListener.callCount).to.equal(2);
      done();
    });

    it('should throw if event names is of invalid type', (done) => {
      Resocket.socket = new SocketMock();
      Resocket.socket = Object.assign({}, Resocket.socket, { removeListener: noop });
      sandbox.spy(console, 'error');
      Resocket.removeListener({});
      expect(console.error).to.have.been.calledWith('Event names should either be an array of strings or just a string.');
      done();
    });
  });

  describe('#removeListeners', () => {
    it('should call removeAllListeners method of socket', (done) => {
      Resocket.socket = new SocketMock();
      Resocket.socket = Object.assign({}, Resocket.socket, { removeAllListeners: sandbox.spy() });
      Resocket.removeAllListeners();
      expect(Resocket.socket.removeAllListeners).to.have.been.called;
      done();
    });
  });
});
