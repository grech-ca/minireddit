import { FC } from 'react';

import { Spinner } from 'reactstrap';

export const LoadingOverlay: FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center position-absolute w-100 h-100 top-0 left-0 right-0 bottom-0 bg-light bg-opacity-75">
      <Spinner color="dark" />
    </div>
  );
};

