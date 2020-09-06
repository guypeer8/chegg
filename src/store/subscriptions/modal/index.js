const modalSubscriptions = store => {
  store.subscribe(() => {
    const { global } = store.getState();
    const { modal } = global;

    const modalOverlay = document.getElementById('modal-overlay');

    if (modal) {
      if (!modalOverlay.classList.contains('modal-open')) {
        modalOverlay.classList.add('modal-open');
      }
    } else {
      if (modalOverlay.classList.contains('modal-open')) {
        modalOverlay.classList.remove('modal-open');
      }
    }
  });
};

export default modalSubscriptions;
