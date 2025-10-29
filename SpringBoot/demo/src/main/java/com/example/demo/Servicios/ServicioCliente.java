package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.Cliente;
import com.example.demo.Repositorios.RepositorioCliente;

@Service
public class ServicioCliente {
    @Autowired
    RepositorioCliente repositorioCliente;
    
    public Cliente guardarCliente(Cliente cliente){
        return repositorioCliente.save(cliente);
    }
    public Optional<Cliente> obtenerporid(String idcliente){
        return repositorioCliente.findById(idcliente);
    }
    public ArrayList<Cliente> obtenerclientes(){
        return (ArrayList<Cliente>) repositorioCliente.findAll();
    }
    public ArrayList<Cliente> obtenerclientepornombre(String name){
        return (ArrayList<Cliente>) repositorioCliente.findBynamecliente(name) ;
    }

    public ArrayList<Cliente> obtenerclienteporemail(String email){
        return (ArrayList<Cliente>) repositorioCliente.findByemailcliente(email);
    }
    public String eliminarCliente(String idcliente){
        try {
            repositorioCliente.deleteById(idcliente);
            return "Cliente eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando cliente" + err;
        }
    }
    
}
