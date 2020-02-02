'use strict';

/**
 * Сделано дополнительное задание: реализованы методы several и through.
 */
const isExtraTaskSolved = true;

module.exports = {
  getEmitter,

  isExtraTaskSolved
};

/**
 * Получение нового Emitter'а
 * @returns {Object}
 */
function getEmitter() {
  const eventListenerMapping = new Map();

  function addEventListener(event, context, handler) {
    const eventListeners = eventListenerMapping.get(event);

    if (!eventListeners) {
      eventListenerMapping.set(event, [{ context, handler }]);
    } else {
      eventListeners.push({ context: context, handler: handler });
    }
  }
  function removeEventListeners(event, context) {
    for (const e of eventListenerMapping.keys()) {
      if (e === event || e.startsWith(event + '.')) {
        const eventListeners = eventListenerMapping.get(e);

        eventListenerMapping.set(
          e,
          eventListeners.filter(eventListener => eventListener.context !== context)
        );
      }
    }
  }
  function findEventListeners(event) {
    const result = [];
    let myEvent = event;
    let myEventDot = -1;

    do {
      const eventListeners = eventListenerMapping.get(myEvent);

      if (eventListeners) {
        result.push(eventListeners);
      }
      myEventDot = myEvent.lastIndexOf('.');
      myEvent = myEvent.substring(0, myEventDot);
    } while (myEventDot !== -1);

    return result;
  }

  return {
    /**
     * Подписка на событие
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     */
    on: function(event, context, handler) {
      addEventListener(event, context, handler);

      return this;
    },

    /**
     * Отписка от события
     * @param {string} event
     * @param {Object} context
     */
    off: function(event, context) {
      removeEventListeners(event, context);

      return this;
    },

    /**
     * Уведомление о событии
     * @param {string} event
     */
    emit: function(event) {
      for (const eventListeners of findEventListeners(event)) {
        for (const { context, handler } of eventListeners) {
          handler.call(context);
        }
      }

      return this;
    },

    /**
     * Подписка на событие с ограничением по количеству отправляемых уведомлений
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     * @param {number} times Сколько раз отправить уведомление
     */
    several: function(event, context, handler, times) {
      let myHandler = handler;

      if (times > 0) {
        let count = 0;

        myHandler = function() {
          if (count < times) {
            handler.call(context);
            count++;
          }
        };
      }

      return this.on(event, context, myHandler);
    },

    /**
     * Подписка на событие с ограничением по частоте отправки уведомлений
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     * @param {number} frequency Как часто уведомлять
     */
    through: function(event, context, handler, frequency) {
      let myHandler = handler;

      if (frequency > 0) {
        let count = 0;

        myHandler = function() {
          if (count === 0) {
            handler.call(context);
          }
          count = (count + 1) % frequency;
        };
      }

      return this.on(event, context, myHandler);
    }
  };
}
