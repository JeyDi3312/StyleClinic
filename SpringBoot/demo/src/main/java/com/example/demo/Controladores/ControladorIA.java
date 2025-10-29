package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.InformeActividad;
import com.example.demo.Servicios.ServicioIA;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/informeactividad")
public class ControladorIA {
    @Autowired
    ServicioIA servicioIA;

    @GetMapping()
    public ArrayList<InformeActividad> obtenerinforme() {
        return servicioIA.obtenerInformeActividad();
    }
    
    @PostMapping()
    public InformeActividad guardarinforme(@RequestBody InformeActividad informeactividad) {
        //TODO: process POST request
        
        return this.servicioIA.guardarinforme(informeactividad);
    }
    @GetMapping(path = "/idia/{idia}")
    public Optional <InformeActividad> obtenerporid(@PathVariable("idia") String idia) {
        return this.servicioIA.obtenerporid(idia);
    }
    @GetMapping("/fecha")
    public ArrayList <InformeActividad> obtenerpornombre(@RequestParam ("fecha")String fecha) {
        return this.servicioIA.obtenerporfecha(fecha);
    }

    @DeleteMapping(path = "/idia/{idia}")
    public String borrarAdmin(@PathVariable ("idia") String idia){
        String Resultado = this.servicioIA.eliminarInformeActividad(idia);
        return Resultado;
    }
    
}
