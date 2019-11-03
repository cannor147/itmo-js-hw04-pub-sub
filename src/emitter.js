'use strict';

/**
 * Сделано дополнительное задание: реализованы методы several и through.
 */
const isExtraTaskSolved = false;

/**
 * Получение нового Emitter'а
 * @returns {Object}
 */
function getEmitter() {
  return {
    /**
     * Подписка на событие
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     */
    on: function(event, context, handler) {
      console.info(event, context, handler);
    },

    /**
     * Отписка от события
     * @param {string} event
     * @param {Object} context
     */
    off: function(event, context) {
      console.info(event, context);
    },

    /**
     * Уведомление о событии
     * @param {string} event
     */
    emit: function(event) {
      console.info(event);
    },

    /**
     * Подписка на событие с ограничением по количеству отправляемых уведомлений
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     * @param {number} times Сколько раз отправить уведомление
     */
    several: function(event, context, handler, times) {
      console.info(event, context, handler, times);
    },

    /**
     * Подписка на событие с ограничением по частоте отправки уведомлений
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     * @param {number} frequency Как часто уведомлять
     */
    through: function(event, context, handler, frequency) {
      console.info(event, context, handler, frequency);
    }
  };
}

module.exports = {
  getEmitter,

  isExtraTaskSolved
};
