package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.InformePago;
import com.example.demo.Servicios.ServicioIP;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/informepago")
public class ControladorIP {
    @Autowired
    ServicioIP servicioIP;

    @GetMapping()
    public ArrayList<InformePago> obtenerinforme() {
        return servicioIP.obtenerInformePago();
    }
    
    @PostMapping()
    public InformePago guardarinforme(@RequestBody InformePago informepago) {
        //TODO: process POST request
        
        return this.servicioIP.guardarinforme(informepago);
    }
    @GetMapping(path = "/idip/{idip}")
    public Optional <InformePago> obtenerporid(@PathVariable("idip") String idip) {
        return this.servicioIP.obtenerporid(idip);
    }
    @GetMapping("/fecha")
    public ArrayList <InformePago> obtenerporfecha(@RequestParam ("fecha")String fecha) {
        return this.servicioIP.obtenerporfecha(fecha);
    }

    @DeleteMapping(path = "/idip/{idip}")
    public String borrarAdmin(@PathVariable ("idip") String idip){
        String Resultado = this.servicioIP.eliminarInformePago(idip);
        return Resultado;
    }
    
}
