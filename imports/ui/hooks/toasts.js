import { Random } from 'meteor/random';
import React, {
  createContext, useState, useContext, useRef,
} from 'react';

//
// From Bootstrap source:
// https://github.com/twbs/bootstrap/blob/v4.4.1/scss/_variables.scss#L261
//
const TOAST_ANIMATION_DURATION = 0.15 * 1000;

const ToastsContext = createContext();

export const ToastsProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const ref = useRef();
  ref.current = toasts;

  function setToastShow(id, show) {
    const newToasts = ref.current.map((t) => (
      t.id === id
        ? { ...t, show }
        : t
    ));

    setToasts(newToasts);
  }

  //
  // When we add a toast, we add it to the list first, then we show it.
  // When removing it, we hide it first, then remove it from the list.
  // This is so the animations on toasts look good.
  //

  function addToast(toast) {
    const id = Random.id();

    setToasts([
      ...ref.current,
      { ...toast, id, show: false },
    ]);

    setTimeout(() => setToastShow(id, true));
  }

  function removeToast(toast) {
    setToastShow(toast.id, false);

    setTimeout(() => {
      setToasts(toasts.filter((t) =>
        t.id !== toast.id));
    }, TOAST_ANIMATION_DURATION);
  }

  const context = {
    toasts,
    addToast,
    removeToast,
  };

  return <ToastsContext.Provider value={context}>{children}</ToastsContext.Provider>;
};

export const useToasts = () => useContext(ToastsContext);