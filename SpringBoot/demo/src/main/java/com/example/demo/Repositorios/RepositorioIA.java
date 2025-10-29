package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.InformeActividad;
import java.util.ArrayList;


@Repository
public interface RepositorioIA extends CrudRepository <InformeActividad, String>{
    public abstract ArrayList<InformeActividad> findByfechaia(String fechaip);
   
    
}
