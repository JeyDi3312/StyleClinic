package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.InformeActividad;
import com.example.demo.Repositorios.RepositorioIA;

@Service
public class ServicioIA {
    @Autowired
    RepositorioIA repositorioIA;
    
    public InformeActividad guardarinforme(InformeActividad informeactividad){
        return repositorioIA.save(informeactividad);
    }
    public Optional<InformeActividad> obtenerporid(String idia){
        return repositorioIA.findById(idia);
    }
    public ArrayList<InformeActividad> obtenerInformeActividad(){
        return (ArrayList<InformeActividad>) repositorioIA.findAll();
    }
    public ArrayList<InformeActividad> obtenerporfecha(String fecha){
        return (ArrayList<InformeActividad>) repositorioIA.findByfechaia(fecha) ;
    }

    public String eliminarInformeActividad(String idInformeActividad){
        try {
            repositorioIA.deleteById(idInformeActividad);
            return "Informe eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando Informe" + err;
        }
    }
    
}
