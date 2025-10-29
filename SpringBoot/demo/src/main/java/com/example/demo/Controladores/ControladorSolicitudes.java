package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.Solicitudes;
import com.example.demo.Servicios.ServicioSolicitudes;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/solicitudes")
public class ControladorSolicitudes {
    @Autowired
    ServicioSolicitudes servicioSolicitudes;

    @GetMapping()
    public ArrayList<Solicitudes> obtenerSolicitud() {
        return servicioSolicitudes.obtenersolicitud();
    }
    
    @PostMapping()
    public Solicitudes guardarSolicitudes(@RequestBody Solicitudes solicitudes) {
        //TODO: process POST request
        
        return this.servicioSolicitudes.guardarSolicitudes(solicitudes);
    }
     @GetMapping(path = "/idsolicitud/{idsolicitud}")
    public Optional <Solicitudes> obtenerporid(@PathVariable("idsolicitud") String idsolicitud) {
        return this.servicioSolicitudes.obtenerporid(idsolicitud);
    }
    @GetMapping("/fecha")
    public ArrayList <Solicitudes> obtenerporfecha(@RequestParam ("fecha")String fecha) {
        return this.servicioSolicitudes.obtenerporfecha(fecha);
    }

    @DeleteMapping(path = "/idsolicitud/{idsolicitud}")
    public String borrarAdmin(@PathVariable ("idsolicitud") String idsolicitud){
        String Resultado = this.servicioSolicitudes.eliminarSolicitud(idsolicitud);
        return Resultado;
    }
    
    
}
