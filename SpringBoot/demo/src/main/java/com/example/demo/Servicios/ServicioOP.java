package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.AdminOperativo;
import com.example.demo.Repositorios.RepositorioOP;

@Service
public class ServicioOP {
    @Autowired
    RepositorioOP RepositorioOP;
    
    public AdminOperativo guardarOP(AdminOperativo adminoperativo){
        return RepositorioOP.save(adminoperativo);
    }
    public Optional<AdminOperativo> obtenerporid(String idop){
        return RepositorioOP.findById(idop);
    }

    public ArrayList<AdminOperativo> obtenerOP(){
        return (ArrayList<AdminOperativo>) RepositorioOP.findAll();
    }
    public ArrayList<AdminOperativo> obteneradminpornombre(String name){
        return (ArrayList<AdminOperativo>) RepositorioOP.findBynameop(name);
    }

    public ArrayList<AdminOperativo> obteneradminporemail(String email){
        return (ArrayList<AdminOperativo>) RepositorioOP.findByemailop(email);
    }

    public String eliminarAdminOperativo(String idop){
        try {
            RepositorioOP.deleteById(idop);
            return "Administrador eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando Administrador" + err;
        }
    }
    
}
