package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.Pagos;
import java.util.ArrayList;


@Repository
public interface RepositorioPagos extends CrudRepository <Pagos, String>{
    public abstract ArrayList<Pagos> findByfechapago(String fechapago);
   
    
}
