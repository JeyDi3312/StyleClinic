package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.Profesional;

import java.util.ArrayList;


@Repository
public interface RepositorioProfesional  extends CrudRepository <Profesional, String>{
    public abstract ArrayList<Profesional> findByemailprofesional(String emailprofesional);
    public abstract ArrayList<Profesional> findBynameprofesional(String nameprofesional);
    
}
