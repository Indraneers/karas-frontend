declare module 'react-json-view-compare' {
  import { ComponentType } from 'react';
  
  interface JsonCompareProps {
    oldData: object;
    newData: object;
    // Add other props you use from the library
  }
  
  const JsonCompare: ComponentType<JsonCompareProps>;
  export default JsonCompare;
}