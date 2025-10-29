package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.Reviews;

import java.util.ArrayList;


@Repository
public interface RepositorioReview extends CrudRepository <Reviews, String>{
    public abstract ArrayList<Reviews> findByfechareview(String fechareview);
   
    
}
