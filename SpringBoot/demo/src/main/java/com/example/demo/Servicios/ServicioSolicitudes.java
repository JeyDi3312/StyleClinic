package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.Solicitudes;
import com.example.demo.Repositorios.RepositorioSolicitudes;

@Service
public class ServicioSolicitudes {
    @Autowired
    RepositorioSolicitudes repositorioSolicitudes;
    
    public Solicitudes guardarSolicitudes(Solicitudes solicitudes){
        return repositorioSolicitudes.save(solicitudes);
    }
    public Optional<Solicitudes> obtenerporid(String solicitudes){
        return repositorioSolicitudes.findById(solicitudes);
    }
    public ArrayList<Solicitudes> obtenersolicitud(){
        return (ArrayList<Solicitudes>) repositorioSolicitudes.findAll();
    }
    public ArrayList<Solicitudes> obtenerporfecha(String fecha){
        return (ArrayList<Solicitudes>) repositorioSolicitudes.findByfechasolicitud(fecha) ;
    }

    public String eliminarSolicitud(String idsolicitud){
        try {
            repositorioSolicitudes.deleteById(idsolicitud);
            return "Reseña eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando reseña" + err;
        }
    }
    
}
