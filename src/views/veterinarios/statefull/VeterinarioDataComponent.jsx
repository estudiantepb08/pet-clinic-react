import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../common/useFetch';
import { VeterinarioVista } from '../stateless/VeterinarioVista';

export const VeterinarioData = () => {
  const { data, error, ok } = useFetch(process.env.REACT_APP_MS_VETERINARIO2);

  return (
    <>
      { <VeterinarioVista data={data?.data} />}
    </>
  );
};
