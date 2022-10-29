'use strict'

const { ArrayIsArray, ObjectSetPrototypeOf } = require('./primordials.js')

const { EventEmitter: EE } = require('../events/index.js')

function Stream(opts) {
  EE.call(this, opts)
}

ObjectSetPrototypeOf(Stream.prototype, EE.prototype)
ObjectSetPrototypeOf(Stream, EE)

Stream.prototype.pipe = function (dest, options) {
  const source = this

  function ondata(chunk) {
    //@ts-ignore
    if (dest.writable && dest.write(chunk) === false && source.pause) {
      //@ts-ignore
      source.pause()
    }
  }

  //@ts-ignore
  source.on('data', ondata)

  function ondrain() {
    //@ts-ignore
    //@ts-ignore
    if (source.readable && source.resume) {
      //@ts-ignore
      source.resume()
    }
  }

  dest.on('drain', ondrain) // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.

  if (!dest._isStdio && (!options || options.end !== false)) {
    //@ts-ignore
    source.on('end', onend)
    //@ts-ignore
    source.on('close', onclose)
  }

  let didOnEnd = false

  function onend() {
    if (didOnEnd) return
    didOnEnd = true
    dest.end()
  }

  function onclose() {
    if (didOnEnd) return
    didOnEnd = true
    if (typeof dest.destroy === 'function') dest.destroy()
  } // Don't leave dangling pipes when there are errors.

  function onerror(er) {
    cleanup()

    if (EE.listenerCount(this, 'error') === 0) {
      this.emit('error', er)
    }
  }

  prependListener(source, 'error', onerror)
  prependListener(dest, 'error', onerror) // Remove all the event listeners that were added.

  function cleanup() {
    //@ts-ignore
    source.removeListener('data', ondata)
    dest.removeListener('drain', ondrain)
    //@ts-ignore
    source.removeListener('end', onend)
    //@ts-ignore
    source.removeListener('close', onclose)
    //@ts-ignore
    source.removeListener('error', onerror)
    dest.removeListener('error', onerror)
    //@ts-ignore
    source.removeListener('end', cleanup)
    //@ts-ignore
    source.removeListener('close', cleanup)
    dest.removeListener('close', cleanup)
  }

  //@ts-ignore
  source.on('end', cleanup)
  //@ts-ignore
  source.on('close', cleanup)
  dest.on('close', cleanup)
  dest.emit('pipe', source) // Allow for unix-like usage: A.pipe(B).pipe(C)

  return dest
}

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn) // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn)
  else if (ArrayIsArray(emitter._events[event])) emitter._events[event].unshift(fn)
  else emitter._events[event] = [fn, emitter._events[event]]
}

module.exports = {
  Stream,
  prependListener
}
