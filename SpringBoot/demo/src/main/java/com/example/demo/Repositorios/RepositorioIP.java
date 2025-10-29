package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.InformePago;

import java.util.ArrayList;


@Repository
public interface RepositorioIP extends CrudRepository <InformePago, String>{
    public abstract ArrayList<InformePago> findByfechaip(String fechaip);
   
    
}
