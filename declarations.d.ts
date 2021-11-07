declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.jpg';
declare module '*.png';
declare module '*.mp3';
declare module 'react-katex' {
  function InlineMath(props: { math: string; renderError?: (error: Error) => unknown; children?: string });
  function BlockMath(props: { math: string; renderError?: (error: Error) => unknown; children?: string });
}
