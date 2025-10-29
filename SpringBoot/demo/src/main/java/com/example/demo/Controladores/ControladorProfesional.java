package com.example.demo.Controladores;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.Profesional;
import com.example.demo.Servicios.ServicioProfesional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/profesional")
public class ControladorProfesional {
    @Autowired
    ServicioProfesional servicioProfesional;

    @GetMapping()
    public ArrayList<Profesional> obtenerprofesionales() {
        return servicioProfesional.obtenerprofesionales();
    }
    
    @PostMapping()
    public Profesional guardarProfesional(@RequestBody Profesional profesional) {
        //TODO: process POST request
        
        return this.servicioProfesional.guardarProfesional(profesional);
    }
    
    
}
