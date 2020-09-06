export const setModal = modal => 
  ({ type: 'SET_MODAL', payload: { modal } });

export const setResolution = (device, size) =>
  ({ type: 'SET_RESOLUTION', payload: { resolution: { device, size } } });