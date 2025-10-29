package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.Pagos;
import com.example.demo.Servicios.ServicioPagos;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/pagos")
public class ControladorPagos {
    @Autowired
    ServicioPagos servicioPagos;

    @GetMapping()
    public ArrayList<Pagos> obtenerPagos() {
        return servicioPagos.obtenerPagos();
    }
    
    @PostMapping()
    public Pagos guardarPagos(@RequestBody Pagos pagos) {
        //TODO: process POST request
        
        return this.servicioPagos.guardarpagos(pagos);
    }
    @GetMapping(path = "/idpago/{idpago}")
    public Optional <Pagos> obtenerporid(@PathVariable("idpago") String idpago) {
        return this.servicioPagos.obtenerporid(idpago);
    }
    @GetMapping("/fecha")
    public ArrayList <Pagos> obtenerporfecha(@RequestParam ("fecha")String fecha) {
        return this.servicioPagos.obtenerporfecha(fecha);
    }

    @DeleteMapping(path = "/idpago/{idpago}")
    public String borrarAdmin(@PathVariable ("idpago") String idpago){
        String Resultado = this.servicioPagos.eliminarPagos(idpago);
        return Resultado;
    }
    
}
