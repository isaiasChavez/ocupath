interface ScrollToTopProps {
 
}
 
const ScrollToTop: React.FC<ScrollToTopProps> = () => {
 window.scroll({
  top: 0,
  left: 0,
});
 return (  
  <>
  ASDF</>
 );
}
 
export default ScrollToTop;