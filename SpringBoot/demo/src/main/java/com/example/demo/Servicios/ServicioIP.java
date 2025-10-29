package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.InformePago;
import com.example.demo.Repositorios.RepositorioIP;

@Service
public class ServicioIP {
    @Autowired
    RepositorioIP repositorioIP;
    
    public InformePago guardarinforme(InformePago informepago){
        return repositorioIP.save(informepago);
    }
    public Optional<InformePago> obtenerporid(String idip){
        return repositorioIP.findById(idip);
    }
    public ArrayList<InformePago> obtenerInformePago(){
        return (ArrayList<InformePago>) repositorioIP.findAll();
    }
    public ArrayList<InformePago> obtenerporfecha(String fecha){
        return (ArrayList<InformePago>) repositorioIP.findByfechaip(fecha) ;
    }

    public String eliminarInformePago(String idip){
        try {
            repositorioIP.deleteById(idip);
            return "Informe eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando Informe" + err;
        }
    }
    
}
