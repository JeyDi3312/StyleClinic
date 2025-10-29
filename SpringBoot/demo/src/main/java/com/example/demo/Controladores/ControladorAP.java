package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.AdminPpal;
import com.example.demo.Servicios.ServicioAP;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/adminppal")
public class ControladorAP {
    @Autowired
    ServicioAP servicioAP;

    @GetMapping()
    public ArrayList<AdminPpal> obteneradmin() {
        return servicioAP.obtenerAP();
    }
    
    @PostMapping()
    public AdminPpal guardarAdmin(@RequestBody AdminPpal adminppal) {
        //TODO: process POST request
        
        return this.servicioAP.guardarAP(adminppal);
    }
    @GetMapping(path = "/idap/{idap}")
    public Optional <AdminPpal> obtenerporid(@PathVariable("idap") String idap) {
        return this.servicioAP.obtenerporid(idap);
    }
    @GetMapping("/name")
    public ArrayList <AdminPpal> obtenerpornombre(@RequestParam ("name")String name) {
        return this.servicioAP.obteneradminpornombre(name);
    }
    @GetMapping("/email")
    public ArrayList <AdminPpal> obtenerporemail(@RequestParam ("email")String email) {
        return this.servicioAP.obteneradminporemail(email);
    }
    @DeleteMapping(path = "/idap/{idap}")
    public String borrarAdmin(@PathVariable ("idap") String idap){
        String Resultado = this.servicioAP.eliminarAdminPpal(idap);
        return Resultado;
    }

    
}
