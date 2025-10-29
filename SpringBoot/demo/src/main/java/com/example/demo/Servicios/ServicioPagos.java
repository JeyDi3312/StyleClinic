package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.Pagos;
import com.example.demo.Repositorios.RepositorioPagos;

@Service
public class ServicioPagos {
    @Autowired
    RepositorioPagos repositorioPagos;
    
    public Pagos guardarpagos(Pagos pagos){
        return repositorioPagos.save(pagos);
    }
    public Optional<Pagos> obtenerporid(String idpago){
        return repositorioPagos.findById(idpago);
    }
    public ArrayList<Pagos> obtenerPagos(){
        return (ArrayList<Pagos>) repositorioPagos.findAll();
    }
    public ArrayList<Pagos> obtenerporfecha(String fecha){
        return (ArrayList<Pagos>) repositorioPagos.findByfechapago(fecha) ;
    }

    public String eliminarPagos(String idpago){
        try {
            repositorioPagos.deleteById(idpago);
            return "Pago eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando pago" + err;
        }
    }
    
}
