package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.AdminOperativo;

import java.util.ArrayList;



@Repository
public interface RepositorioOP extends CrudRepository <AdminOperativo, String>{
    public abstract ArrayList<AdminOperativo> findByemailop(String emailop);
    public abstract ArrayList<AdminOperativo> findBynameop(String nameop);
    
}
