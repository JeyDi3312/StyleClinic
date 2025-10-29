package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.Cliente;
import com.example.demo.Servicios.ServicioCliente;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/cliente")
public class ControladorCliente {
    @Autowired
    ServicioCliente servicioCliente;

    @GetMapping()
    public ArrayList<Cliente> obtenerclientes() {
        return servicioCliente.obtenerclientes();
    }
    
    @PostMapping()
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        //TODO: process POST request
        
        return this.servicioCliente.guardarCliente(cliente);
    }
    @GetMapping(path = "/idcliente/{idcliente}")
    public Optional <Cliente> obtenerporid(@PathVariable("idcliente") String idcliente) {
        return this.servicioCliente.obtenerporid(idcliente);
    }
    @GetMapping("/name")
    public ArrayList <Cliente> obtenerpornombre(@RequestParam ("name")String name) {
        return this.servicioCliente.obtenerclientepornombre(name);
    }
    @GetMapping("/email")
    public ArrayList <Cliente> obtenerporemail(@RequestParam ("email")String email) {
        return this.servicioCliente.obtenerclienteporemail(email);
    }
    @DeleteMapping(path = "/idcliente/{idcliente}")
    public String borrarAdmin(@PathVariable ("idcliente") String idcliente){
        String Resultado = this.servicioCliente.eliminarCliente(idcliente);
        return Resultado;
    }
    
    
}
