package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.Solicitudes;

import java.util.ArrayList;


@Repository
public interface RepositorioSolicitudes extends CrudRepository <Solicitudes, String>{
    public abstract ArrayList<Solicitudes> findByfechasolicitud(String fechasolicitud);
   
    
}
