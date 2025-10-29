package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.Profesional;
import com.example.demo.Repositorios.RepositorioProfesional;

@Service
public class ServicioProfesional {
    @Autowired
    RepositorioProfesional repositorioProfesional;

    public Profesional guardarProfesional(Profesional profesional){
        return repositorioProfesional.save(profesional);
    }
    public Optional<Profesional> obtenerporid(String idprofesional){
        return repositorioProfesional.findById(idprofesional);
    }
    public ArrayList<Profesional> obtenerprofesionales(){
        return (ArrayList<Profesional>) repositorioProfesional.findAll();
    }
    public ArrayList<Profesional> obtenerprofesionalespornombre(String name){
        return (ArrayList<Profesional>) repositorioProfesional.findBynameprofesional(name) ;
    }

    public ArrayList<Profesional> obtenerprofesionalesporemail(String email){
        return (ArrayList<Profesional>) repositorioProfesional.findByemailprofesional(email);
    }
    public String eliminarProfesional(String idprofesional){
        try {
            repositorioProfesional.deleteById(idprofesional);
            return "usuario eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "error eliminando profesional" + err;
        }
    }
}
