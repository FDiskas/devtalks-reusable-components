import React from 'react';

import { User } from '../interfaces';

type Props = {
  data: User;
};

export const ListItem = ({ data }: Props) => (
  <div>
    {data.id}: {data.name}
  </div>
);
