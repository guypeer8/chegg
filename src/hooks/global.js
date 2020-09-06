import { useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';

import { setResolution } from '../store/actions/global';

export const useGlobalResolution = () => {
  const dispatch = useDispatch();

  useEffect(function onWindowSizeChange() {
    const onResize = () => {
      const windowWidth = window.innerWidth;

      const device = (() => {
        if (windowWidth < 768) return 'mobile';
        if (windowWidth < 1024) return 'tablet';
        return 'desktop';
      })();

      dispatch(setResolution(device, windowWidth));
    };

    const onDebouncedResize = debounce(onResize, 1000);
    window.addEventListener('resize', onDebouncedResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onDebouncedResize);
    };
  }, [dispatch]);
};