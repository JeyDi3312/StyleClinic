package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.AdminPpal;
import java.util.ArrayList;


@Repository
public interface RepositorioAP extends CrudRepository <AdminPpal, String>{
    public abstract ArrayList<AdminPpal> findByemailap(String emailap);
    public abstract ArrayList<AdminPpal> findBynameap(String nameap);
    
}
