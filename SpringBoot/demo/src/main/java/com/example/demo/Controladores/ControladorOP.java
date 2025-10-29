package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.AdminOperativo;
import com.example.demo.Servicios.ServicioOP;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/adminoperativo")
public class ControladorOP {
    @Autowired
    ServicioOP servicioOP;

    @GetMapping()
    public ArrayList<AdminOperativo> obtenerOP() {
        return servicioOP.obtenerOP();
    }
    
    @PostMapping()
    public AdminOperativo guardarAdmin(@RequestBody AdminOperativo adminop) {
        //TODO: process POST request
        
        return this.servicioOP.guardarOP(adminop);
    }
    @GetMapping(path = "/idop/{idop}")
    public Optional <AdminOperativo> obtenerporid(@PathVariable("idop") String idop) {
        return this.servicioOP.obtenerporid(idop);
    }
    @GetMapping("/name")
    public ArrayList <AdminOperativo> obtenerpornombre(@RequestParam ("name")String name) {
        return this.servicioOP.obteneradminpornombre(name);
    }
    @GetMapping("/email")
    public ArrayList <AdminOperativo> obtenerporemail(@RequestParam ("email")String email) {
        return this.servicioOP.obteneradminporemail(email);
    }
    @DeleteMapping(path = "/idop/{idop}")
    public String borrarAdmin(@PathVariable ("idop") String idop){
        String Resultado = this.servicioOP.eliminarAdminOperativo(idop);
        return Resultado;
    }

    
    
    
}
