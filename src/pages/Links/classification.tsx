import * as React from 'react';
import Rating from '@mui/material/Rating';

interface IClassification{
    props: string
}
export default function Classification(props: IClassification) {
  const [value, setValue] = React.useState<number | null>(2);

  return (
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
  );
}