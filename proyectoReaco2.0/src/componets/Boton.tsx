import type { ReactNode } from "react";

interface Props {
    children: ReactNode



}


function Boton( {children}: Props){
    return  <button type="submit" className="btn-primary">{children}</button>



}

export default Boton;
