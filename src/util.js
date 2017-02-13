import React from 'react';

// i am not extending 'prototype' property, because i don't like this approach

export const DateUtil = {
  formatDate: (date) => {
    const d = new Date(date);
    const now = new Date();
    let day = null;

    const millSecInDay = 1000 * 60 * 60 * 24;

    // FIXME: possible timezone bugs
    if ((now.getTime() - d.getTime()) <  millSecInDay) {
      day = 'сегодня';
    } else if ((now.getTime() - d.getTime()) <  2 * millSecInDay) {
      day = 'вчера';
    } else {
      day = d.toLocaleDateString();
    }

    return `${day}, ${d.toLocaleTimeString()}`;
  }
};

export const ArrayUtil = {
  arraysAreEqual: (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }
};

export const StringUtil = {
  nl2br: str => str.replace(new RegExp(/\/\r\/\n/, 'g'), '<br>'),
  br2nl: str => str.replace(new RegExp(/<br>/, 'g'), '\r\n')
};
