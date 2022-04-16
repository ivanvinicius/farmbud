/* eslint-disable */

declare module React {
  export default interface RefObject<T>{
    current: T | null;
  }
}
