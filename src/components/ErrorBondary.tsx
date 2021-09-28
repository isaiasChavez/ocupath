import { Box } from '@material-ui/core';
import { Result } from 'antd';
import React from 'react'

class ErrorBoundary extends React.Component<any, any> {
 constructor(props) {
   super(props);
   this.state = { hasError: false };
 }

 static getDerivedStateFromError(error) {
   // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
   return { hasError: true };
 }

 componentDidCatch(error, errorInfo) {
   // También puedes registrar el error en un servicio de reporte de errores
 }

 render() {
   if (this.state.hasError) {
     // Puedes renderizar cualquier interfaz de repuesto
     return <Box position="fixed" top={0} left={0} right={0} bottom={0} display="flex" justifyContent="center" alignItems="center">
       <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  />
     </Box>;
   }

   return this.props.children; 
 }
}
export default ErrorBoundary