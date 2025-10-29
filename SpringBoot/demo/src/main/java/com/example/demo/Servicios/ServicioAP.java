package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.AdminPpal;
import com.example.demo.Repositorios.RepositorioAP;

@Service
public class ServicioAP {
    @Autowired
    RepositorioAP repositorioAP;
    
    public AdminPpal guardarAP(AdminPpal adminppal){
        return repositorioAP.save(adminppal);
    }
    public Optional<AdminPpal> obtenerporid(String idap){
        return repositorioAP.findById(idap);
    }

    public ArrayList<AdminPpal> obtenerAP(){
        return (ArrayList<AdminPpal>) repositorioAP.findAll();
    }
    public ArrayList<AdminPpal> obteneradminpornombre(String name){
        return (ArrayList<AdminPpal>) repositorioAP.findBynameap(name);
    }

    public ArrayList<AdminPpal> obteneradminporemail(String email){
        return (ArrayList<AdminPpal>) repositorioAP.findByemailap(email);
    }
    public String eliminarAdminPpal(String idap){
        try {
            repositorioAP.deleteById(idap);
            return "Administrador eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando Administrador" + err;
        }
    }
    
}
